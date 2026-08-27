import { execFileSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformWithOxc } from 'vite'
import { detailedCourses } from '../src/data/courseLessons.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const practiceRoot = path.join(projectRoot, 'public', 'practice')
const reportRoot = path.join(projectRoot, 'reports')
const issues = []
const checkedFiles = []

function addIssue(severity, code, message, location = '') {
  issues.push({ severity, code, message, location })
}

function text(value) {
  return String(value ?? '').trim()
}

function validateSession(course, session) {
  const location = `${course.programId}/${session.id}`
  const requiredText = ['id', 'title', 'duration', 'goal', 'concept', 'code', 'prompt', 'result', 'instructorGuide', 'assignment']
  const requiredLists = ['materials', 'timeline', 'practice', 'quiz', 'quizAnswers', 'completionCriteria', 'errors', 'expectedResult', 'rubric', 'downloads']

  for (const field of requiredText) {
    if (!text(session[field])) addIssue('error', 'MISSING_TEXT', `${field} 내용이 없습니다.`, location)
  }
  for (const field of requiredLists) {
    if (!Array.isArray(session[field]) || session[field].length === 0) addIssue('error', 'MISSING_LIST', `${field} 목록이 없습니다.`, location)
  }
  if (session.quiz?.length !== session.quizAnswers?.length) addIssue('error', 'QUIZ_ANSWER_MISMATCH', '확인 문제와 정답 개수가 다릅니다.', location)
  if (session.duration !== '50분') addIssue('warning', 'DURATION_REVIEW', `예정 시간이 50분이 아닙니다: ${session.duration}`, location)
  if (session.timeline?.at(-1)?.minutes !== '45~50분') addIssue('warning', 'TIMELINE_REVIEW', '수업 진행표가 50분 종료 구조가 아닙니다.', location)

  const combined = JSON.stringify(session)
  if (/이\(가\)|을\(를\)|결과물을\(를\)|하나요\?\s*정답 예시.*핵심 목적/.test(combined)) {
    addIssue('warning', 'AWKWARD_SENTENCE', '자동 생성 조사 또는 질문과 맞지 않는 일반 정답을 확인하세요.', location)
  }

  for (const download of session.downloads ?? []) {
    const target = path.join(projectRoot, 'public', download.path)
    if (!existsSync(target)) addIssue('error', 'MISSING_DOWNLOAD', `다운로드 파일이 없습니다: ${download.path}`, location)
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectFiles(target))
    else files.push(target)
  }
  return files
}

function balanced(source, open, close) {
  return [...source].filter((char) => char === open).length === [...source].filter((char) => char === close).length
}

async function validatePracticeFile(file) {
  const relative = path.relative(projectRoot, file).replaceAll('\\', '/')
  const extension = path.extname(file).toLowerCase()
  const source = await readFile(file, 'utf8')
  checkedFiles.push(relative)

  if (!source.trim()) {
    addIssue('error', 'EMPTY_FILE', '파일이 비어 있습니다.', relative)
    return
  }
  if (/sk-[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{20,}\./.test(source)) {
    addIssue('error', 'POSSIBLE_SECRET', '비밀 키 또는 토큰으로 보이는 문자열이 있습니다.', relative)
  }

  try {
    if (extension === '.js') {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' })
    } else if (extension === '.jsx') {
      await transformWithOxc(source, file, { lang: 'jsx' })
    } else if (extension === '.html') {
      const lower = source.toLowerCase()
      for (const token of ['<!doctype html>', '<html lang=', '<meta charset=', '<meta name="viewport"', '<title>', '<body>', '</body>', '</html>']) {
        if (!lower.includes(token)) addIssue('error', 'HTML_STRUCTURE', `${token}이(가) 없습니다.`, relative)
      }
    } else if (extension === '.css' && (!balanced(source, '{', '}') || !source.includes('{'))) {
      addIssue('error', 'CSS_STRUCTURE', 'CSS 중괄호 구조를 확인하세요.', relative)
    } else if (extension === '.sql' && !source.includes(';')) {
      addIssue('warning', 'SQL_REVIEW', '실행 가능한 SQL 종료 기호가 없습니다.', relative)
    }
  } catch (error) {
    addIssue('error', 'SYNTAX_ERROR', text(error.stderr || error.message).split('\n')[0], relative)
  }
}

function duplicateGroups(values) {
  const grouped = new Map()
  for (const value of values) {
    const normalized = text(value.content).replace(/\s+/g, ' ')
    if (normalized.length < 24) continue
    const group = grouped.get(normalized) ?? []
    group.push(value.location)
    grouped.set(normalized, group)
  }
  return [...grouped.values()].filter((group) => group.length > 1)
}

if (detailedCourses.length !== 12) addIssue('error', 'COURSE_COUNT', `대표 과정이 12개가 아닙니다: ${detailedCourses.length}`, 'courseLessons.js')

const sessionIds = new Set()
const codeValues = []
for (const course of detailedCourses) {
  if (course.sessions.length !== 30) addIssue('error', 'SESSION_COUNT', `회차가 30개가 아닙니다: ${course.sessions.length}`, course.programId)
  for (const session of course.sessions) {
    if (sessionIds.has(session.id)) addIssue('error', 'DUPLICATE_SESSION_ID', '중복 회차 ID입니다.', session.id)
    sessionIds.add(session.id)
    codeValues.push({ content: session.code, location: `${course.programId}/${session.id}` })
    validateSession(course, session)
  }
}

for (const group of duplicateGroups(codeValues).slice(0, 30)) {
  addIssue('warning', 'DUPLICATE_CODE', `같은 예제 코드가 ${group.length}회 사용됩니다.`, group.join(', '))
}

const practiceFiles = await collectFiles(practiceRoot)
for (const file of practiceFiles) await validatePracticeFile(file)

const summary = {
  generatedAt: new Date().toISOString(),
  courses: detailedCourses.length,
  sessions: [...sessionIds].length,
  practiceFiles: checkedFiles.length,
  errors: issues.filter((issue) => issue.severity === 'error').length,
  warnings: issues.filter((issue) => issue.severity === 'warning').length,
  passed: issues.every((issue) => issue.severity !== 'error'),
}

await mkdir(reportRoot, { recursive: true })
await writeFile(path.join(reportRoot, 'course-quality-report.json'), `${JSON.stringify({ summary, issues }, null, 2)}\n`, 'utf8')

const markdown = `# EDU 전체 과정 자동 품질검사\n\n- 검사 시각: ${summary.generatedAt}\n- 과정: ${summary.courses}개\n- 회차: ${summary.sessions}개\n- 실습 파일: ${summary.practiceFiles}개\n- 오류: ${summary.errors}개\n- 경고: ${summary.warnings}개\n- 자동검사 통과: ${summary.passed ? '예' : '아니요'}\n\n## 오류와 경고\n\n${issues.length ? issues.map((issue) => `- **${issue.severity.toUpperCase()} · ${issue.code}** ${issue.message}${issue.location ? ` — \`${issue.location}\`` : ''}`).join('\n') : '- 발견된 문제가 없습니다.'}\n\n## 해석 방법\n\n- 오류는 공개 전에 반드시 수정합니다.\n- 경고는 중복이나 표현 품질처럼 강사가 확인할 항목입니다.\n- 자동검사 통과가 실제 수업 품질을 보장하지는 않으므로 과정별 대표 회차를 시범 수업으로 재검증합니다.\n`
await writeFile(path.join(reportRoot, 'course-quality-report.md'), markdown, 'utf8')

console.log(`과정 ${summary.courses}개 · 회차 ${summary.sessions}개 · 실습 파일 ${summary.practiceFiles}개`)
console.log(`오류 ${summary.errors}개 · 경고 ${summary.warnings}개`)
console.log(summary.passed ? '자동 품질검사를 통과했습니다.' : '자동 품질검사에서 수정할 오류가 발견됐습니다.')
if (!summary.passed) process.exitCode = 1

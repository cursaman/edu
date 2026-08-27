import { mkdir, writeFile } from 'node:fs/promises'
import { findDetailedCourse } from '../src/data/courseLessons.js'

const courseIds = ['web-foundation', 'javascript-practical', 'react-website']
const outputDirectory = new URL('../public/materials/course-guides/', import.meta.url)
const clean = (value) => String(value ?? '').replace(/\r/g, '')
const numbered = (items = []) => items.map((item, index) => `${index + 1}. ${clean(item)}`).join('\n')

function makeInstructorGuide(course) {
  const introduction = `# ${course.title} — 강사용 수업 지도서\n\n> 과정 전체 ${course.sessions.length}회차를 실제 수업처럼 진행하기 위한 지도서입니다. 수업 전에 예제와 다운로드 파일을 직접 실행하고, 실제 소요 시간과 반복 질문을 기록합니다.\n\n## 공통 운영 원칙\n\n- 완성 코드를 먼저 보여주지 않고 학습자가 실행 결과를 예상하게 합니다.\n- 오류가 발생하면 대신 고치기 전에 첫 오류 문장, 파일, 줄 번호, 재현 순서를 말하게 합니다.\n- 빠른 학습자에게는 경계값 실습을, 늦은 학습자에게는 최소 완료 범위를 제공합니다.\n- 실제 개인정보·비밀번호·API 비밀 키를 실습에 사용하지 않습니다.\n- 회차가 끝나면 예정 시간, 실제 시간, 완료 인원, 반복 질문과 수정 사항을 기록합니다.\n\n`

  return introduction + course.sessions.map((session) => `## ${session.order}회차 · ${clean(session.title)}\n\n- 주차: ${session.week}주차\n- 예정 시간: ${clean(session.duration)}\n- 학습 목표: ${clean(session.goal)}\n- 완성 결과: ${clean(session.result)}\n\n### 강사가 말할 핵심 설명\n\n${clean(session.instructorGuide || session.concept)}\n\n### 수업 진행\n\n${(session.timeline ?? []).map((item) => `- **${clean(item.minutes)}** ${clean(item.activity)}`).join('\n')}\n\n### 시연 코드\n\n\`\`\`text\n${clean(session.code)}\n\`\`\`\n\n### 실습 진행 순서\n\n${numbered(session.practice)}\n\n### 정상 실행 결과\n\n${numbered(session.expectedResult ?? [session.result])}\n\n### 자주 발생하는 오류와 대응\n\n${numbered(session.errors)}\n\n### 확인 질문과 정답\n\n${(session.quiz ?? []).map((question, index) => `${index + 1}. **질문:** ${clean(question)}\n   **정답 예시:** ${clean((session.quizAnswers ?? [])[index] || '수강생의 실행 결과와 설명을 확인합니다.')}`).join('\n')}\n\n### 완료·평가 기준\n\n${numbered(session.rubric ?? session.completionCriteria)}\n\n### 수업 후 강사 기록\n\n- 실제 소요 시간: ______분\n- 참여 인원 / 완료 인원: ______명 / ______명\n- 반복 질문: ________________________________________\n- 중단 단계와 오류: __________________________________\n- 다음 수업 수정 사항: _______________________________\n\n---\n\n`).join('')
}

function makeWorkbook(course) {
  const introduction = `# ${course.title} — 수강생 활동지\n\n이 활동지는 ${course.sessions.length}회차의 예상·실행·오류·확인·회고를 기록하는 용도입니다. 비밀번호나 실제 개인정보는 작성하지 마세요.\n\n## 활동지 사용 방법\n\n1. 실행 전에 결과를 먼저 예상합니다.\n2. 시작 파일을 직접 완성합니다.\n3. 정상값과 경계값을 확인합니다.\n4. 오류가 생기면 지우지 말고 첫 문장과 해결 과정을 기록합니다.\n5. 확인 문제에 자신의 말로 답합니다.\n\n`

  return introduction + course.sessions.map((session) => `## ${session.order}회차 · ${clean(session.title)}\n\n- 오늘의 목표: ${clean(session.goal)}\n- 오늘 완성할 것: ${clean(session.result)}\n- 예상 시간: ${clean(session.duration)}\n\n### 1. 실행 전 예상\n\n- 입력값은 무엇인가요? __________________________________\n- 어떤 결과가 나올까요? _________________________________\n- 모르는 용어: __________________________________________\n\n### 2. 직접 실습\n\n${numbered(session.practice)}\n\n### 3. 실행 결과 기록\n\n- 정상 실행 결과: _______________________________________\n- 직접 바꾼 값 또는 문구: _______________________________\n- 경계값·빈 값 결과: ___________________________________\n\n### 4. 오류 해결 기록\n\n| 기록 항목 | 작성 내용 |\n|---|---|\n| 첫 오류 문장 | |\n| 파일과 줄 번호 | |\n| 오류가 다시 생기는 순서 | |\n| 확인한 원인 | |\n| 해결 방법 | |\n\n### 5. 확인 문제\n\n${(session.quiz ?? []).map((question, index) => `${index + 1}. ${clean(question)}\n\n   답: _________________________________________________`).join('\n\n')}\n\n### 6. 완료 확인과 회고\n\n${(session.completionCriteria ?? []).map((item) => `- [ ] ${clean(item)}`).join('\n')}\n- 오늘 이해한 내용: _____________________________________\n- 다시 연습할 내용: _____________________________________\n- 다음 회차 전에 할 일: _________________________________\n\n---\n\n`).join('')
}

await mkdir(outputDirectory, { recursive: true })

for (const courseId of courseIds) {
  const course = findDetailedCourse(courseId)
  if (!course || course.sessions.length !== 30) throw new Error(`${courseId} 과정이 정확히 30회차가 아닙니다.`)
  await writeFile(new URL(`${courseId}-instructor.md`, outputDirectory), makeInstructorGuide(course), 'utf8')
  await writeFile(new URL(`${courseId}-workbook.md`, outputDirectory), makeWorkbook(course), 'utf8')
}

console.log(`${courseIds.length}개 과정의 강사용 지도서와 수강생 활동지 6개를 생성했습니다.`)

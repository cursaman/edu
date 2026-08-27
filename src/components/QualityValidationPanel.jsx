import { useMemo, useState } from 'react'
import { detailedCourses } from '../data/courseLessons.js'
import { makeQualityExport, qualityStatuses, readQualityRecords, removeQualityRecord, saveQualityRecord } from '../data/classQualityStorage.js'

const firstCourse = detailedCourses[0]
const today = new Date().toISOString().slice(0, 10)
const emptyForm = () => ({ id: '', courseId: firstCourse.programId, sessionId: firstCourse.sessions[0].id, classDate: today, actualMinutes: 50, participantCount: 1, completedCount: 0, repeatedQuestions: '', errors: '', improvements: '', satisfaction: 3, status: '초안' })

function latestBySession(records) {
  const result = new Map()
  ;[...records].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).forEach((record) => {
    if (!result.has(record.sessionId)) result.set(record.sessionId, record)
  })
  return [...result.values()]
}

function courseSummary(course, records) {
  const latest = latestBySession(records.filter((record) => record.courseId === course.programId))
  const ready = latest.filter((record) => record.status === '공개 가능').length
  const revision = latest.filter((record) => record.status === '수정 필요').length
  const completionRates = latest.filter((record) => Number(record.participantCount) > 0).map((record) => Number(record.completedCount) / Number(record.participantCount) * 100)
  const satisfaction = latest.map((record) => Number(record.satisfaction)).filter(Number.isFinite)
  return {
    tested: latest.length,
    ready,
    revision,
    completion: completionRates.length ? Math.round(completionRates.reduce((sum, value) => sum + value, 0) / completionRates.length) : 0,
    satisfaction: satisfaction.length ? (satisfaction.reduce((sum, value) => sum + value, 0) / satisfaction.length).toFixed(1) : '0.0',
    publishable: ready === course.sessions.length,
  }
}

export default function QualityValidationPanel() {
  const [records, setRecords] = useState(readQualityRecords)
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const selectedCourse = detailedCourses.find((course) => course.programId === form.courseId) || firstCourse
  const summaries = useMemo(() => detailedCourses.map((course) => ({ course, ...courseSummary(course, records) })), [records])
  const sortedRecords = useMemo(() => [...records].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))), [records])

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
    setMessage('')
  }

  function selectCourse(courseId) {
    const course = detailedCourses.find((item) => item.programId === courseId) || firstCourse
    setForm((current) => ({ ...current, courseId, sessionId: course.sessions[0].id }))
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    const actualMinutes = Number(form.actualMinutes)
    const participantCount = Number(form.participantCount)
    const completedCount = Number(form.completedCount)
    const satisfaction = Number(form.satisfaction)
    if (!form.classDate || actualMinutes < 1 || actualMinutes > 600) return setError('수업일과 실제 수업 시간 1~600분을 확인해 주세요.')
    if (participantCount < 1 || completedCount < 0 || completedCount > participantCount) return setError('참여 인원은 1명 이상이며 완료 인원은 참여 인원을 넘을 수 없습니다.')
    if (satisfaction < 1 || satisfaction > 5) return setError('만족도는 1점부터 5점까지 입력해 주세요.')
    const next = saveQualityRecord({ ...form, actualMinutes, participantCount, completedCount, satisfaction })
    if (!next) return setError('현재 브라우저에 저장하지 못했습니다. 저장 공간과 브라우저 설정을 확인해 주세요.')
    setRecords(next)
    setForm(emptyForm())
    setMessage(form.id ? '검증 기록을 수정했습니다.' : '새 검증 기록을 저장했습니다.')
  }

  function edit(record) {
    setForm(record)
    setError('')
    setMessage('선택한 기록을 수정하고 있습니다.')
    document.getElementById('quality-form-title')?.scrollIntoView({ behavior: 'smooth' })
  }

  function remove(record) {
    if (!window.confirm('이 수업 검증 기록을 삭제할까요?')) return
    const next = removeQualityRecord(record.id)
    if (next) { setRecords(next); setMessage('검증 기록을 삭제했습니다.') }
  }

  function exportJson() {
    const blob = new Blob([makeQualityExport(records, detailedCourses)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `edu-class-quality-${today}.json`
    link.click()
    URL.revokeObjectURL(url)
    setMessage('JSON 검증 자료를 내려받았습니다.')
  }

  return <div className="quality-admin">
    <div className="privacy-warning"><strong>수업 품질 검증 기록은 현재 브라우저에만 저장됩니다.</strong><p>수강생 이름·연락처·비밀번호 같은 개인정보를 입력하지 마세요. 과정·회차별 인원과 익명 수업 결과만 기록합니다.</p></div>
    <div className="admin-toolbar"><div><h2>과정별 검증 현황 <span>{records.length}건</span></h2><p>30회차가 모두 공개 가능 판정을 받아야 과정 전체가 공개 가능으로 표시됩니다.</p></div><button className="button button-secondary" disabled={!records.length} onClick={exportJson} type="button">검증 기록 JSON 내보내기</button></div>
    <div className="quality-summary-grid">{summaries.map(({ course, tested, ready, revision, completion, satisfaction, publishable }) => <article className={publishable ? 'quality-summary quality-summary-ready' : 'quality-summary'} key={course.programId}><div><span>{publishable ? '공개 가능' : '검증 진행 중'}</span><strong>{course.title}</strong></div><dl><div><dt>검증 회차</dt><dd>{tested}/{course.sessions.length}</dd></div><div><dt>공개 가능 회차</dt><dd>{ready}</dd></div><div><dt>수정 필요</dt><dd>{revision}</dd></div><div><dt>평균 완료율</dt><dd>{completion}%</dd></div><div><dt>평균 만족도</dt><dd>{satisfaction}/5</dd></div></dl></article>)}</div>
    <form className="admin-form quality-form" onSubmit={submit}>
      <h3 id="quality-form-title">{form.id ? '수업 검증 기록 수정' : '새 수업 검증 기록'}</h3>
      <div className="quality-form-grid">
        <label>과정<select onChange={(event) => selectCourse(event.target.value)} value={form.courseId}>{detailedCourses.map((course) => <option key={course.programId} value={course.programId}>{course.title}</option>)}</select></label>
        <label>회차<select onChange={(event) => update('sessionId', event.target.value)} value={form.sessionId}>{selectedCourse.sessions.map((session) => <option key={session.id} value={session.id}>{session.order}회차 · {session.title}</option>)}</select></label>
        <label>수업일<input onChange={(event) => update('classDate', event.target.value)} required type="date" value={form.classDate} /></label>
        <label>실제 시간(분)<input max="600" min="1" onChange={(event) => update('actualMinutes', event.target.value)} required type="number" value={form.actualMinutes} /></label>
        <label>참여 인원<input min="1" onChange={(event) => update('participantCount', event.target.value)} required type="number" value={form.participantCount} /></label>
        <label>완료 인원<input min="0" onChange={(event) => update('completedCount', event.target.value)} required type="number" value={form.completedCount} /></label>
        <label>평균 만족도<select onChange={(event) => update('satisfaction', event.target.value)} value={form.satisfaction}>{[1,2,3,4,5].map((score) => <option key={score} value={score}>{score}점</option>)}</select></label>
        <label>검증 상태<select onChange={(event) => update('status', event.target.value)} value={form.status}>{qualityStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      </div>
      <label>반복 질문<textarea maxLength="1000" onChange={(event) => update('repeatedQuestions', event.target.value)} placeholder="익명으로 반복된 질문과 어려워한 용어를 적어 주세요." value={form.repeatedQuestions} /></label>
      <label>발생한 오류·중단 단계<textarea maxLength="1000" onChange={(event) => update('errors', event.target.value)} placeholder="오류 문장, 발생 단계와 재현 순서를 적어 주세요." value={form.errors} /></label>
      <label>수정 사항·재검증 결과<textarea maxLength="1000" onChange={(event) => update('improvements', event.target.value)} placeholder="수정할 설명·코드·시간과 재검증 결과를 적어 주세요." value={form.improvements} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="admin-actions"><button className="button button-primary" type="submit">{form.id ? '수정 내용 저장' : '검증 기록 저장'}</button>{form.id && <button className="button button-secondary" onClick={() => { setForm(emptyForm()); setMessage(''); setError('') }} type="button">수정 취소</button>}</div>
    </form>
    {message && <p className="form-message" role="status">{message}</p>}
    <section className="quality-records"><h3>수업 검증 기록</h3>{sortedRecords.length ? <div className="admin-item-list">{sortedRecords.map((record) => { const course = detailedCourses.find((item) => item.programId === record.courseId); const session = course?.sessions.find((item) => item.id === record.sessionId); const rate = record.participantCount ? Math.round(record.completedCount / record.participantCount * 100) : 0; return <article className="admin-item" key={record.id}><div><strong>{course?.title || record.courseId} · {session?.order || '?'}회차</strong><span>{record.classDate} · {record.status} · {record.actualMinutes}분 · 완료율 {rate}% · 만족도 {record.satisfaction}/5</span>{record.improvements && <p>{record.improvements}</p>}</div><div className="admin-actions"><button className="button button-secondary" onClick={() => edit(record)} type="button">수정</button><button className="button button-danger" onClick={() => remove(record)} type="button">삭제</button></div></article>})}</div> : <p>아직 저장된 수업 검증 기록이 없습니다.</p>}</section>
  </div>
}

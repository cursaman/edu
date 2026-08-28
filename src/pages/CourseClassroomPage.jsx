import { useEffect, useState } from 'react'
import { findDetailedCourse } from '../data/courseLessons.js'
import { completedCourseSessions, setCourseSessionCompleted } from '../data/courseProgress.js'
import { findFeaturedLearning } from '../data/featuredLearning.js'
import { isSupabaseConfigured } from '../lib/supabase.js'
import { loadUserLearning, recordLastSession, saveUserSessionProgress } from '../data/userProgress.js'
import { allowedCourseStatuses, enrollmentStatuses, getEnrollment } from '../data/enrollmentStorage.js'

export default function CourseClassroomPage({ programId, session, sessionId }) {
  const course = findDetailedCourse(programId)
  const [completed, setCompleted] = useState(() => completedCourseSessions(programId))
  const [saving, setSaving] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const [enrollment, setEnrollment] = useState(null)
  const [checkingEnrollment, setCheckingEnrollment] = useState(Boolean(session?.user))
  const featured = findFeaturedLearning(programId)
  const activeIndex = course ? Math.max(0, course.sessions.findIndex((item) => item.id === sessionId)) : 0
  const active = course?.sessions[activeIndex]
  const isCompleted = Boolean(active && completed.includes(active.id))
  const progress = course ? Math.round((completed.length / course.sessions.length) * 100) : 0
  const hasCourseAccess = Boolean(enrollment && allowedCourseStatuses.includes(enrollment.status))
  const courseLocked = Boolean(active && isSupabaseConfigured && active.order > 3 && (!session?.user || !hasCourseAccess))
  useEffect(() => {
    if (!session?.user?.id || !active) return undefined
    let activeRequest = true
    setCheckingEnrollment(true)
    void Promise.all([loadUserLearning(session.user.id), getEnrollment(session.user.id, programId)])
      .then(async ([learning, nextEnrollment]) => {
        if (!activeRequest) return
        setCompleted(learning.completedByProgram[programId] || [])
        setEnrollment(nextEnrollment)
        if (active.order <= 3 || allowedCourseStatuses.includes(nextEnrollment?.status)) await recordLastSession(session.user.id, programId, active.id)
      })
      .catch(() => { if (activeRequest) setSyncMessage('공동 진도를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.') })
      .finally(() => { if (activeRequest) setCheckingEnrollment(false) })
    return () => { activeRequest = false }
  }, [active?.id, programId, session?.user?.id])
  if (!course || !active) return <section className="content-page page-shell empty-state"><strong>상세 강의가 아직 준비되지 않았습니다.</strong><a className="button button-primary" href={`#/programs/${programId}`}>프로그램으로 돌아가기</a></section>
  const toggle = async () => {
    const nextCompleted = !isCompleted
    if (!session?.user?.id) return setCompleted(setCourseSessionCompleted(programId, active.id, nextCompleted))
    const previous = completed
    setCompleted((current) => nextCompleted ? [...new Set([...current, active.id])] : current.filter((id) => id !== active.id))
    setSaving(true); setSyncMessage('')
    try {
      await saveUserSessionProgress(session.user.id, programId, active.id, nextCompleted)
      setSyncMessage('계정에 학습 진도를 저장했습니다.')
      window.dispatchEvent(new CustomEvent('edu-user-progress-updated'))
    } catch {
      setCompleted(previous)
      setSyncMessage('진도를 저장하지 못했습니다. 인터넷 연결과 Supabase SQL 설정을 확인해 주세요.')
    } finally { setSaving(false) }
  }
  const printLesson = () => window.print()

  return <section className="course-classroom page-shell">
    <header className="classroom-header"><div><span className="section-eyebrow">MY CLASSROOM</span><h1>{course.title}</h1><p>{course.totalWeeks}주 · {course.sessions.length}회차 · 최종 결과물: {course.outcome}</p></div><div className="classroom-progress"><strong>{progress}%</strong><span>{completed.length} / {course.sessions.length}회 완료</span><div><i style={{ width: `${progress}%` }} /></div></div></header>
    <div className="classroom-layout">
      <aside className="classroom-sidebar"><h2>전체 회차</h2>{course.sessions.map((item) => <a aria-current={item.id === active.id ? 'page' : undefined} className={item.id === active.id ? 'classroom-session-active' : ''} href={`#/classroom/${programId}/${item.id}`} key={item.id}><span>{completed.includes(item.id) ? '✓' : item.order}</span><div><small>{item.week}주차 · {item.duration}</small><strong>{item.title}</strong></div></a>)}</aside>
      {checkingEnrollment && active.order > 3 ? <article className="classroom-content classroom-login-gate"><p role="status">수강권을 확인하고 있습니다...</p></article> : courseLocked ? <article className="classroom-content classroom-login-gate"><span aria-hidden="true">🔒</span><p className="section-eyebrow">FREE EXPERIENCE COMPLETE</p><h2>4회차부터는 승인된 수강권이 필요합니다</h2><p>{session?.user ? enrollment ? `현재 신청 상태는 '${enrollmentStatuses[enrollment.status] || enrollment.status}'입니다. 관리자 승인 후 전체 회차를 이용할 수 있습니다.` : '과정 상세 화면에서 수강 신청을 먼저 접수해 주세요.' : '회원가입 후 수강 신청하면 관리자 승인 뒤 전체 회차를 학습할 수 있습니다.'}</p><div>{session?.user ? <a className="button button-primary" href={`#/programs/${programId}`}>수강 신청 상태 확인하기 →</a> : <><a className="button button-primary" href={`#/signup?next=/programs/${programId}`}>회원가입하기 →</a><a className="button button-secondary" href={`#/login?next=/programs/${programId}`}>이미 계정이 있어요</a></>}</div></article> : <article className="classroom-content">
        <div className="classroom-lesson-heading"><span>{active.week}주차 · {active.order}회차 · {active.duration}{featured && active.order <= featured.freeSessions ? ' · 무료 체험' : ''}</span><h2>{active.title}</h2><p>{active.goal}</p></div>
        {course.resources?.length > 0 && <section className="classroom-teaching-kit"><div><h3>과정 전체 수업자료</h3><p>강사용 지도서에는 대본·예상 결과·오류 사례·정답이, 수강생 활동지에는 실습과 기록란이 들어 있습니다.</p></div><div className="classroom-downloads">{course.resources.map((resource) => <a className="button button-secondary" download href={`${import.meta.env.BASE_URL}${resource.path}`} key={resource.path}>{resource.audience} · {resource.label} ↓</a>)}</div></section>}
        <section className="classroom-teaching-kit"><div><h3>수업 준비물</h3><ul>{active.materials.map((item) => <li key={item}>{item}</li>)}</ul></div><button className="button button-secondary classroom-print" onClick={printLesson} type="button">이 회차 교안 인쇄·PDF 저장</button></section>
        <section><h3>50분 수업 진행표</h3><div className="classroom-timeline">{active.timeline.map((item) => <div key={item.minutes}><strong>{item.minutes}</strong><span>{item.activity}</span></div>)}</div></section>
        <section><h3>강사용 쉬운 설명</h3><p>{active.instructorGuide}</p></section>
        <section><h3>쉽게 이해하기</h3><p>{active.concept}</p></section>
        <section><h3>직접 따라 하기</h3><ol>{active.practice.map((step) => <li key={step}>{step}</li>)}</ol></section>
        {active.downloads?.length > 0 && <section><h3>실습 파일</h3><p>시작 파일을 내려받아 직접 작업한 다음 완성 파일과 비교하세요.</p><div className="classroom-downloads">{active.downloads.map((file) => <a className="button button-secondary" download href={`${import.meta.env.BASE_URL}${file.path}`} key={file.path}>{file.label} ↓</a>)}</div></section>}
        <section><h3>예제 코드</h3><pre><code>{active.code}</code></pre></section>
        <section><h3>Codex 요청문</h3><blockquote>{active.prompt}</blockquote></section>
        <section><h3>자주 발생하는 오류</h3><ul>{active.errors.map((error) => <li key={error}>{error}</li>)}</ul></section>
        <section><h3>확인 문제</h3><div className="classroom-quiz-list">{active.quiz.map((item, index) => <details key={item}><summary>{index + 1}. {item}</summary><p>{active.quizAnswers[index]}</p></details>)}</div><p className="classroom-result"><strong>이번 회차 결과물</strong>{active.result}</p></section>
        <section><h3>오류가 생기면</h3><ol>{active.errors.map((item) => <li key={item}>{item}</li>)}</ol></section>
        {active.expectedResult?.length > 0 && <section><h3>예상 결과</h3><ul>{active.expectedResult.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        {active.rubric?.length > 0 && <section><h3>과제 평가 기준 · 10점</h3><ul>{active.rubric.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        <section><h3>과제</h3><p>{active.assignment}</p><h3>학습 완료 기준</h3><ul>{active.completionCriteria.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <div className="classroom-actions"><div><button className={`button ${isCompleted ? 'button-secondary' : 'button-primary'}`} disabled={saving} onClick={toggle} type="button">{saving ? '저장 중...' : isCompleted ? '완료 취소' : '이 회차 학습 완료'}</button>{syncMessage && <small className="classroom-sync-message" role="status">{syncMessage}</small>}</div><div>{activeIndex > 0 && <a href={`#/classroom/${programId}/${course.sessions[activeIndex - 1].id}`}>← 이전 회차</a>}{activeIndex < course.sessions.length - 1 ? <a href={`#/classroom/${programId}/${course.sessions[activeIndex + 1].id}`}>다음 회차 →</a> : <a href="#/classroom">내 강의실로 →</a>}</div></div>
        {featured && active.order === featured.freeSessions && <section className="free-trial-complete"><span aria-hidden="true">✓</span><div><h3>무료 체험 3회차를 모두 살펴봤습니다</h3><p>완성 목표와 학습 방식이 나에게 맞는지 확인한 뒤 전체 과정 또는 다른 추천 과정을 살펴보세요.</p></div><a className="button button-secondary" href="#/recommend">다른 과정 추천받기</a></section>}
      </article>}
    </div>
  </section>
}

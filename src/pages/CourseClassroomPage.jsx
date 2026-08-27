import { useState } from 'react'
import { findDetailedCourse } from '../data/courseLessons.js'
import { completedCourseSessions, setCourseSessionCompleted } from '../data/courseProgress.js'

export default function CourseClassroomPage({ programId, sessionId }) {
  const course = findDetailedCourse(programId)
  const [completed, setCompleted] = useState(() => completedCourseSessions(programId))
  if (!course) return <section className="content-page page-shell empty-state"><strong>상세 강의가 아직 준비되지 않았습니다.</strong><a className="button button-primary" href={`#/programs/${programId}`}>프로그램으로 돌아가기</a></section>
  const activeIndex = Math.max(0, course.sessions.findIndex((item) => item.id === sessionId))
  const active = course.sessions[activeIndex]
  const isCompleted = completed.includes(active.id)
  const progress = Math.round((completed.length / course.sessions.length) * 100)
  const toggle = () => setCompleted(setCourseSessionCompleted(programId, active.id, !isCompleted))

  return <section className="course-classroom page-shell">
    <header className="classroom-header"><div><span className="section-eyebrow">MY CLASSROOM</span><h1>{course.title}</h1><p>{course.totalWeeks}주 · {course.sessions.length}회차 · 최종 결과물: {course.outcome}</p></div><div className="classroom-progress"><strong>{progress}%</strong><span>{completed.length} / {course.sessions.length}회 완료</span><div><i style={{ width: `${progress}%` }} /></div></div></header>
    <div className="classroom-layout">
      <aside className="classroom-sidebar"><h2>전체 회차</h2>{course.sessions.map((item) => <a aria-current={item.id === active.id ? 'page' : undefined} className={item.id === active.id ? 'classroom-session-active' : ''} href={`#/classroom/${programId}/${item.id}`} key={item.id}><span>{completed.includes(item.id) ? '✓' : item.order}</span><div><small>{item.week}주차 · {item.duration}</small><strong>{item.title}</strong></div></a>)}</aside>
      <article className="classroom-content">
        <div className="classroom-lesson-heading"><span>{active.week}주차 · {active.order}회차 · {active.duration}</span><h2>{active.title}</h2><p>{active.goal}</p></div>
        <section><h3>쉽게 이해하기</h3><p>{active.concept}</p></section>
        <section><h3>직접 따라 하기</h3><ol>{active.practice.map((step) => <li key={step}>{step}</li>)}</ol></section>
        <section><h3>예제 코드</h3><pre><code>{active.code}</code></pre></section>
        <section><h3>Codex 요청문</h3><blockquote>{active.prompt}</blockquote></section>
        <section><h3>자주 발생하는 오류</h3><ul>{active.errors.map((error) => <li key={error}>{error}</li>)}</ul></section>
        <section><h3>확인 문제</h3><ul>{active.quiz.map((item) => <li key={item}>{item}</li>)}</ul><p className="classroom-result"><strong>이번 회차 결과물</strong>{active.result}</p></section>
        <section><h3>과제</h3><p>{active.assignment}</p><h3>학습 완료 기준</h3><ul>{active.completionCriteria.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <div className="classroom-actions"><button className={`button ${isCompleted ? 'button-secondary' : 'button-primary'}`} onClick={toggle} type="button">{isCompleted ? '완료 취소' : '이 회차 학습 완료'}</button><div>{activeIndex > 0 && <a href={`#/classroom/${programId}/${course.sessions[activeIndex - 1].id}`}>← 이전 회차</a>}{activeIndex < course.sessions.length - 1 ? <a href={`#/classroom/${programId}/${course.sessions[activeIndex + 1].id}`}>다음 회차 →</a> : <a href="#/classroom">내 강의실로 →</a>}</div></div>
      </article>
    </div>
  </section>
}

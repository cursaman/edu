import { useEffect, useMemo, useState } from 'react'
import { detailedCourses } from '../data/courseLessons.js'
import { completedCourseSessions } from '../data/courseProgress.js'
import { loadUserLearning } from '../data/userProgress.js'

export default function MyClassroomPage({ session, supabaseConfigured }) {
  const [learning, setLearning] = useState({ completedByProgram: {}, enrollments: [] })
  const [loading, setLoading] = useState(Boolean(session?.user))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session?.user?.id) return undefined
    let active = true
    async function load() {
      setLoading(true); setError('')
      try {
        const result = await loadUserLearning(session.user.id)
        if (active) setLearning(result)
      } catch {
        if (active) setError('공동 학습 기록을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.')
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    window.addEventListener('edu-user-progress-updated', load)
    return () => { active = false; window.removeEventListener('edu-user-progress-updated', load) }
  }, [session?.user?.id])

  const enrollmentMap = useMemo(() => new Map(learning.enrollments.map((item) => [item.program_id, item])), [learning.enrollments])
  const visibleCourses = session?.user ? detailedCourses.filter((course) => enrollmentMap.has(course.programId)) : detailedCourses

  return <section className="content-page page-shell"><div className="page-introduction classroom-account-heading"><span className="section-eyebrow">MY CLASSROOM</span><h1>내 강의실</h1><p>{session?.user ? `${session.user.email} 계정의 학습 기록입니다. 다른 기기에서도 같은 계정으로 이어서 학습할 수 있습니다.` : '로그인하지 않은 진도는 현재 브라우저에만 저장됩니다. 첫 3회차를 체험한 뒤 계정으로 옮길 수 있습니다.'}</p>{supabaseConfigured && !session?.user && <a className="button button-primary" href="#/login?next=/classroom">로그인하고 진도 저장하기 →</a>}</div>
    {loading && <p className="classroom-status" role="status">공동 학습 기록을 불러오고 있습니다...</p>}
    {error && <p className="classroom-status classroom-status-error" role="alert">{error}</p>}
    {!loading && session?.user && visibleCourses.length === 0 && <div className="classroom-empty-account"><span aria-hidden="true">✦</span><h2>아직 시작한 과정이 없습니다</h2><p>대표 과정의 무료 회차를 열면 이곳에 최근 학습 과정과 진행률이 표시됩니다.</p><a className="button button-primary" href="#/recommend">나에게 맞는 과정 추천받기 →</a></div>}
    {!loading && visibleCourses.length > 0 && <div className="my-course-grid">{visibleCourses.map((course) => { const completed = session?.user ? (learning.completedByProgram[course.programId] || []) : completedCourseSessions(course.programId); const enrollment = enrollmentMap.get(course.programId); const next = enrollment?.last_session_id ? course.sessions.find((item) => item.id === enrollment.last_session_id) : course.sessions.find((item) => !completed.includes(item.id)) || course.sessions.at(-1); const percent = Math.round(completed.length / course.sessions.length * 100); return <article key={course.programId}><span className="section-eyebrow">{course.totalWeeks}주 · {course.sessions.length}회차</span><h2>{course.title}</h2><p>{course.outcome}</p>{enrollment?.last_studied_at && <small className="last-study-date">최근 학습 {new Date(enrollment.last_studied_at).toLocaleDateString('ko-KR')}</small>}<div className="my-course-progress"><div><i style={{ width: `${percent}%` }} /></div><strong>{percent}% · {completed.length}/{course.sessions.length}회 완료</strong></div><a className="button button-primary" href={`#/classroom/${course.programId}/${next?.id || course.sessions[0].id}`}>{completed.length || enrollment ? '이어서 학습하기' : '첫 회차 시작하기'} →</a></article> })}</div>}
    <div className="classroom-notice"><strong>{session?.user ? '공동 저장 안내' : '무료 체험 안내'}</strong><p>{session?.user ? '완료 회차와 마지막 학습 위치만 Supabase에 저장됩니다. 다른 사용자는 RLS 정책 때문에 이 기록을 볼 수 없습니다.' : 'Supabase가 연결된 공개 사이트에서는 각 과정의 첫 3회차까지 로그인 없이 이용할 수 있습니다. 실제 개인정보는 입력하지 마세요.'}</p></div>
  </section>
}

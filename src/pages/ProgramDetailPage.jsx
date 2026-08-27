import { findManagedProgram, readManagedContent } from '../data/contentStorage.js'
import { getProgramWeeks } from '../data/programWeeks.js'
import { findDetailedCourse } from '../data/courseLessons.js'
import { findFeaturedLearning } from '../data/featuredLearning.js'

export default function ProgramDetailPage({ programId }) {
  const program = findManagedProgram(programId)
  const detailedCourse = findDetailedCourse(programId)
  const featured = findFeaturedLearning(programId)
  const fallbackImage = `${import.meta.env.BASE_URL}images/edu-hero.webp`

  if (!program) {
    return (
      <section className="content-page page-shell empty-state">
        <strong>요청한 교육 프로그램을 찾지 못했습니다.</strong>
        <p>프로그램 목록으로 돌아가 다른 과정을 선택해 주세요.</p>
        <a className="button button-primary" href="#/programs">프로그램 목록으로 돌아가기</a>
      </section>
    )
  }

  const selectedLessonIds = program.relatedLessonIds || []
  const weeklyCurriculum = detailedCourse
    ? Array.from({ length: detailedCourse.totalWeeks }, (_, index) => {
      const sessions = detailedCourse.sessions.filter((session) => session.week === index + 1)
      return {
        week: index + 1,
        title: sessions.map((session) => session.title.split(' · ')[0]).join(' → '),
        summary: `${sessions.length}개 회차에서 개념을 이해하고, 따라 한 뒤 내 결과물에 적용합니다.`,
        topics: sessions.map((session) => session.title),
        tools: ['Codex', '실습 파일', '웹브라우저'],
        result: sessions.at(-1)?.result || detailedCourse.outcome,
        lessonIds: [],
      }
    })
    : getProgramWeeks(program)
  const displayedDuration = detailedCourse ? `${detailedCourse.totalWeeks}주 · ${detailedCourse.sessions.length}회차` : program.duration
  const relatedLessons = readManagedContent('lessons').filter((lesson) => (
    selectedLessonIds.length > 0
      ? selectedLessonIds.includes(lesson.id)
      : lesson.categoryId === program.categoryId
  ))

  return (
    <article className="content-page page-shell" aria-labelledby="program-detail-title">
      <a className="back-link" href={`#/programs?category=${program.categoryId}`}>← 교육 프로그램 목록</a>

      <header className="program-detail-header">
        <img
          alt={program.imageAlt || `${program.title} 교육 프로그램 대표 이미지`}
          className="program-detail-image"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = fallbackImage
          }}
          src={program.image || fallbackImage}
        />
        <span className="section-eyebrow">{program.category} · {program.level}</span>
        <h1 id="program-detail-title">{program.title}</h1>
        <p>{program.description}</p>

        <div className="detail-summary" aria-label="교육 기본 정보">
          <span>교육 분야 <strong>{program.category}</strong></span>
          <span>난이도 <strong>{program.level}</strong></span>
          <span>교육 기간 <strong>{displayedDuration}</strong></span>
          <span>진행 상태 <strong>{program.status}</strong></span>
        </div>
      </header>

      {featured && detailedCourse && <section className="program-experience-panel" aria-labelledby="program-experience-title"><div><span className="section-eyebrow">VERIFIED FREE EXPERIENCE</span><h2 id="program-experience-title">첫 3회차를 무료로 확인하고 결정하세요</h2><p>{featured.promise}</p><ul>{featured.quality.checked.map((item) => <li key={item}>✓ {item}</li>)}</ul><small>{featured.quality.next}</small></div><aside><img alt={featured.imageAlt} src={`${import.meta.env.BASE_URL}${featured.image}`} /><strong>{featured.resultTitle}</strong><span>{featured.resultDescription}</span><a className="button button-primary" href={`#/classroom/${program.id}/${detailedCourse.sessions[0].id}`}>무료 체험 시작하기 →</a></aside></section>}

      <div className="detail-layout">
        <div className="detail-main">
          <section className="detail-section">
            <h2>교육 소개</h2>
            <p>{program.introduction}</p>
          </section>

          <section className="detail-section">
            <h2>이런 분께 추천해요</h2>
            <ul>{program.audience.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="detail-section">
            <h2>학습 목표</h2>
            <ul>{program.goals.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          {relatedLessons.length > 0 && (
            <section className="detail-section">
              <h2>함께 보면 좋은 교육자료</h2>
              <ul className="related-lesson-list">
                {relatedLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <a href={`#/lessons/${lesson.id}`}>{lesson.title} <span>약 {lesson.duration}</span></a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="preparation-card">
          <span className="section-eyebrow">BEFORE YOU START</span>
          <h2>수업 전 준비물</h2>
          <ul>{program.preparations.map((item) => <li key={item}>{item}</li>)}</ul>
          {detailedCourse
            ? <a className="button button-primary" href={`#/classroom/${program.id}/${detailedCourse.sessions[0].id}`}>{detailedCourse.sessions.length}회차 강의 시작하기</a>
            : <a className="button button-primary" href="#/application">수강 신청 안내 보기</a>}
          <p className="preparation-note">대표 과정은 상세 강의실을 체험할 수 있으며 진도는 현재 브라우저에 저장됩니다.</p>
        </aside>
      </div>

      <section className="weekly-curriculum-section" aria-labelledby="weekly-curriculum-title">
        <div className="weekly-curriculum-heading">
          <span className="section-eyebrow">{weeklyCurriculum.length} WEEK CURRICULUM</span>
          <h2 id="weekly-curriculum-title">주차별 커리큘럼</h2>
          <p>매주 무엇을 배우고 어떤 결과물을 완성하는지 한눈에 확인하세요.</p>
        </div>
        <div className="weekly-curriculum-grid">
          {weeklyCurriculum.map((week) => (
            <article className="weekly-curriculum-card" key={week.week}>
              <div className={`weekly-card-image weekly-card-image-${program.color}`}>
                <img alt="" aria-hidden="true" src={program.image || fallbackImage} />
                <strong>WEEK {String(week.week).padStart(2, '0')}</strong>
              </div>
              <div className="weekly-card-body">
                <span>STEP {String(week.week).padStart(2, '0')}</span>
                <h3>{week.title}</h3>
                <p>{week.summary}</p>
                <ul>{week.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                <dl><div><dt>사용 도구</dt><dd>{week.tools.join(' · ')}</dd></div><div><dt>완성 결과</dt><dd>{week.result}</dd></div></dl>
                {week.lessonIds.length > 0 && <div className="weekly-card-links">{week.lessonIds.map((lessonId) => { const lesson = readManagedContent('lessons').find((item) => item.id === lessonId); return lesson ? <a href={`#/lessons/${lesson.id}`} key={lesson.id}>{lesson.title} →</a> : null })}</div>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}


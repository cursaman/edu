import { programs } from '../data/catalog.js'
import { lessons } from '../data/lessons.js'

export default function ProgramDetailPage({ programId }) {
  const program = programs.find((item) => item.id === programId)

  if (!program) {
    return (
      <section className="content-page page-shell empty-state">
        <strong>요청한 교육 프로그램을 찾지 못했습니다.</strong>
        <p>프로그램 목록으로 돌아가 다른 과정을 선택해 주세요.</p>
        <a className="button button-primary" href="#/programs">프로그램 목록으로 돌아가기</a>
      </section>
    )
  }

  const relatedLessons = lessons.filter((lesson) => lesson.categoryId === program.categoryId)

  return (
    <article className="content-page page-shell" aria-labelledby="program-detail-title">
      <a className="back-link" href={`#/programs?category=${program.categoryId}`}>← 교육 프로그램 목록</a>

      <header className="program-detail-header">
        <span className="section-eyebrow">{program.category} · {program.level}</span>
        <h1 id="program-detail-title">{program.title}</h1>
        <p>{program.description}</p>

        <div className="detail-summary" aria-label="교육 기본 정보">
          <span>교육 분야 <strong>{program.category}</strong></span>
          <span>난이도 <strong>{program.level}</strong></span>
          <span>교육 기간 <strong>{program.duration}</strong></span>
          <span>진행 상태 <strong>{program.status}</strong></span>
        </div>
      </header>

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

          <section className="detail-section">
            <h2>주차별 교육 과정</h2>
            <ol className="curriculum-list">
              {program.curriculum.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}주차</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ol>
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
          <a className="button button-primary" href="#/application">수강 신청 안내 보기</a>
          <p className="preparation-note">실제 신청 접수는 다음 개발 단계에서 연결됩니다.</p>
        </aside>
      </div>
    </article>
  )
}

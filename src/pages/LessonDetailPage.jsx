import { useState } from 'react'
import { readCompletedLessons, updateLessonCompletion } from '../data/learningProgress.js'
import { findManagedLesson } from '../data/contentStorage.js'

export default function LessonDetailPage({ lessonId }) {
  const lesson = findManagedLesson(lessonId)
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons)

  if (!lesson) {
    return (
      <section className="content-page page-shell empty-state">
        <strong>요청한 교육자료를 찾지 못했습니다.</strong>
        <p>교육자료 목록으로 돌아가 다른 자료를 선택해 주세요.</p>
        <a className="button button-primary" href="#/lessons">교육자료 목록으로 돌아가기</a>
      </section>
    )
  }

  const completed = completedLessons.includes(lesson.id)
  const nextLesson = lesson.nextLessonId ? findManagedLesson(lesson.nextLessonId) : null

  function toggleCompletion() {
    setCompletedLessons(updateLessonCompletion(lesson.id, !completed))
  }

  return (
    <article className="content-page page-shell" aria-labelledby="lesson-detail-title">
      <a className="back-link" href={`#/lessons?category=${lesson.categoryId}`}>← 교육자료 목록</a>

      <header className="program-detail-header">
        <span className="section-eyebrow">{lesson.category} · {lesson.level}</span>
        <h1 id="lesson-detail-title">{lesson.title}</h1>
        <p>{lesson.description}</p>

        <div className="detail-summary">
          <span>교육 분야 <strong>{lesson.category}</strong></span>
          <span>난이도 <strong>{lesson.level}</strong></span>
          <span>학습 시간 <strong>약 {lesson.duration}</strong></span>
          {completed && <span className="lesson-complete-badge">학습 완료</span>}
        </div>
      </header>

      <div className="detail-layout lesson-detail-layout">
        <div className="detail-main">
          <section className="detail-section">
            <h2>이 자료에서 배울 내용</h2>
            <ul>{lesson.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
          </section>

          <section className="detail-section">
            <h2>쉽게 이해하기</h2>
            <p>{lesson.explanation}</p>
          </section>

          <section className="detail-section">
            <h2>차근차근 따라 하기</h2>
            <ol className="curriculum-list lesson-step-list">
              {lesson.steps.map((step, index) => (
                <li key={step}><span>{index + 1}단계</span><strong>{step}</strong></li>
              ))}
            </ol>
          </section>

          <section className="detail-section">
            <h2>예제 코드</h2>
            <div className="lesson-code-block">
              <span>{lesson.codeLanguage}</span>
              <pre><code>{lesson.code}</code></pre>
            </div>
          </section>

          <section className="detail-section">
            <h2>Codex에는 이렇게 요청하세요</h2>
            <blockquote className="lesson-prompt">{lesson.prompt}</blockquote>
          </section>

          <section className="detail-section">
            <h2>학습 후 확인해 보세요</h2>
            <ul>{lesson.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          {nextLesson && (
            <section className="next-lesson">
              <span className="section-eyebrow">NEXT LESSON</span>
              <h2>다음에는 이 자료를 살펴보세요</h2>
              <a href={`#/lessons/${nextLesson.id}`}>{nextLesson.title} <span aria-hidden="true">→</span></a>
            </section>
          )}
        </div>

        <aside className="preparation-card lesson-completion-card">
          <span className="section-eyebrow">MY LEARNING</span>
          <h2>{completed ? '학습을 완료했어요' : '학습을 시작해 볼까요?'}</h2>
          <p>자료를 끝까지 살펴본 뒤 아래 버튼을 누르면 현재 브라우저에 완료 표시가 저장됩니다.</p>
          <button
            aria-pressed={completed}
            className={`button ${completed ? 'button-secondary' : 'button-primary'}`}
            onClick={toggleCompletion}
            type="button"
          >
            {completed ? '학습 완료 취소' : '학습 완료 표시하기'}
          </button>
          <p className="preparation-note">다른 컴퓨터나 브라우저에는 완료 기록이 자동으로 옮겨지지 않습니다.</p>
        </aside>
      </div>
    </article>
  )
}

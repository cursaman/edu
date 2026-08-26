import { useEffect, useState } from 'react'
import { readCompletedLessons, updateLessonCompletion } from '../data/learningProgress.js'
import { findManagedLesson } from '../data/contentStorage.js'
import { findManagedProgram } from '../data/contentStorage.js'
import { readFavoriteLessons, recordRecentLesson, toggleFavoriteLesson } from '../data/lessonActivity.js'

export default function LessonDetailPage({ lessonId }) {
  const lesson = findManagedLesson(lessonId)
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons)
  const [favoriteLessons, setFavoriteLessons] = useState(readFavoriteLessons)

  useEffect(() => {
    if (lessonId) recordRecentLesson(lessonId)
  }, [lessonId])

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
  const relatedProgram = lesson.relatedProgramId ? findManagedProgram(lesson.relatedProgramId) : null
  const favorite = favoriteLessons.includes(lesson.id)

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

          {lesson.extendedContent && <>
            <section className="detail-section lesson-purpose-section">
              <h2>왜 배워야 하나요?</h2>
              <p>{lesson.extendedContent.why}</p>
              <h3>오늘 완성할 결과</h3>
              <p>{lesson.extendedContent.outcome}</p>
            </section>

            <section className="detail-section">
              <h2>시작 전에 준비하세요</h2>
              <ul>{lesson.extendedContent.preparations.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </>}

          <section className="detail-section">
            <h2>오늘의 10분 실습</h2>
            <p>전부 외우지 말고 아래 순서대로 한 단계씩 실행해 보세요.</p>
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

          {lesson.extendedContent && <section className="detail-section">
            <h2>코드를 한 줄씩 이해해요</h2>
            <dl className="lesson-explanation-list">{lesson.extendedContent.walkthrough.map(([term, meaning]) => <div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
          </section>}

          <section className="detail-section">
            <h2>Codex에는 이렇게 요청하세요</h2>
            <blockquote className="lesson-prompt">{lesson.prompt}</blockquote>
            {lesson.extendedContent && <ol className="lesson-prompt-list">{lesson.extendedContent.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol>}
          </section>

          {lesson.extendedContent && <>
            <section className="detail-section">
              <h2>자주 생기는 오류와 해결법</h2>
              <dl className="lesson-error-list">{lesson.extendedContent.errors.map(([error, solution]) => <div key={error}><dt>{error}</dt><dd>{solution}</dd></div>)}</dl>
            </section>
            <section className="detail-section lesson-challenge">
              <h2>한 단계 더 해보기</h2><p>{lesson.extendedContent.challenge}</p>
            </section>
            <section className="detail-section">
              <h2>확인 문제와 정답</h2>
              <details className="lesson-quiz"><summary>문제 5개와 정답 열기</summary>{lesson.extendedContent.quiz.map(([question, answer], index) => <div key={question}><strong>{index + 1}. {question}</strong><p>{answer}</p></div>)}</details>
            </section>
          </>}

          <section className="detail-section">
            <h2>학습 후 확인해 보세요</h2>
            <ul>{lesson.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          {(lesson.pdfUrl || lesson.slideUrl) && (
            <section className="detail-section lesson-material-card">
              <span className="section-eyebrow">DOWNLOAD MATERIALS</span>
              <h2>수업 자료로 복습하세요</h2>
              <p>PDF는 바로 열어 읽고, PPT는 내려받아 수업이나 개인 복습에 사용할 수 있습니다.</p>
              <p className="lesson-material-meta">버전 {lesson.materialVersion || '1.0'} · {lesson.slidePages || 8}쪽</p>
              <div className="lesson-material-actions">
                {lesson.pdfUrl && <a className="button button-primary" href={lesson.pdfUrl} rel="noreferrer" target="_blank">PDF 자료 보기</a>}
                {lesson.slideUrl && <a className="button button-secondary" download href={lesson.slideUrl}>PPT 자료 받기</a>}
              </div>
            </section>
          )}

          {nextLesson && (
            <section className="next-lesson">
              <span className="section-eyebrow">NEXT LESSON</span>
              <h2>다음에는 이 자료를 살펴보세요</h2>
              <a href={`#/lessons/${nextLesson.id}`}>{nextLesson.title} <span aria-hidden="true">→</span></a>
            </section>
          )}

          {relatedProgram && (
            <section className="next-lesson related-program-panel">
              <span className="section-eyebrow">RELATED PROGRAM</span>
              <h2>이 자료와 연결된 교육 프로그램</h2>
              <a href={`#/programs/${relatedProgram.id}`}>{relatedProgram.title} <span aria-hidden="true">→</span></a>
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
          <button aria-pressed={favorite} className="button button-secondary" onClick={() => setFavoriteLessons(toggleFavoriteLesson(lesson.id))} type="button">
            {favorite ? '♥ 찜한 자료에서 빼기' : '♡ 나중에 볼 자료로 찜하기'}
          </button>
          <p className="preparation-note">다른 컴퓨터나 브라우저에는 완료 기록이 자동으로 옮겨지지 않습니다.</p>
        </aside>
      </div>
    </article>
  )
}


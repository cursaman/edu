export default function LessonCard({ lesson, completed = false }) {
  return (
    <article className={`lesson-card${completed ? ' lesson-card-completed' : ''}`}>
      <div className="lesson-card-topline">
        <span className="lesson-category">{lesson.category}</span>
        {completed && <span className="lesson-complete-badge">학습 완료</span>}
      </div>

      <h2 className="lesson-card-title">
        <a href={`#/lessons/${lesson.id}`}>{lesson.title}</a>
      </h2>
      <p className="lesson-card-description">{lesson.description}</p>

      <div className="lesson-card-meta">
        <span>{lesson.level}</span>
        <span aria-hidden="true">·</span>
        <span>약 {lesson.duration}</span>
      </div>

      <a className="lesson-card-link" href={`#/lessons/${lesson.id}`}>
        {completed ? '다시 살펴보기' : '학습 시작하기'} <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

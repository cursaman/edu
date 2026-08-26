export default function LessonCard({ lesson, completed = false, favorite = false, onToggleFavorite }) {
  return (
    <article className={`lesson-card${completed ? ' lesson-card-completed' : ''}`}>
      <div className="lesson-card-topline">
        <span className="lesson-category">{lesson.category}</span>
        <div className="lesson-card-badges">
          {lesson.popular && <span className="lesson-popular-badge">인기</span>}
          {lesson.featured && <span className="lesson-featured-badge">추천</span>}
          {completed && <span className="lesson-complete-badge">학습 완료</span>}
        </div>
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

      {onToggleFavorite && (
        <button
          aria-label={`${lesson.title} ${favorite ? '찜 해제' : '찜하기'}`}
          aria-pressed={favorite}
          className={`lesson-favorite-button${favorite ? ' lesson-favorite-button-active' : ''}`}
          onClick={() => onToggleFavorite(lesson.id)}
          type="button"
        >
          <span aria-hidden="true">{favorite ? '♥' : '♡'}</span> {favorite ? '찜한 자료' : '찜하기'}
        </button>
      )}

      <a className="lesson-card-link" href={`#/lessons/${lesson.id}`}>
        {completed ? '다시 살펴보기' : '학습 시작하기'} <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}


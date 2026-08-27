export default function CategoryCard({ category, detailed = false, programCount = 0 }) {
  return (
    <article className="category-card" style={{ '--category-accent': category.accent }}>
      <div className="category-topline">
        <span className="category-icon" aria-hidden="true">{category.mark}</span>
        <span className="category-eyebrow">{category.eyebrow}</span>
      </div>

      <h3 className="category-title">{category.title}</h3>
      <p className="category-description">{category.description}</p>

      {detailed && (
        <dl className="category-details">
          <div><dt>학습 대상</dt><dd>{category.audience}</dd></div>
          <div><dt>관련 과정</dt><dd>{programCount}개</dd></div>
        </dl>
      )}

      <div className="category-actions">
        <a className="category-link" href={`#/programs?category=${category.id}`} aria-label={`${category.title} 교육 프로그램 보기`}>프로그램 <span aria-hidden="true">→</span></a>
        <a className="category-link category-link-secondary" href={`#/lessons?category=${category.id}`} aria-label={`${category.title} 교육자료 보기`}>교육자료</a>
      </div>
    </article>
  )
}

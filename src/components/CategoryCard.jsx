export default function CategoryCard({ category }) {
  return (
    <article className="category-card" style={{ '--category-accent': category.accent }}>
      <div className="category-topline">
        <span className="category-eyebrow">{category.eyebrow}</span>
        <span className="category-mark" aria-hidden="true">
          {category.mark}
        </span>
      </div>

      <h3 className="category-title">{category.title}</h3>
      <p className="category-description">{category.description}</p>

      <a className="category-link" href="#programs" aria-label={`${category.title} 교육 프로그램 보기`}>
        과정 살펴보기 <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

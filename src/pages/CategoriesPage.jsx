import CategoryCard from '../components/CategoryCard.jsx'
import { categories, programs } from '../data/catalog.js'

export default function CategoriesPage() {
  return (
    <section className="content-page page-shell" aria-labelledby="categories-title">
      <div className="page-introduction">
        <span className="section-eyebrow">LEARNING CATEGORIES</span>
        <h1 id="categories-title">어떤 분야부터 배워볼까요?</h1>
        <p>웹개발의 전체 흐름을 여섯 가지 분야로 나누었습니다. 지금 관심 있는 분야부터 천천히 살펴보세요.</p>
      </div>

      <div className="category-grid category-grid-detailed">
        {categories.map((category) => (
          <CategoryCard
            category={category}
            detailed
            key={category.id}
            programCount={programs.filter((program) => program.categoryId === category.id).length}
          />
        ))}
      </div>

      <aside className="page-help">
        <strong>아직 어떤 분야가 맞는지 모르겠나요?</strong>
        <p>교육 프로그램을 먼저 살펴보면 내가 만들고 싶은 결과물에 맞는 과정을 찾을 수 있습니다.</p>
        <a className="button button-secondary" href="#/programs">전체 교육 프로그램 보기</a>
      </aside>
    </section>
  )
}

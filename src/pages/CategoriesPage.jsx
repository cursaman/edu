import CategoryCard from '../components/CategoryCard.jsx'
import { categories } from '../data/catalog.js'
import { readManagedContent } from '../data/contentStorage.js'

export default function CategoriesPage() {
  const programs = readManagedContent('programs')
  const lessons = readManagedContent('lessons')

  return (
    <section className="content-page page-shell catalog-page" aria-labelledby="categories-title">
      <div className="page-introduction catalog-hero category-catalog-hero">
        <div className="catalog-hero-copy">
          <span className="section-eyebrow">10 LEARNING CATEGORIES</span>
          <h1 id="categories-title">관심 분야에서 시작해<br />하나의 서비스를 완성하세요.</h1>
          <p>기획과 디자인부터 개발, 데이터, 보안, 배포까지 웹서비스의 전체 흐름을 10개 분야로 나누었습니다.</p>
        </div>
        <div className="catalog-hero-stats" aria-label="교육 분야 현황">
          <article><span>분야</span><strong>{categories.length}</strong><small>관심 분야 선택</small></article>
          <article><span>프로그램</span><strong>{programs.length}</strong><small>단계별 과정</small></article>
          <article><span>교육자료</span><strong>{lessons.length}</strong><small>바로 보는 실습</small></article>
        </div>
      </div>

      <div className="catalog-section-heading"><div><span className="section-eyebrow">CHOOSE YOUR FIELD</span><h2>교육 분야 전체 보기</h2></div><p>카드의 프로그램 또는 교육자료를 눌러 해당 분야만 모아볼 수 있습니다.</p></div>

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

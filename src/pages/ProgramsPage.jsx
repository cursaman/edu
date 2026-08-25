import ProgramCard from '../components/ProgramCard.jsx'
import { categories } from '../data/catalog.js'
import { readManagedContent } from '../data/contentStorage.js'

export default function ProgramsPage({ selectedCategory }) {
  const programs = readManagedContent('programs')
  const activeCategory = categories.some((category) => category.id === selectedCategory)
    ? selectedCategory
    : 'all'
  const visiblePrograms = activeCategory === 'all'
    ? programs
    : programs.filter((program) => program.categoryId === activeCategory)

  return (
    <section className="content-page page-shell" aria-labelledby="programs-title">
      <div className="page-introduction">
        <span className="section-eyebrow">EDUCATION PROGRAMS</span>
        <h1 id="programs-title">나에게 맞는 교육 프로그램</h1>
        <p>교육 분야를 선택하면 관련 프로그램만 모아볼 수 있습니다. 프로그램을 누르면 자세한 교육 내용을 확인합니다.</p>
      </div>

      <nav className="program-filters" aria-label="교육 분야별 프로그램 선택">
        <a
          aria-current={activeCategory === 'all' ? 'page' : undefined}
          className={`filter-chip${activeCategory === 'all' ? ' filter-chip-active' : ''}`}
          href="#/programs"
        >
          전체 <span>{programs.length}</span>
        </a>

        {categories.map((category) => (
          <a
            aria-current={activeCategory === category.id ? 'page' : undefined}
            className={`filter-chip${activeCategory === category.id ? ' filter-chip-active' : ''}`}
            href={`#/programs?category=${category.id}`}
            key={category.id}
          >
            {category.title}
          </a>
        ))}
      </nav>

      <p className="results-summary">현재 볼 수 있는 프로그램 <strong>{visiblePrograms.length}개</strong></p>

      {visiblePrograms.length > 0 ? (
        <div className="program-grid">
          {visiblePrograms.map((program) => <ProgramCard key={program.id} program={program} />)}
        </div>
      ) : (
        <div className="empty-state">
          <strong>이 분야의 프로그램은 준비하고 있어요.</strong>
          <p>다른 분야를 선택하거나 전체 프로그램을 먼저 살펴보세요.</p>
          <a className="button button-secondary" href="#/programs">전체 프로그램 보기</a>
        </div>
      )}
    </section>
  )
}

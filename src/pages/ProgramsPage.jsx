import ProgramCard from '../components/ProgramCard.jsx'
import { categories } from '../data/catalog.js'
import { readManagedContent } from '../data/contentStorage.js'

const PROGRAMS_PER_PAGE = 9

function pageHref(categoryId, page) {
  const params = new URLSearchParams()
  if (categoryId !== 'all') params.set('category', categoryId)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return `#/programs${query ? `?${query}` : ''}`
}

export default function ProgramsPage({ selectedCategory, selectedPage }) {
  const programs = readManagedContent('programs')
  const activeCategory = categories.some((category) => category.id === selectedCategory)
    ? selectedCategory
    : 'all'
  const visiblePrograms = activeCategory === 'all'
    ? programs
    : programs.filter((program) => program.categoryId === activeCategory)
  const totalPages = Math.max(1, Math.ceil(visiblePrograms.length / PROGRAMS_PER_PAGE))
  const requestedPage = Number.parseInt(selectedPage, 10)
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1
  const startIndex = (currentPage - 1) * PROGRAMS_PER_PAGE
  const pagedPrograms = visiblePrograms.slice(startIndex, startIndex + PROGRAMS_PER_PAGE)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

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

      <p className="results-summary">
        전체 <strong>{visiblePrograms.length}개</strong>
        {visiblePrograms.length > 0 && <> · 현재 <strong>{startIndex + 1}–{Math.min(startIndex + PROGRAMS_PER_PAGE, visiblePrograms.length)}번</strong></>}
      </p>

      {visiblePrograms.length > 0 ? (
        <>
          <div className="program-grid">
            {pagedPrograms.map((program) => <ProgramCard key={program.id} program={program} />)}
          </div>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="교육 프로그램 페이지 이동">
              {currentPage === 1
                ? <span aria-disabled="true" className="pagination-move pagination-disabled">이전</span>
                : <a className="pagination-move" href={pageHref(activeCategory, currentPage - 1)}>이전</a>}
              <div className="pagination-numbers">
                {pageNumbers.map((page) => (
                  <a aria-current={page === currentPage ? 'page' : undefined} className={`pagination-number${page === currentPage ? ' pagination-current' : ''}`} href={pageHref(activeCategory, page)} key={page}>{page}</a>
                ))}
              </div>
              {currentPage === totalPages
                ? <span aria-disabled="true" className="pagination-move pagination-disabled">다음</span>
                : <a className="pagination-move" href={pageHref(activeCategory, currentPage + 1)}>다음</a>}
            </nav>
          )}
        </>
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

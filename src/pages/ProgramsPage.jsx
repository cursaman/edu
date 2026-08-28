import { useEffect, useState } from 'react'
import ProgramCard from '../components/ProgramCard.jsx'
import { categories } from '../data/catalog.js'
import { readManagedContent } from '../data/contentStorage.js'

const PROGRAMS_PER_PAGE = 9
const levelOrder = ['입문', '기초', '중급', '실전', '프로젝트']

function programsHref({ category = 'all', page = 1, search = '', level = 'all', track = 'all', duration = 'all', sort = 'recommended' }) {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (search.trim()) params.set('search', search.trim())
  if (level !== 'all') params.set('level', level)
  if (track !== 'all') params.set('track', track)
  if (duration !== 'all') params.set('duration', duration)
  if (sort !== 'recommended') params.set('sort', sort)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return `#/programs${query ? `?${query}` : ''}`
}

function paginationItems(totalPages, currentPage) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)
  const pages = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b)
  const items = []
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) items.push(`ellipsis-${page}`)
    items.push(page)
  })
  return items
}

export default function ProgramsPage({ selectedCategory, selectedPage, selectedSearch, selectedLevel, selectedTrack, selectedDuration, selectedSort }) {
  const programs = readManagedContent('programs')
  const [searchInput, setSearchInput] = useState(selectedSearch)
  const activeCategory = categories.some((category) => category.id === selectedCategory) ? selectedCategory : 'all'
  const activeCategoryData = categories.find((category) => category.id === activeCategory)
  const availableLevels = levelOrder.filter((level) => programs.some((program) => program.level === level))
  const availableDurations = [...new Set(programs.map((program) => program.duration.match(/\d+주/)?.[0]).filter(Boolean))]
    .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
  const activeLevel = availableLevels.includes(selectedLevel) ? selectedLevel : 'all'
  const activeTrack = ['입문', '실무', '시니어'].includes(selectedTrack) ? selectedTrack : 'all'
  const activeDuration = availableDurations.includes(selectedDuration) ? selectedDuration : 'all'
  const activeSort = ['recommended', 'title', 'level', 'latest'].includes(selectedSort) ? selectedSort : 'recommended'
  const normalizedSearch = selectedSearch.trim().toLocaleLowerCase('ko-KR')
  const filters = { category: activeCategory, search: selectedSearch, level: activeLevel, track: activeTrack, duration: activeDuration, sort: activeSort }

  useEffect(() => setSearchInput(selectedSearch), [selectedSearch])

  const visiblePrograms = programs
    .filter((program) => activeCategory === 'all' || program.categoryId === activeCategory)
    .filter((program) => activeLevel === 'all' || program.level === activeLevel)
    .filter((program) => activeTrack === 'all' || program.learningTrack === activeTrack)
    .filter((program) => activeDuration === 'all' || program.duration.includes(activeDuration))
    .filter((program) => !normalizedSearch || [program.title, program.description, program.introduction, program.category]
      .filter(Boolean).join(' ').toLocaleLowerCase('ko-KR').includes(normalizedSearch))
    .sort((a, b) => {
      if (activeSort === 'title') return a.title.localeCompare(b.title, 'ko')
      if (activeSort === 'level') return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
      if (activeSort === 'latest') return Number(b.number) - Number(a.number)
      return Number(a.number) - Number(b.number)
    })

  const totalPages = Math.max(1, Math.ceil(visiblePrograms.length / PROGRAMS_PER_PAGE))
  const requestedPage = Number.parseInt(selectedPage, 10)
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1
  const startIndex = (currentPage - 1) * PROGRAMS_PER_PAGE
  const pagedPrograms = visiblePrograms.slice(startIndex, startIndex + PROGRAMS_PER_PAGE)
  const hasActiveFilters = activeCategory !== 'all' || normalizedSearch || activeLevel !== 'all' || activeTrack !== 'all' || activeDuration !== 'all' || activeSort !== 'recommended'

  function navigate(nextFilters) {
    window.location.hash = programsHref(nextFilters).slice(1)
  }

  function submitSearch(event) {
    event.preventDefault()
    navigate({ ...filters, search: searchInput, page: 1 })
  }

  return (
    <section className="content-page page-shell catalog-page" aria-labelledby="programs-title">
      <div className="page-introduction catalog-hero filtered-catalog-hero" style={{ '--catalog-accent': activeCategoryData?.accent || '#5d67f5' }}>
        <div className="catalog-hero-copy">
          <span className="section-eyebrow">{activeCategoryData?.eyebrow || '100 EDUCATION PROGRAMS'}</span>
          <h1 id="programs-title">{activeCategoryData ? `${activeCategoryData.title} 프로그램` : '나에게 맞는 교육 프로그램'}</h1>
          <p>{activeCategoryData?.description || '기초부터 프로젝트까지, 만들고 싶은 결과에 맞는 과정을 선택하세요.'}</p>
          <div className="catalog-hero-tags"><span>단계별 실습</span><span>결과물 중심</span><span>모바일 학습</span></div>
        </div>
        <div className="catalog-hero-symbol" aria-hidden="true"><strong>{activeCategoryData?.mark || '100'}</strong><span>{activeCategoryData ? 'FIELD' : 'PROGRAMS'}</span></div>
      </div>

      <form className="program-search" onSubmit={submitSearch} role="search">
        <label htmlFor="program-search-input">프로그램 검색</label>
        <div>
          <input id="program-search-input" onChange={(event) => setSearchInput(event.target.value)} placeholder="예: React, 보안, Figma" type="search" value={searchInput} />
          <button className="button button-primary" type="submit">검색</button>
        </div>
      </form>

      <nav className="program-filters" aria-label="교육 분야별 프로그램 선택">
        <a aria-current={activeCategory === 'all' ? 'page' : undefined} className={`filter-chip${activeCategory === 'all' ? ' filter-chip-active' : ''}`} href={programsHref({ ...filters, category: 'all', page: 1 })}>전체 <span>{programs.length}</span></a>
        {categories.map((category) => <a aria-current={activeCategory === category.id ? 'page' : undefined} className={`filter-chip${activeCategory === category.id ? ' filter-chip-active' : ''}`} href={programsHref({ ...filters, category: category.id, page: 1 })} key={category.id}>{category.title}</a>)}
      </nav>

      <div className="program-filter-toolbar" aria-label="교육 프로그램 상세 필터">
        <label>학습 단계<select onChange={(event) => navigate({ ...filters, track: event.target.value, page: 1 })} value={activeTrack}><option value="all">전체 단계</option><option>입문</option><option>실무</option><option>시니어</option></select></label>
        <label>난이도<select onChange={(event) => navigate({ ...filters, level: event.target.value, page: 1 })} value={activeLevel}><option value="all">전체 난이도</option>{availableLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
        <label>교육 기간<select onChange={(event) => navigate({ ...filters, duration: event.target.value, page: 1 })} value={activeDuration}><option value="all">전체 기간</option>{availableDurations.map((duration) => <option key={duration} value={duration}>{duration}</option>)}</select></label>
        <label>정렬<select onChange={(event) => navigate({ ...filters, sort: event.target.value, page: 1 })} value={activeSort}><option value="recommended">추천 순</option><option value="latest">새 프로그램 순</option><option value="title">이름 순</option><option value="level">난이도 순</option></select></label>
        {hasActiveFilters && <a className="program-filter-reset" href="#/programs">조건 초기화</a>}
      </div>

      <p className="results-summary" aria-live="polite">검색 결과 <strong>{visiblePrograms.length}개</strong>{visiblePrograms.length > 0 && <> · 현재 <strong>{startIndex + 1}–{Math.min(startIndex + PROGRAMS_PER_PAGE, visiblePrograms.length)}번</strong></>}</p>

      {visiblePrograms.length > 0 ? <>
        <div className="program-grid">{pagedPrograms.map((program) => <ProgramCard key={program.id} program={program} />)}</div>
        {totalPages > 1 && <nav className="pagination" aria-label="교육 프로그램 페이지 이동">
          {currentPage === 1 ? <span aria-disabled="true" className="pagination-move pagination-disabled">이전</span> : <a className="pagination-move" href={programsHref({ ...filters, page: currentPage - 1 })}>이전</a>}
          <div className="pagination-numbers">{paginationItems(totalPages, currentPage).map((item) => typeof item === 'string' ? <span aria-hidden="true" className="pagination-ellipsis" key={item}>…</span> : <a aria-current={item === currentPage ? 'page' : undefined} aria-label={`${item}페이지`} className={`pagination-number${item === currentPage ? ' pagination-current' : ''}`} href={programsHref({ ...filters, page: item })} key={item}>{item}</a>)}</div>
          {currentPage === totalPages ? <span aria-disabled="true" className="pagination-move pagination-disabled">다음</span> : <a className="pagination-move" href={programsHref({ ...filters, page: currentPage + 1 })}>다음</a>}
        </nav>}
      </> : <div className="empty-state"><strong>조건에 맞는 프로그램을 찾지 못했습니다.</strong><p>검색어를 줄이거나 난이도와 기간 조건을 초기화해 보세요.</p><a className="button button-secondary" href="#/programs">모든 프로그램 보기</a></div>}
    </section>
  )
}

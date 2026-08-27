import { useEffect, useState } from 'react'
import LessonCard from '../components/LessonCard.jsx'
import { categories } from '../data/catalog.js'
import { readCompletedLessons } from '../data/learningProgress.js'
import { readManagedContent } from '../data/contentStorage.js'
import { readFavoriteLessons, readRecentLessons, toggleFavoriteLesson } from '../data/lessonActivity.js'

const LESSONS_PER_PAGE = 9
const levelOrder = ['입문', '기초', '중급', '실전', '프로젝트']

function lessonsHref({ category = 'all', page = 1, search = '', level = 'all', duration = 'all', sort = 'recommended', collection = 'all' }) {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (search.trim()) params.set('search', search.trim())
  if (level !== 'all') params.set('level', level)
  if (duration !== 'all') params.set('duration', duration)
  if (sort !== 'recommended') params.set('sort', sort)
  if (collection !== 'all') params.set('collection', collection)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return `#/lessons${query ? `?${query}` : ''}`
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

export default function LessonsPage({ selectedCategory, selectedPage, selectedSearch, selectedLevel, selectedDuration, selectedSort, selectedCollection }) {
  const lessons = readManagedContent('lessons')
  const [searchInput, setSearchInput] = useState(selectedSearch)
  const [completedLessons] = useState(readCompletedLessons)
  const [favoriteLessons, setFavoriteLessons] = useState(readFavoriteLessons)
  const [recentLessons, setRecentLessons] = useState(readRecentLessons)
  const activeCategory = categories.some((category) => category.id === selectedCategory) ? selectedCategory : 'all'
  const activeCategoryData = categories.find((category) => category.id === activeCategory)
  const availableLevels = levelOrder.filter((level) => lessons.some((lesson) => lesson.level === level))
  const availableDurations = [...new Set(lessons.map((lesson) => lesson.duration.match(/\d+분/)?.[0]).filter(Boolean))]
    .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
  const activeLevel = availableLevels.includes(selectedLevel) ? selectedLevel : 'all'
  const activeDuration = availableDurations.includes(selectedDuration) ? selectedDuration : 'all'
  const activeSort = ['recommended', 'latest', 'title', 'duration'].includes(selectedSort) ? selectedSort : 'recommended'
  const activeCollection = ['all', 'favorites', 'recent'].includes(selectedCollection) ? selectedCollection : 'all'
  const normalizedSearch = selectedSearch.trim().toLocaleLowerCase('ko-KR')
  const filters = { category: activeCategory, search: selectedSearch, level: activeLevel, duration: activeDuration, sort: activeSort, collection: activeCollection }

  useEffect(() => setSearchInput(selectedSearch), [selectedSearch])
  useEffect(() => {
    const refresh = () => { setFavoriteLessons(readFavoriteLessons()); setRecentLessons(readRecentLessons()) }
    window.addEventListener('edu-lesson-activity-updated', refresh)
    return () => window.removeEventListener('edu-lesson-activity-updated', refresh)
  }, [])

  const visibleLessons = lessons
    .filter((lesson) => activeCategory === 'all' || lesson.categoryId === activeCategory)
    .filter((lesson) => activeLevel === 'all' || lesson.level === activeLevel)
    .filter((lesson) => activeDuration === 'all' || lesson.duration === activeDuration)
    .filter((lesson) => !normalizedSearch || `${lesson.title} ${lesson.description} ${lesson.explanation} ${lesson.category}`.toLocaleLowerCase('ko-KR').includes(normalizedSearch))
    .filter((lesson) => activeCollection === 'all' || (activeCollection === 'favorites' && favoriteLessons.includes(lesson.id)) || (activeCollection === 'recent' && recentLessons.includes(lesson.id)))
    .sort((a, b) => {
      if (activeSort === 'latest') return String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))
      if (activeSort === 'title') return a.title.localeCompare(b.title, 'ko')
      if (activeSort === 'duration') return Number.parseInt(a.duration, 10) - Number.parseInt(b.duration, 10)
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || Number(Boolean(b.popular)) - Number(Boolean(a.popular))
    })

  const totalPages = Math.max(1, Math.ceil(visibleLessons.length / LESSONS_PER_PAGE))
  const requestedPage = Number.parseInt(selectedPage, 10)
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1
  const startIndex = (currentPage - 1) * LESSONS_PER_PAGE
  const pagedLessons = visibleLessons.slice(startIndex, startIndex + LESSONS_PER_PAGE)
  const hasActiveFilters = activeCategory !== 'all' || normalizedSearch || activeLevel !== 'all' || activeDuration !== 'all' || activeSort !== 'recommended' || activeCollection !== 'all'

  function navigate(nextFilters) { window.location.hash = lessonsHref(nextFilters).slice(1) }
  function submitSearch(event) { event.preventDefault(); navigate({ ...filters, search: searchInput, page: 1 }) }

  return (
    <section className="content-page page-shell catalog-page" aria-labelledby="lessons-title">
      <div className="page-introduction catalog-hero filtered-catalog-hero lesson-catalog-hero" style={{ '--catalog-accent': activeCategoryData?.accent || '#258872' }}>
        <div className="catalog-hero-copy"><span className="section-eyebrow">{activeCategoryData?.eyebrow || 'LEARNING LIBRARY'}</span><h1 id="lessons-title">{activeCategoryData ? `${activeCategoryData.title} 교육자료` : '하나씩 따라 하는 교육자료'}</h1><p>{activeCategoryData ? `${activeCategoryData.description} 짧은 설명과 실습으로 바로 시작해 보세요.` : '검색과 필터로 필요한 자료를 고르고, 짧은 설명과 실습을 직접 확인해 보세요.'}</p><div className="catalog-hero-tags"><span>쉬운 설명</span><span>예제 코드</span><span>확인 문제</span></div></div>
        <div className="catalog-hero-symbol" aria-hidden="true"><strong>{activeCategoryData?.mark || lessons.length}</strong><span>{activeCategoryData ? 'FIELD' : 'LESSONS'}</span></div>
      </div>
      <div className="lesson-progress-banner"><div><strong>내 학습 진행 상황</strong><span>완료한 기록은 지금 사용하는 브라우저에만 저장됩니다.</span></div><span className="lesson-progress-count"><strong>{completedLessons.length}</strong> / {lessons.length}개 완료</span></div>

      <form className="program-search" onSubmit={submitSearch} role="search"><label htmlFor="lesson-search-input">교육자료 검색</label><div><input id="lesson-search-input" onChange={(event) => setSearchInput(event.target.value)} placeholder="예: HTML, React, GitHub" type="search" value={searchInput} /><button className="button button-primary" type="submit">검색</button></div></form>

      <nav className="lesson-collection-tabs" aria-label="내 교육자료 모음">
        <a className={`filter-chip${activeCollection === 'all' ? ' filter-chip-active' : ''}`} href={lessonsHref({ ...filters, collection: 'all', page: 1 })}>전체 자료</a>
        <a className={`filter-chip${activeCollection === 'favorites' ? ' filter-chip-active' : ''}`} href={lessonsHref({ ...filters, collection: 'favorites', page: 1 })}>찜한 자료 {favoriteLessons.length}</a>
        <a className={`filter-chip${activeCollection === 'recent' ? ' filter-chip-active' : ''}`} href={lessonsHref({ ...filters, collection: 'recent', page: 1 })}>최근 본 자료 {recentLessons.length}</a>
      </nav>

      <nav className="program-filters" aria-label="교육 분야별 자료 선택">
        <a aria-current={activeCategory === 'all' ? 'page' : undefined} className={`filter-chip${activeCategory === 'all' ? ' filter-chip-active' : ''}`} href={lessonsHref({ ...filters, category: 'all', page: 1 })}>전체 <span>{lessons.length}</span></a>
        {categories.map((category) => <a aria-current={activeCategory === category.id ? 'page' : undefined} className={`filter-chip${activeCategory === category.id ? ' filter-chip-active' : ''}`} href={lessonsHref({ ...filters, category: category.id, page: 1 })} key={category.id}>{category.title}</a>)}
      </nav>

      <div className="program-filter-toolbar" aria-label="교육자료 상세 필터">
        <label>난이도<select onChange={(event) => navigate({ ...filters, level: event.target.value, page: 1 })} value={activeLevel}><option value="all">전체 난이도</option>{availableLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
        <label>학습 시간<select onChange={(event) => navigate({ ...filters, duration: event.target.value, page: 1 })} value={activeDuration}><option value="all">전체 시간</option>{availableDurations.map((duration) => <option key={duration} value={duration}>{duration}</option>)}</select></label>
        <label>정렬<select onChange={(event) => navigate({ ...filters, sort: event.target.value, page: 1 })} value={activeSort}><option value="recommended">추천 순</option><option value="latest">새 자료 순</option><option value="title">이름 순</option><option value="duration">짧은 시간 순</option></select></label>
        {hasActiveFilters && <a className="program-filter-reset" href="#/lessons">조건 초기화</a>}
      </div>

      <p className="results-summary" aria-live="polite">찾은 교육자료 <strong>{visibleLessons.length}개</strong>{visibleLessons.length > 0 && <> · 현재 <strong>{startIndex + 1}–{Math.min(startIndex + LESSONS_PER_PAGE, visibleLessons.length)}번</strong></>}</p>

      {visibleLessons.length > 0 ? <>
        <div className="lesson-grid">{pagedLessons.map((lesson) => <LessonCard completed={completedLessons.includes(lesson.id)} favorite={favoriteLessons.includes(lesson.id)} key={lesson.id} lesson={lesson} onToggleFavorite={(id) => setFavoriteLessons(toggleFavoriteLesson(id))} />)}</div>
        {totalPages > 1 && <nav className="pagination" aria-label="교육자료 페이지 이동">
          {currentPage === 1 ? <span aria-disabled="true" className="pagination-move pagination-disabled">이전</span> : <a className="pagination-move" href={lessonsHref({ ...filters, page: currentPage - 1 })}>이전</a>}
          <div className="pagination-numbers">{paginationItems(totalPages, currentPage).map((item) => typeof item === 'string' ? <span aria-hidden="true" className="pagination-ellipsis" key={item}>…</span> : <a aria-current={item === currentPage ? 'page' : undefined} aria-label={`${item}페이지`} className={`pagination-number${item === currentPage ? ' pagination-current' : ''}`} href={lessonsHref({ ...filters, page: item })} key={item}>{item}</a>)}</div>
          {currentPage === totalPages ? <span aria-disabled="true" className="pagination-move pagination-disabled">다음</span> : <a className="pagination-move" href={lessonsHref({ ...filters, page: currentPage + 1 })}>다음</a>}
        </nav>}
      </> : <div className="empty-state"><strong>조건에 맞는 교육자료를 찾지 못했어요.</strong><p>검색어나 필터 조건을 줄여 다시 확인해 보세요.</p><a className="button button-secondary" href="#/lessons">전체 자료 보기</a></div>}
    </section>
  )
}

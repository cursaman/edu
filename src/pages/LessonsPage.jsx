import { useEffect, useState } from 'react'
import LessonCard from '../components/LessonCard.jsx'
import { categories } from '../data/catalog.js'
import { readCompletedLessons } from '../data/learningProgress.js'
import { readManagedContent } from '../data/contentStorage.js'
import { readFavoriteLessons, readRecentLessons, toggleFavoriteLesson } from '../data/lessonActivity.js'

export default function LessonsPage({ selectedCategory }) {
  const lessons = readManagedContent('lessons')
  const [searchText, setSearchText] = useState('')
  const [completedLessons] = useState(readCompletedLessons)
  const [favoriteLessons, setFavoriteLessons] = useState(readFavoriteLessons)
  const [recentLessons, setRecentLessons] = useState(readRecentLessons)
  const [collection, setCollection] = useState('all')
  const activeCategory = categories.some((category) => category.id === selectedCategory)
    ? selectedCategory
    : 'all'
  const normalizedSearch = searchText.trim().toLocaleLowerCase()
  const visibleLessons = lessons.filter((lesson) => {
    const categoryMatches = activeCategory === 'all' || lesson.categoryId === activeCategory
    const searchMatches = !normalizedSearch || `${lesson.title} ${lesson.description}`
      .toLocaleLowerCase()
      .includes(normalizedSearch)

    const collectionMatches = collection === 'all'
      || (collection === 'favorites' && favoriteLessons.includes(lesson.id))
      || (collection === 'recent' && recentLessons.includes(lesson.id))
    return categoryMatches && searchMatches && collectionMatches
  })

  useEffect(() => {
    const refresh = () => { setFavoriteLessons(readFavoriteLessons()); setRecentLessons(readRecentLessons()) }
    window.addEventListener('edu-lesson-activity-updated', refresh)
    return () => window.removeEventListener('edu-lesson-activity-updated', refresh)
  }, [])

  return (
    <section className="content-page page-shell" aria-labelledby="lessons-title">
      <div className="page-introduction">
        <span className="section-eyebrow">LEARNING LIBRARY</span>
        <h1 id="lessons-title">하나씩 따라 하는 교육자료</h1>
        <p>어려운 내용을 외우지 않아도 괜찮습니다. 관심 있는 주제를 고르고, 짧은 설명을 읽고, 직접 확인해 보세요.</p>
      </div>

      <div className="lesson-progress-banner">
        <div>
          <strong>내 학습 진행 상황</strong>
          <span>완료한 기록은 지금 사용하는 브라우저에만 저장됩니다.</span>
        </div>
        <span className="lesson-progress-count"><strong>{completedLessons.length}</strong> / {lessons.length}개 완료</span>
      </div>

      <label className="lesson-search" htmlFor="lesson-search-input">
        <span>교육자료 검색</span>
        <input
          id="lesson-search-input"
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="예: HTML, React, GitHub"
          type="search"
          value={searchText}
        />
      </label>

      <div className="lesson-collection-tabs" aria-label="내 교육자료 모음">
        <button className={`filter-chip${collection === 'all' ? ' filter-chip-active' : ''}`} onClick={() => setCollection('all')} type="button">전체 자료</button>
        <button className={`filter-chip${collection === 'favorites' ? ' filter-chip-active' : ''}`} onClick={() => setCollection('favorites')} type="button">찜한 자료 {favoriteLessons.length}</button>
        <button className={`filter-chip${collection === 'recent' ? ' filter-chip-active' : ''}`} onClick={() => setCollection('recent')} type="button">최근 본 자료 {recentLessons.length}</button>
      </div>

      <nav className="program-filters" aria-label="교육 분야별 자료 선택">
        <a
          aria-current={activeCategory === 'all' ? 'page' : undefined}
          className={`filter-chip${activeCategory === 'all' ? ' filter-chip-active' : ''}`}
          href="#/lessons"
        >
          전체 <span>{lessons.length}</span>
        </a>

        {categories.map((category) => (
          <a
            aria-current={activeCategory === category.id ? 'page' : undefined}
            className={`filter-chip${activeCategory === category.id ? ' filter-chip-active' : ''}`}
            href={`#/lessons?category=${category.id}`}
            key={category.id}
          >
            {category.title}
          </a>
        ))}
      </nav>

      <p className="results-summary">찾은 교육자료 <strong>{visibleLessons.length}개</strong></p>

      {visibleLessons.length > 0 ? (
        <div className="lesson-grid">
          {visibleLessons.map((lesson) => (
            <LessonCard completed={completedLessons.includes(lesson.id)} favorite={favoriteLessons.includes(lesson.id)} key={lesson.id} lesson={lesson} onToggleFavorite={(id) => setFavoriteLessons(toggleFavoriteLesson(id))} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>조건에 맞는 교육자료를 찾지 못했어요.</strong>
          <p>검색어를 바꾸거나 다른 교육 분야를 선택해 보세요.</p>
          <a className="button button-secondary" href="#/lessons">전체 자료 보기</a>
        </div>
      )}
    </section>
  )
}


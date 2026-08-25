import { useState } from 'react'
import LessonCard from '../components/LessonCard.jsx'
import { categories } from '../data/catalog.js'
import { readCompletedLessons } from '../data/learningProgress.js'
import { lessons } from '../data/lessons.js'

export default function LessonsPage({ selectedCategory }) {
  const [searchText, setSearchText] = useState('')
  const [completedLessons] = useState(readCompletedLessons)
  const activeCategory = categories.some((category) => category.id === selectedCategory)
    ? selectedCategory
    : 'all'
  const normalizedSearch = searchText.trim().toLocaleLowerCase()
  const visibleLessons = lessons.filter((lesson) => {
    const categoryMatches = activeCategory === 'all' || lesson.categoryId === activeCategory
    const searchMatches = !normalizedSearch || `${lesson.title} ${lesson.description}`
      .toLocaleLowerCase()
      .includes(normalizedSearch)

    return categoryMatches && searchMatches
  })

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
            <LessonCard completed={completedLessons.includes(lesson.id)} key={lesson.id} lesson={lesson} />
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

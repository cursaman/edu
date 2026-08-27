import { useState } from 'react'
import CategoryCard from '../components/CategoryCard.jsx'
import LessonCard from '../components/LessonCard.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import { categories, learningSteps } from '../data/catalog.js'
import { readCompletedLessons } from '../data/learningProgress.js'
import { readManagedContent } from '../data/contentStorage.js'
import { readFavoriteLessons, toggleFavoriteLesson } from '../data/lessonActivity.js'

const beginnerPath = [
  { number: '01', title: '기획과 웹 기초', description: '아이디어를 정리하고 HTML·CSS로 첫 화면을 만듭니다.', accent: 'violet' },
  { number: '02', title: 'JavaScript와 React', description: '버튼과 데이터를 연결해 실제로 동작하는 화면을 만듭니다.', accent: 'mint' },
  { number: '03', title: '데이터와 실무 기능', description: 'Node.js·Supabase로 저장과 관리 흐름을 익힙니다.', accent: 'coral' },
  { number: '04', title: '배포와 품질 점검', description: 'GitHub·Vercel로 공개하고 보안과 오류를 점검합니다.', accent: 'blue' },
]

const projectResults = [
  { mark: '01', title: '반응형 소개 홈페이지', description: 'PC와 모바일에서 보기 좋은 나만의 웹페이지' },
  { mark: '02', title: '데이터가 저장되는 서비스', description: '입력·수정·삭제가 가능한 실무형 웹서비스' },
  { mark: '03', title: '공개 URL과 포트폴리오', description: '누구에게나 보여 줄 수 있는 완성 결과물' },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  )
}

export default function HomePage() {
  const programs = readManagedContent('programs')
  const lessons = readManagedContent('lessons')
  const completedCount = readCompletedLessons().length
  const [favoriteLessons, setFavoriteLessons] = useState(readFavoriteLessons)
  const todayLesson = lessons.find((lesson) => lesson.featured) || lessons[0]
  const popularLessons = lessons.filter((lesson) => lesson.popular).slice(0, 3)
  const newLessons = [...lessons].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))).slice(0, 3)
  const categoryRecommendations = categories.map((category) => lessons.find((lesson) => lesson.categoryId === category.id && lesson.featured) || lessons.find((lesson) => lesson.categoryId === category.id)).filter(Boolean)
  const lessonCard = (lesson) => <LessonCard favorite={favoriteLessons.includes(lesson.id)} key={lesson.id} lesson={lesson} onToggleFavorite={(id) => setFavoriteLessons(toggleFavoriteLesson(id))} />

  return (
    <>
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span aria-hidden="true" /> 처음 시작해도 괜찮아요
          </p>

          <h1 id="hero-title">
            EDU 웹개발
            <br />
            <span>교육 플랫폼</span>
          </h1>

          <p className="hero-description">
            AI와 함께 배우는 실전 웹개발 교육
            <br />
            어려운 암기보다, 직접 만들고 확인하는 경험을 시작하세요.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#/programs">
              교육 프로그램 보기 <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#/lessons">
              교육자료 바로가기
            </a>
          </div>

          <div className="hero-notes" aria-label="교육 특징">
            <span>코딩 경험이 없어도</span>
            <span>한 번에 한 단계씩</span>
            <span>내 손으로 직접 완성</span>
          </div>
        </div>

        <aside className="hero-preview">
          <img
            alt="일반인 학습자들이 AI의 도움을 받아 노트북으로 웹사이트를 만드는 모습"
            className="hero-image"
            src={`${import.meta.env.BASE_URL}images/edu-hero.webp`}
          />
        </aside>
      </section>

      <section className="home-overview page-shell" aria-label="교육 플랫폼 이용 현황">
        <article><span>교육 프로그램(과정)</span><strong>{programs.length}개</strong></article>
        <article><span>별도 학습자료(콘텐츠)</span><strong>{lessons.length}개</strong></article>
        <article><span>교육자료 학습 진행</span><strong>{completedCount} / {lessons.length}개 완료</strong></article>
        <a className="button button-secondary" href="#/lessons">교육자료 보러 가기 →</a>
      </section>

      <section className="home-highlight" aria-labelledby="classroom-highlight-title">
        <div className="page-shell home-highlight-inner">
          <div>
            <p className="section-eyebrow">COMPLETE LEARNING SYSTEM</p>
            <h2 id="classroom-highlight-title">짧은 자료를 넘어,<br />실제 수업이 되는 과정</h2>
            <p>핵심 12개 과정은 과정당 30회차로 구성되어 있습니다. 강사용 대본, 수강생 활동지, 실행 결과와 오류 사례를 함께 확인할 수 있습니다.</p>
          </div>
          <div className="home-highlight-stats" aria-label="핵심 교육 구성">
            <article><strong>12</strong><span>핵심 과정</span></article>
            <article><strong>360</strong><span>전체 회차</span></article>
            <article><strong>4종</strong><span>수업 지원자료</span></article>
          </div>
          <a className="button button-primary" href="#/classroom">내 강의실 보기 →</a>
        </div>
      </section>

      <section className="learning-strip" aria-label="학습 진행 방식">
        <div className="page-shell steps-grid">
          {learningSteps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-shell home-path-section">
        <SectionHeading eyebrow="BEGINNER ROADMAP" title="처음이라면 이 순서로 시작하세요" description="무엇을 먼저 배울지 고민하지 않도록 웹서비스 완성 과정을 네 단계로 정리했습니다." />
        <div className="home-path-grid">
          {beginnerPath.map((path) => (
            <article className={`home-path-card home-path-${path.accent}`} key={path.number}>
              <span>STEP {path.number}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </article>
          ))}
        </div>
        <a className="home-lessons-link" href="#/programs">나에게 맞는 과정 찾아보기 →</a>
      </section>

      <section className="home-results-section">
        <div className="section page-shell home-results-inner">
          <SectionHeading eyebrow="WHAT YOU WILL MAKE" title="배우고 끝나지 않고, 결과물을 만듭니다" description="각 단계에서 직접 실행하고 확인하며 내 손으로 완성한 결과를 남깁니다." />
          <div className="home-result-grid">
            {projectResults.map((result) => (
              <article className="home-result-card" key={result.mark}>
                <span aria-hidden="true">{result.mark}</span>
                <div><h3>{result.title}</h3><p>{result.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {todayLesson && (
        <section className="section page-shell home-learning-section">
          <SectionHeading eyebrow="TODAY'S 10 MINUTES" title="오늘의 10분 실습" description="짧게 하나만 따라 해도 웹개발 감각이 쌓입니다." />
          <article className="today-practice-card">
            <div><span className="section-eyebrow">{todayLesson.category} · 약 10분</span><h3>{todayLesson.title}</h3><p>{todayLesson.steps[0]} 그리고 결과가 어떻게 달라지는지 직접 확인해 보세요.</p></div>
            <a className="button button-primary" href={`#/lessons/${todayLesson.id}`}>10분 실습 시작하기 →</a>
          </article>
        </section>
      )}

      <section className="section page-shell home-learning-section">
        <SectionHeading eyebrow="POPULAR LESSONS" title="많이 찾는 인기 교육자료" description="처음 배우는 분들이 가장 자주 찾는 핵심 주제입니다." />
        <div className="lesson-grid">{popularLessons.map(lessonCard)}</div>
      </section>

      <section className="section page-shell home-learning-section home-learning-soft">
        <SectionHeading eyebrow="NEW LESSONS" title="새로 추가된 교육자료" description="최근 보강한 실습을 골라 바로 시작해 보세요." />
        <div className="lesson-grid">{newLessons.map(lessonCard)}</div>
      </section>

      <section className="section page-shell home-learning-section">
        <SectionHeading eyebrow="RECOMMENDED BY FIELD" title="분야별 추천 자료" description={`${categories.length}개 분야의 핵심 자료를 골라 전체 개발 흐름을 살펴보세요.`} />
        <div className="lesson-grid">{categoryRecommendations.map(lessonCard)}</div>
        <a className="home-lessons-link" href="#/lessons">교육자료 {lessons.length}개 모두 보기 →</a>
      </section>

      <section className="section page-shell">
        <SectionHeading
          eyebrow="LEARNING PATHS"
          title="어디서부터 시작할까요?"
          description="관심 있는 분야를 골라 웹개발의 전체 흐름을 차근차근 배워보세요."
        />

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="programs-section">
        <div className="section page-shell">
          <SectionHeading
            eyebrow="UPCOMING PROGRAMS"
            title="함께 시작할 교육 프로그램"
            description="작은 질문에서 시작해 실제 웹사이트를 완성하는 입문 과정입니다."
          />

          <div className="program-grid">
            {programs.slice(0, 6).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <a className="home-lessons-link" href="#/programs">교육 프로그램 {programs.length}개 모두 보기 →</a>
        </div>
      </section>

      <section className="bottom-sections page-shell">
        <article className="notice-card">
          <span className="section-eyebrow">NOTICE</span>
          <h2>교육 일정과 준비물을 확인하세요.</h2>
          <p>모집 안내, 수업 준비물, 홈페이지 공개 소식을 공지사항에서 확인합니다.</p>
          <a className="information-link" href="#/notice">공지사항 안내 보기 →</a>
        </article>

        <article className="application-card">
          <span className="section-eyebrow">START WITH EDU</span>
          <h2>처음이라서 더 잘 배울 수 있어요.</h2>
          <p>실제 개인정보 없이 현재 브라우저에서만 수강 신청 과정을 체험해 보세요.</p>
          <a className="information-link" href="#/application">수강 신청 체험하기 →</a>
        </article>
      </section>

      <section className="home-quality page-shell" aria-labelledby="home-quality-title">
        <div>
          <p className="section-eyebrow">CLASS QUALITY</p>
          <h2 id="home-quality-title">수업 후 기록하고, 더 좋은 내용으로 고칩니다.</h2>
          <p>실제 소요 시간, 반복 질문, 오류와 만족도를 기록해 과정별 공개 가능 여부를 점검합니다.</p>
        </div>
        <a className="button button-secondary" href="#/admin">수업 품질 관리 안내 →</a>
      </section>
    </>
  )
}


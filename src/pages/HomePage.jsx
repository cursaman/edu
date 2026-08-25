import CategoryCard from '../components/CategoryCard.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import { categories, learningSteps } from '../data/catalog.js'
import { readCompletedLessons } from '../data/learningProgress.js'
import { readManagedContent } from '../data/contentStorage.js'

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
        <article><span>교육 프로그램</span><strong>{programs.length}개</strong></article>
        <article><span>제공 교육자료</span><strong>{lessons.length}개</strong></article>
        <article><span>내 학습 진행</span><strong>{completedCount} / {lessons.length}개 완료</strong></article>
        <a className="button button-secondary" href="#/lessons">교육자료 보러 가기 →</a>
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
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
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
    </>
  )
}


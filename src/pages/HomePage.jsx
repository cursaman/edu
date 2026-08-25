import CategoryCard from '../components/CategoryCard.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import { categories, learningSteps, programs } from '../data/catalog.js'

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
            <a className="button button-secondary" href="#/categories">
              어떤 것을 배우나요?
            </a>
          </div>

          <div className="hero-notes" aria-label="교육 특징">
            <span>코딩 경험이 없어도</span>
            <span>한 번에 한 단계씩</span>
            <span>내 손으로 직접 완성</span>
          </div>
        </div>

        <aside className="hero-preview" aria-label="교육 과정 미리보기">
          <div className="preview-header">
            <span className="preview-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>my-first-website.edu</span>
          </div>

          <div className="preview-canvas">
            <span className="preview-label">TODAY'S LEARNING</span>
            <strong>
              처음이어도
              <br />
              괜찮습니다.
            </strong>

            <div className="preview-progress">
              <span>오늘의 첫 번째 목표</span>
              <b>첫 화면 만들기</b>
            </div>

            <div className="preview-orbit preview-orbit-one" aria-hidden="true" />
            <div className="preview-orbit preview-orbit-two" aria-hidden="true" />
            <span className="preview-chip preview-chip-react">React</span>
            <span className="preview-chip preview-chip-codex">Codex</span>
          </div>
        </aside>
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
          <h2>첫 번째 교육 소식을 준비하고 있어요.</h2>
          <p>프로그램 일정과 준비물 안내는 다음 단계에서 차근차근 추가됩니다.</p>
          <a className="information-link" href="#/notice">공지사항 안내 보기 →</a>
        </article>

        <article className="application-card">
          <span className="section-eyebrow">START WITH EDU</span>
          <h2>처음이라서 더 잘 배울 수 있어요.</h2>
          <p>수강 신청 기능은 이후 개발 단계에서 안전하게 연결할 예정입니다.</p>
          <a className="information-link" href="#/application">수강 신청 안내 보기 →</a>
        </article>
      </section>
    </>
  )
}

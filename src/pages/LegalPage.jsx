import { legalDocuments, legalEffectiveDate, legalVersion } from '../data/legalDocuments.js'

export default function LegalPage({ type }) {
  const document = legalDocuments[type]
  if (!document) return <section className="content-page page-shell empty-state"><strong>법적 안내 문서를 찾지 못했습니다.</strong><a href="#/">홈으로 돌아가기</a></section>
  return <article className="content-page page-shell legal-page" aria-labelledby="legal-title">
    <header className="legal-hero"><span className="section-eyebrow">{document.eyebrow}</span><h1 id="legal-title">{document.title}</h1><p>{document.summary}</p><dl><div><dt>버전</dt><dd>{legalVersion}</dd></div><div><dt>시행 예정일</dt><dd>{legalEffectiveDate}</dd></div></dl></header>
    <aside className="legal-draft-warning" role="note"><strong>운영 전 검토용 초안입니다.</strong><p>사업자·담당자·외부 처리 정보와 실제 상품 정책을 확정하고 법률 전문가의 최종 검토를 받은 뒤 정식 시행해야 합니다.</p></aside>
    <nav className="legal-document-nav" aria-label="법적 안내 문서"><a aria-current={type === 'terms' ? 'page' : undefined} href="#/terms">이용약관</a><a aria-current={type === 'privacy' ? 'page' : undefined} href="#/privacy">개인정보처리방침</a><a aria-current={type === 'refund' ? 'page' : undefined} href="#/refund">취소·환불 정책</a></nav>
    <div className="legal-sections">{document.sections.map(([title, paragraphs]) => <section key={title}><h2>{title}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
  </article>
}

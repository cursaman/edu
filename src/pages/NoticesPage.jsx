import { readManagedContent } from '../data/contentStorage.js'

export default function NoticesPage() {
  const notices = readManagedContent('notices')
  return (
    <section className="content-page page-shell" aria-labelledby="notices-title">
      <div className="page-introduction">
        <span className="section-eyebrow">NOTICE</span>
        <h1 id="notices-title">EDU 교육 소식</h1>
        <p>교육 일정과 준비물, 홈페이지 운영 소식을 확인하세요.</p>
      </div>

      <div className="notice-list">
        {notices.map((notice, index) => (
          <article className="notice-list-item" key={notice.id}>
            <span className="notice-list-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <span className="notice-date">{notice.date}</span>
              <h2><a href={`#/notice/${notice.id}`}>{notice.title}</a></h2>
              <p>{notice.summary}</p>
            </div>
            <a className="notice-open-link" href={`#/notice/${notice.id}`} aria-label={`${notice.title} 자세히 보기`}>→</a>
          </article>
        ))}
      </div>
    </section>
  )
}

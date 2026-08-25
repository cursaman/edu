import { findNotice } from '../data/notices.js'

export default function NoticeDetailPage({ noticeId }) {
  const notice = findNotice(noticeId)

  if (!notice) {
    return <section className="content-page page-shell empty-state"><strong>공지사항을 찾지 못했습니다.</strong><a className="button button-primary" href="#/notice">공지사항 목록으로</a></section>
  }

  return (
    <article className="content-page page-shell notice-detail" aria-labelledby="notice-detail-title">
      <a className="back-link" href="#/notice">← 공지사항 목록</a>
      <header>
        <span className="section-eyebrow">NOTICE · {notice.date}</span>
        <h1 id="notice-detail-title">{notice.title}</h1>
        <p>{notice.summary}</p>
      </header>
      <div className="notice-detail-body">
        {notice.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>확인 사항</h2>
        <ul>{notice.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </article>
  )
}

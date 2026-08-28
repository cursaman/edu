import { useState } from 'react'
import { completedCourseSessions } from '../data/courseProgress.js'
import { getTrialResume, readCertificate, saveCertificate } from '../data/freeTrialProgress.js'

function safe(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])) }

export default function TrialCertificatePage() {
  const progress = getTrialResume(completedCourseSessions('web-foundation'))
  const stored = readCertificate()
  const [name, setName] = useState(stored.name || '')
  const [issuedAt, setIssuedAt] = useState(stored.issuedAt || '')
  if (!progress.complete) return <section className="content-page page-shell empty-state"><span className="section-eyebrow">FREE TRIAL</span><h1>무료 체험을 먼저 완료해 주세요</h1><p>웹 기초 1~3회차의 단계별 확인과 학습 완료가 필요합니다.</p><a className="button button-primary" href={`#/classroom/web-foundation/${progress.nextSessionId}`}>이어서 체험하기 →</a></section>

  function issue() {
    if (!name.trim()) return
    const next = saveCertificate({ name: name.trim().slice(0, 40), issuedAt: issuedAt || new Date().toISOString() })
    setName(next.name); setIssuedAt(next.issuedAt)
  }
  function downloadHtml() {
    if (!issuedAt) return
    const date = new Date(issuedAt).toLocaleDateString('ko-KR')
    const html = `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>웹 기초 무료 체험 완료증</title><style>body{display:grid;min-height:100vh;margin:0;place-items:center;background:#f4f5ff;font-family:Arial,sans-serif;color:#172033}.card{width:min(760px,calc(100% - 48px));padding:70px 50px;border:8px double #5b61f6;background:white;text-align:center}h1{font-size:48px}strong{display:block;margin:30px;font-size:34px;color:#5b61f6}p{line-height:1.8}</style></head><body><main class="card"><small>CURSAMANWORKS EDU</small><h1>무료 체험 완료증</h1><strong>${safe(name)}</strong><p>웹 기초 과정 1~3회차의 실습과<br>첫 홈페이지 결과물 제작을 완료했습니다.</p><p>${date}</p></main></body></html>`
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }))
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'web-foundation-trial-certificate.html'; anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const dateLabel = issuedAt ? new Date(issuedAt).toLocaleDateString('ko-KR') : new Date().toLocaleDateString('ko-KR')
  return <section className="content-page page-shell certificate-page"><div className="certificate-controls"><span className="section-eyebrow">FREE TRIAL COMPLETE</span><h1>무료 체험 완료증</h1><p>이름은 서버로 전송하지 않고 현재 브라우저에만 저장됩니다.</p><label>완료증에 표시할 이름<input maxLength="40" onChange={(event) => setName(event.target.value)} value={name} /></label>{!issuedAt && <button className="button button-primary" disabled={!name.trim()} onClick={issue} type="button">완료증 만들기</button>}{issuedAt && <div><button className="button button-primary" onClick={() => window.print()} type="button">인쇄·PDF 저장</button><button className="button button-secondary" onClick={downloadHtml} type="button">완료증 HTML 다운로드</button></div>}</div><article className="certificate-card"><span>CURSAMANWORKS EDU</span><p>Certificate of Completion</p><h2>웹 기초 무료 체험 완료증</h2><strong>{name.trim() || '이름을 입력해 주세요'}</strong><p>웹 기초 과정 1~3회차의 단계별 실습을 수행하고<br />자신의 첫 홈페이지 결과물을 완성하였음을 확인합니다.</p><time>{dateLabel}</time><small>EDU 웹개발 교육 플랫폼</small></article></section>
}

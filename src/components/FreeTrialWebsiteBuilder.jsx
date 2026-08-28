import { useEffect, useMemo, useState } from 'react'

const storageKey = 'edu-web-foundation-free-result-v1'
const initialForm = { title: '나의 첫 웹페이지', audience: '웹개발을 처음 배우는 분', outcome: '쉬운 설명과 실습으로 첫 홈페이지를 완성합니다.', color: '#5b61f6' }

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
}

export function createResultHtml(form) {
  const title = escapeHtml(form.title.trim() || initialForm.title)
  const audience = escapeHtml(form.audience.trim() || initialForm.audience)
  const outcome = escapeHtml(form.outcome.trim() || initialForm.outcome)
  const color = /^#[0-9a-f]{6}$/i.test(form.color) ? form.color : initialForm.color
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; background: #f5f6ff; color: #172033; }
    main { width: min(680px, calc(100% - 40px)); margin: 72px auto; padding: 44px; border-radius: 24px; background: white; box-shadow: 0 20px 60px #27305f1f; }
    small { color: ${color}; font-weight: 700; }
    h1 { margin: 12px 0; font-size: clamp(32px, 8vw, 56px); line-height: 1.08; }
    p { font-size: 18px; line-height: 1.75; }
    a { display: inline-block; margin-top: 12px; padding: 14px 20px; border-radius: 12px; background: ${color}; color: white; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <small>${audience}</small>
    <h1>${title}</h1>
    <p>${outcome}</p>
    <a href="mailto:practice@example.com">교육 문의하기</a>
  </main>
</body>
</html>`
}

export default function FreeTrialWebsiteBuilder({ onDownloaded }) {
  const [form, setForm] = useState(() => {
    try { return { ...initialForm, ...JSON.parse(localStorage.getItem(storageKey) || '{}') } } catch { return initialForm }
  })
  const html = useMemo(() => createResultHtml(form), [form])

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(form)) }, [form])
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const valid = form.title.trim() && form.audience.trim() && form.outcome.trim()

  function download() {
    if (!valid) return
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = 'my-first-website.html'; anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    onDownloaded?.()
  }

  return <section className="free-result-builder" aria-labelledby="free-result-title"><div className="free-result-heading"><span className="section-eyebrow">YOUR FIRST RESULT</span><h3 id="free-result-title">내 첫 홈페이지 완성하기</h3><p>아래 문구를 내 주제로 바꾸면 오른쪽 화면이 즉시 바뀝니다. 서버로 전송하지 않고 현재 브라우저에만 임시 저장합니다.</p></div><div className="free-result-layout"><div className="free-result-form"><label>홈페이지 제목<input maxLength="50" onChange={(event) => update('title', event.target.value)} value={form.title} /></label><label>누구를 위한 페이지인가요?<input maxLength="70" onChange={(event) => update('audience', event.target.value)} value={form.audience} /></label><label>무엇을 제공하나요?<textarea maxLength="160" onChange={(event) => update('outcome', event.target.value)} rows="4" value={form.outcome} /></label><label className="free-color-field">대표 색상<input aria-label="대표 색상" onChange={(event) => update('color', event.target.value)} type="color" value={form.color} /></label><button className="button button-primary" disabled={!valid} onClick={download} type="button">내 홈페이지 파일 다운로드 ↓</button><small>다운로드한 파일을 더블클릭하면 Chrome에서 바로 열립니다.</small></div><div className="free-result-preview"><strong>실시간 미리보기</strong><iframe srcDoc={html} title="내 첫 홈페이지 미리보기" /></div></div></section>
}

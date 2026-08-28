import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { legalVersion } from '../data/legalDocuments.js'

export default function AccountPage({ session, onConsentUpdated }) {
  const [consents, setConsents] = useState([])
  const [agreed, setAgreed] = useState({ terms: false, privacy: false, age: false })
  const [confirmEmail, setConfirmEmail] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!session?.user || !supabase) return
    supabase.from('user_consents').select('document_type,document_version,agreed_at').order('agreed_at', { ascending: false })
      .then(({ data, error }) => error ? setMessage('동의 기록을 불러오지 못했습니다.') : setConsents(data || []))
  }, [session?.user?.id])

  if (!session?.user) return <section className="content-page page-shell empty-state"><h1>계정 관리</h1><p>로그인 후 이용할 수 있습니다.</p><a className="button button-primary" href="#/login?next=/account">로그인</a></section>
  const current = ['terms', 'privacy', 'age_confirmation'].every((type) => consents.some((item) => item.document_type === type && item.document_version === legalVersion))

  async function saveConsent() {
    if (!agreed.terms || !agreed.privacy || !agreed.age) return setMessage('세 항목을 모두 확인해 주세요.')
    setBusy(true); setMessage('')
    const { error } = await supabase.rpc('record_current_edu_consents', { p_document_version: legalVersion })
    if (error) setMessage('동의를 저장하지 못했습니다. 최신 schema.sql을 실행했는지 확인해 주세요.')
    else {
      const now = new Date().toISOString()
      setConsents(['terms', 'privacy', 'age_confirmation'].map((document_type) => ({ document_type, document_version: legalVersion, agreed_at: now })))
      setMessage('최신 약관 동의가 저장되었습니다.')
      onConsentUpdated?.(true)
    }
    setBusy(false)
  }

  async function deleteAccount() {
    if (confirmEmail !== session.user.email) return setMessage('확인을 위해 로그인 이메일을 정확히 입력해 주세요.')
    if (!window.confirm('계정과 학습 정보를 삭제하면 복구할 수 없습니다. 정말 탈퇴하시겠습니까?')) return
    setBusy(true); setMessage('')
    const { data } = await supabase.auth.getSession()
    const response = await fetch('/api/account/delete', { method: 'POST', headers: { Authorization: `Bearer ${data.session?.access_token || ''}` } })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) setMessage(result.message || '탈퇴 처리에 실패했습니다.')
    else { await supabase.auth.signOut(); window.location.hash = '/' }
    setBusy(false)
  }

  return <section className="content-page page-shell account-page"><div className="page-introduction"><span className="section-eyebrow">ACCOUNT & PRIVACY</span><h1>계정·개인정보 관리</h1><p>{session.user.email} 계정의 동의 내역을 확인하고 탈퇴할 수 있습니다.</p></div>
    <article className="account-panel"><h2>최신 약관 동의</h2><p>현재 문서 버전: <strong>{legalVersion}</strong> · 상태: <strong>{current ? '동의 완료' : '재동의 필요'}</strong></p>{!current && <div className="auth-consents"><label><input checked={agreed.terms} onChange={(e) => setAgreed({ ...agreed, terms: e.target.checked })} type="checkbox" /><span><a href="#/terms" target="_blank">이용약관</a> 동의 (필수)</span></label><label><input checked={agreed.privacy} onChange={(e) => setAgreed({ ...agreed, privacy: e.target.checked })} type="checkbox" /><span><a href="#/privacy" target="_blank">개인정보 처리 안내</a> 확인 (필수)</span></label><label><input checked={agreed.age} onChange={(e) => setAgreed({ ...agreed, age: e.target.checked })} type="checkbox" /><span>만 14세 이상 확인 (필수)</span></label><button className="button button-primary" disabled={busy} onClick={saveConsent} type="button">동의 저장</button></div>}<ul className="consent-history">{consents.map((item) => <li key={`${item.document_type}-${item.document_version}`}><strong>{item.document_type}</strong> · {item.document_version} · {new Date(item.agreed_at).toLocaleString('ko-KR')}</li>)}</ul></article>
    <article className="account-panel account-danger"><h2>회원 탈퇴</h2><p>인증 계정, 프로필, 수강·진도·동의 기록을 삭제합니다. 법령상 보존 의무가 있는 주문·결제 기록은 제한된 목적으로 분리 보관될 수 있습니다.</p><label>확인을 위해 로그인 이메일 입력<input onChange={(e) => setConfirmEmail(e.target.value)} value={confirmEmail} /></label><button className="button button-secondary" disabled={busy} onClick={deleteAccount} type="button">계정과 학습 정보 삭제</button></article>{message && <p className="auth-message" role="status">{message}</p>}</section>
}

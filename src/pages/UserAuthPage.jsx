import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'
import { legalVersion } from '../data/legalDocuments.js'

function readableAuthError(error) {
  const message = String(error?.message || '')
  const code = String(error?.code || '')
  if (/invalid login credentials/i.test(message)) return '이메일 또는 비밀번호를 확인해 주세요.'
  if (/email not confirmed/i.test(message)) return '가입 확인 이메일에서 인증을 완료해 주세요.'
  if (/already registered/i.test(message)) return '이미 가입된 이메일입니다. 로그인해 주세요.'
  if (/invalid.*email|email.*invalid|validate email/i.test(message) || code === 'email_address_invalid') return '사용할 수 있는 이메일 주소 형식인지 확인해 주세요.'
  if (/database error saving new user/i.test(message) || code === 'unexpected_failure') return '회원 프로필을 만드는 데이터베이스 단계에서 오류가 발생했습니다. Supabase에서 최신 schema.sql을 다시 실행한 뒤 Auth 로그를 확인해 주세요.'
  if (/signup.*disabled/i.test(message) || code === 'signup_disabled') return '현재 이메일 회원가입이 꺼져 있습니다. Supabase Email Provider 설정을 확인해 주세요.'
  if (/password/i.test(message)) return '비밀번호는 8자 이상으로 입력해 주세요.'
  if (/rate limit/i.test(message)) return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
  return `인증 처리 중 문제가 발생했습니다. Supabase Auth 로그를 확인해 주세요.${code ? ` (오류 코드: ${code})` : ''}`
}

export default function UserAuthPage({ mode = 'login', nextPath = '/classroom', session }) {
  const [activeMode, setActiveMode] = useState(mode)
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', termsAgreed: false, privacyAgreed: false, ageConfirmed: false })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session?.user) return <section className="content-page page-shell auth-page"><div className="auth-card auth-signed-in"><span className="section-eyebrow">SIGNED IN</span><h1>이미 로그인되어 있습니다</h1><p>{session.user.email} 계정으로 학습 진도를 공동 저장하고 있습니다.</p><a className="button button-primary" href={`#${nextPath}`}>내 강의실로 이동 →</a></div></section>

  async function submit(event) {
    event.preventDefault()
    setError(''); setMessage('')
    if (!isSupabaseConfigured || !supabase) return setError('Supabase 연결 정보가 없어 로그인할 수 없습니다. 관리자에게 문의해 주세요.')
    if (!form.email.trim() || !form.password) return setError('이메일과 비밀번호를 모두 입력해 주세요.')
    if (form.password.length < 8) return setError('비밀번호는 8자 이상으로 입력해 주세요.')
    if (activeMode === 'signup' && form.password !== form.passwordConfirm) return setError('두 비밀번호가 서로 다릅니다.')
    if (activeMode === 'signup' && (!form.termsAgreed || !form.privacyAgreed)) return setError('이용약관과 개인정보 처리 안내에 모두 동의해 주세요.')
    if (activeMode === 'signup' && !form.ageConfirmed) return setError('만 14세 이상임을 확인해 주세요.')
    setSubmitting(true)
    try {
      if (activeMode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({ email: form.email.trim(), password: form.password, options: { data: { edu_terms_agreed: true, edu_terms_version: legalVersion, edu_privacy_agreed: true, edu_privacy_version: legalVersion, edu_age_confirmed: true } } })
        if (authError) throw authError
        if (data.session) window.location.hash = nextPath
        else setMessage('가입 확인 이메일을 보냈습니다. 이메일의 인증 링크를 누른 뒤 로그인해 주세요.')
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password })
        if (authError) throw authError
        window.location.hash = nextPath
      }
    } catch (authError) {
      console.error('Supabase 회원 인증 실패', { code: authError?.code, status: authError?.status, message: authError?.message })
      setError(readableAuthError(authError))
    } finally {
      setSubmitting(false)
    }
  }

  return <section className="content-page page-shell auth-page"><div className="auth-introduction"><span className="section-eyebrow">LEARNING ACCOUNT</span><h1>다른 기기에서도<br />학습을 이어가세요</h1><p>이메일 계정으로 완료 회차와 마지막 학습 위치만 저장합니다. 이름·전화번호·주소는 수집하지 않습니다.</p><ul><li>첫 3회차는 로그인 없이 무료 체험</li><li>로그인하면 기존 브라우저 진도를 자동 이전</li><li>사용자 본인만 자신의 진도를 조회·수정</li></ul></div><div className="auth-card"><div className="auth-tabs" role="tablist"><button aria-selected={activeMode === 'login'} className={activeMode === 'login' ? 'auth-tab-active' : ''} onClick={() => { setActiveMode('login'); setError(''); setMessage('') }} role="tab" type="button">로그인</button><button aria-selected={activeMode === 'signup'} className={activeMode === 'signup' ? 'auth-tab-active' : ''} onClick={() => { setActiveMode('signup'); setError(''); setMessage('') }} role="tab" type="button">회원가입</button></div><form onSubmit={submit}><label>이메일<input autoComplete="email" onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="example@email.com" type="email" value={form.email} /></label><label>비밀번호<input autoComplete={activeMode === 'signup' ? 'new-password' : 'current-password'} minLength="8" onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="8자 이상" type="password" value={form.password} /></label>{activeMode === 'signup' && <><label>비밀번호 확인<input autoComplete="new-password" minLength="8" onChange={(event) => setForm({ ...form, passwordConfirm: event.target.value })} type="password" value={form.passwordConfirm} /></label><fieldset className="auth-consents"><legend>필수 동의</legend><label><input checked={form.termsAgreed} onChange={(event) => setForm({ ...form, termsAgreed: event.target.checked })} type="checkbox" /><span><a href="#/terms" target="_blank">이용약관</a>에 동의합니다. (필수)</span></label><label><input checked={form.privacyAgreed} onChange={(event) => setForm({ ...form, privacyAgreed: event.target.checked })} type="checkbox" /><span><a href="#/privacy" target="_blank">개인정보 처리 안내</a>를 확인하고 동의합니다. (필수)</span></label><label><input checked={form.ageConfirmed} onChange={(event) => setForm({ ...form, ageConfirmed: event.target.checked })} type="checkbox" /><span>만 14세 이상입니다. (필수)</span></label><small>약관 버전 {legalVersion}에 대한 동의 시각과 사용자 ID가 가입 시 기록됩니다.</small></fieldset></>}{error && <p className="auth-message auth-error" role="alert">{error}</p>}{message && <p className="auth-message auth-success" role="status">{message}</p>}<button className="button button-primary" disabled={submitting} type="submit">{submitting ? '처리 중...' : activeMode === 'signup' ? '동의하고 회원가입하기' : '로그인하고 이어서 학습하기'}</button></form><p className="auth-security-note">비밀번호는 Supabase Auth가 처리하며 EDU 소스코드나 localStorage에 저장하지 않습니다.</p></div></section>
}

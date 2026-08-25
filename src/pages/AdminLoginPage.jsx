import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function AdminLoginPage({ denied = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      setError('이메일 또는 비밀번호를 확인해 주세요. 관리자 계정이 먼저 등록되어 있어야 합니다.')
    } else {
      window.location.hash = '/admin'
    }

    setSubmitting(false)
  }

  return (
    <section className="content-page page-shell" aria-labelledby="admin-login-title">
      <div className="page-introduction">
        <span className="section-eyebrow">ADMIN LOGIN</span>
        <h1 id="admin-login-title">관리자 로그인</h1>
        <p>Supabase에 등록된 관리자 계정으로 로그인해 교육자료와 공지사항을 관리합니다.</p>
      </div>

      {denied && (
        <p className="privacy-warning" role="alert">
          로그인은 되었지만 관리자 권한이 없습니다. 운영 담당자에게 관리자 등록을 요청해 주세요.
        </p>
      )}

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          관리자 이메일
          <input autoComplete="username" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        </label>
        <label>
          비밀번호
          <input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary" disabled={submitting} type="submit">
          {submitting ? '확인하는 중...' : '관리자 로그인'}
        </button>
        {denied && (
          <button className="button button-secondary" onClick={() => supabase.auth.signOut()} type="button">
            다른 계정으로 로그인
          </button>
        )}
      </form>
    </section>
  )
}

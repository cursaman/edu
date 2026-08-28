import { supabase } from '../lib/supabase.js'

async function authHeaders() {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('로그인이 필요합니다.')
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export async function callPaymentApi(path, body) {
  const response = await fetch(path, { method: 'POST', headers: await authHeaders(), body: JSON.stringify(body) })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message || '결제 서버 요청을 처리하지 못했습니다.')
  return result
}

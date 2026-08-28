import { createClient } from '@supabase/supabase-js'

export function sendError(response, status, code, message) { return response.status(status).json({ code, message }) }
export function requirePost(request, response) { if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); sendError(response, 405, 'METHOD_NOT_ALLOWED', 'POST 요청만 사용할 수 있습니다.'); return false } return true }
export function getServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SERVER_NOT_CONFIGURED')
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
export async function requireUser(request, client) {
  const value = String(request.headers.authorization || '')
  const token = value.startsWith('Bearer ') ? value.slice(7) : ''
  if (!token || token.length > 4096) throw new Error('UNAUTHORIZED')
  const { data, error } = await client.auth.getUser(token)
  if (error || !data.user) throw new Error('UNAUTHORIZED')
  return data.user
}
export function validProgramId(value) { return typeof value === 'string' && /^[a-z0-9][a-z0-9-]{1,79}$/.test(value) }
export function validOrderCode(value) { return typeof value === 'string' && /^[A-Za-z0-9_-]{6,64}$/.test(value) }
export function validPaymentKey(value) { return typeof value === 'string' && value.length >= 6 && value.length <= 200 }
export function serverPrice(program) { const regular = Math.max(0, Number(program.regular_price) || 0); const sale = Math.max(0, Number(program.sale_price) || 0); return sale > 0 && sale < regular ? sale : regular }
export function tossAuthorization() {
  const key = process.env.TOSS_SECRET_KEY
  if (!key) throw new Error('SERVER_NOT_CONFIGURED')
  return `Basic ${Buffer.from(`${key}:`).toString('base64')}`
}
export async function tossRequest(path, options = {}) {
  const response = await fetch(`https://api.tosspayments.com${path}`, { ...options, headers: { Authorization: tossAuthorization(), 'Content-Type': 'application/json', ...(options.headers || {}) } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) { const error = new Error('TOSS_REQUEST_FAILED'); error.providerCode = data.code; error.status = response.status; throw error }
  return data
}
export function safeApiError(error, response) {
  if (error.message === 'UNAUTHORIZED') return sendError(response, 401, 'UNAUTHORIZED', '로그인 정보를 확인해 주세요.')
  if (error.message === 'SERVER_NOT_CONFIGURED') return sendError(response, 503, 'SERVER_NOT_CONFIGURED', '결제 서버 설정이 준비되지 않았습니다.')
  if (error.message === 'RATE_LIMIT_NOT_CONFIGURED' || error.message === 'RATE_LIMIT_UNAVAILABLE') return sendError(response, 503, 'RATE_LIMIT_UNAVAILABLE', '요청 보호 기능을 확인할 수 없어 안전을 위해 처리를 중단했습니다.')
  if (error.message === 'TOSS_REQUEST_FAILED') return sendError(response, error.status >= 500 ? 502 : 400, error.providerCode || 'PAYMENT_FAILED', '토스페이먼츠가 결제를 승인하지 않았습니다.')
  return sendError(response, 500, 'PAYMENT_SERVER_ERROR', '결제 처리 중 문제가 발생했습니다.')
}

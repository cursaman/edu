import { getServerClient, requirePost, requireUser, safeApiError, sendError } from '../_lib/paymentServer.js'
import { allowRequest } from '../_lib/rateLimit.js'

export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  if (!allowRequest(request, 3, 60 * 60 * 1000)) return sendError(response, 429, 'RATE_LIMITED', '탈퇴 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.')
  try {
    const client = getServerClient()
    const user = await requireUser(request, client)
    const { error } = await client.auth.admin.deleteUser(user.id)
    if (error) throw new Error('ACCOUNT_DELETE_FAILED')
    return response.status(200).json({ ok: true })
  } catch (error) {
    if (error.message === 'ACCOUNT_DELETE_FAILED') return sendError(response, 500, 'ACCOUNT_DELETE_FAILED', '계정을 삭제하지 못했습니다. 관리자에게 문의해 주세요.')
    return safeApiError(error, response)
  }
}

import crypto from 'node:crypto'
import { allowRequest } from '../_lib/rateLimit.js'
import { getServerClient, requirePost, safeApiError, sendError, tossRequest, validOrderCode } from '../_lib/paymentServer.js'
function sameSecret(received, expected) { const a = Buffer.from(String(received || '')); const b = Buffer.from(String(expected || '')); return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b) }
export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  if (!allowRequest(request, 30)) return sendError(response, 429, 'RATE_LIMITED', '웹훅 요청이 너무 많습니다.')
  try {
    const webhookSecret = process.env.TOSS_WEBHOOK_SECRET
    if (!webhookSecret) throw new Error('SERVER_NOT_CONFIGURED')
    if (!sameSecret(request.query?.token || request.headers['x-edu-webhook-secret'], webhookSecret)) return sendError(response, 401, 'INVALID_WEBHOOK', '웹훅을 확인할 수 없습니다.')
    const orderId = request.body?.orderId || request.body?.data?.orderId
    if (!validOrderCode(orderId)) return sendError(response, 400, 'INVALID_WEBHOOK', '웹훅 주문번호가 올바르지 않습니다.')
    const payment = await tossRequest(`/v1/payments/orders/${encodeURIComponent(orderId)}`); const client = getServerClient()
    const { data: order } = await client.from('orders').select('amount').eq('order_code', orderId).single()
    if (!order || Number(payment.totalAmount) !== order.amount) return sendError(response, 400, 'AMOUNT_MISMATCH', '웹훅 결제 금액이 주문과 일치하지 않습니다.')
    const eventId = String(request.headers['tosspayments-webhook-transmission-id'] || `${request.body?.eventType || 'PAYMENT'}:${payment.paymentKey}:${payment.status}`).slice(0, 200)
    const { error } = await client.rpc('sync_edu_payment_webhook', { p_order_code: orderId, p_payment_key: payment.paymentKey, p_method: payment.method || '', p_amount: payment.totalAmount, p_status: payment.status, p_approved_at: payment.approvedAt || null, p_event_id: eventId })
    if (error) throw error
    return response.status(200).json({ received: true })
  } catch (error) { return safeApiError(error, response) }
}

import { allowRequest } from '../_lib/rateLimit.js'
import { getServerClient, requirePost, requireUser, safeApiError, sendError, tossRequest, validOrderCode, validPaymentKey } from '../_lib/paymentServer.js'
export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  if (!allowRequest(request, 8)) return sendError(response, 429, 'RATE_LIMITED', '승인 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.')
  try {
    const client = getServerClient(); const user = await requireUser(request, client)
    const { paymentKey, orderId } = request.body || {}; const amount = Number(request.body?.amount)
    if (!validPaymentKey(paymentKey) || !validOrderCode(orderId) || !Number.isSafeInteger(amount) || amount <= 0) return sendError(response, 400, 'INVALID_PAYMENT_INPUT', '결제 승인 정보가 올바르지 않습니다.')
    const { data: order, error } = await client.from('orders').select('*').eq('order_code', orderId).eq('user_id', user.id).single()
    if (error || !order) return sendError(response, 404, 'ORDER_NOT_FOUND', '본인의 주문을 찾지 못했습니다.')
    if (order.amount !== amount) return sendError(response, 400, 'AMOUNT_MISMATCH', '서버에 저장된 주문 금액과 일치하지 않습니다.')
    if (order.status === 'paid') return response.status(200).json({ message: '이미 승인된 테스트 결제입니다.', programId: order.program_id, orderId })
    if (!['pending', 'ready'].includes(order.status)) return sendError(response, 409, 'INVALID_ORDER_STATUS', '현재 상태에서는 결제를 승인할 수 없습니다.')
    const payment = await tossRequest('/v1/payments/confirm', { method: 'POST', headers: { 'Idempotency-Key': order.id }, body: JSON.stringify({ paymentKey, orderId, amount }) })
    if (payment.orderId !== orderId || Number(payment.totalAmount) !== order.amount || payment.status !== 'DONE') return sendError(response, 502, 'PROVIDER_MISMATCH', '결제 제공사의 승인 결과가 주문 정보와 일치하지 않습니다.')
    const { error: finalizeError } = await client.rpc('finalize_edu_payment', { p_order_code: orderId, p_payment_key: payment.paymentKey, p_method: payment.method || '', p_amount: payment.totalAmount, p_approved_at: payment.approvedAt || new Date().toISOString(), p_event_id: `confirm:${payment.paymentKey}` })
    if (finalizeError) throw finalizeError
    return response.status(200).json({ message: '테스트 결제와 수강권을 안전하게 승인했습니다.', programId: order.program_id, orderId })
  } catch (error) { return safeApiError(error, response) }
}

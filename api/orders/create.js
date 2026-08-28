import crypto from 'node:crypto'
import { allowRequest } from '../_lib/rateLimit.js'
import { getServerClient, requirePost, requireUser, safeApiError, sendError, serverPrice, validProgramId } from '../_lib/paymentServer.js'
export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  if (!allowRequest(request, 10)) return sendError(response, 429, 'RATE_LIMITED', '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.')
  try {
    const client = getServerClient(); const user = await requireUser(request, client); const programId = request.body?.programId
    if (!validProgramId(programId)) return sendError(response, 400, 'INVALID_PROGRAM', '교육 프로그램 정보가 올바르지 않습니다.')
    const { data: program, error: programError } = await client.from('edu_programs').select('id,title,regular_price,sale_price,is_free,sale_status').eq('id', programId).single()
    if (programError || !program) return sendError(response, 404, 'PROGRAM_NOT_FOUND', '교육 프로그램을 찾지 못했습니다.')
    const amount = serverPrice(program)
    if (program.is_free || amount <= 0) return sendError(response, 400, 'FREE_PROGRAM', '무료 과정은 결제할 수 없습니다.')
    if (program.sale_status !== 'on_sale') return sendError(response, 409, 'NOT_ON_SALE', '현재 판매 중인 과정이 아닙니다.')
    const { data: entitlement } = await client.from('course_enrollments').select('status').eq('user_id', user.id).eq('program_id', programId).in('status', ['approved', 'active', 'completed']).maybeSingle()
    if (entitlement) return sendError(response, 409, 'ALREADY_ENTITLED', '이미 수강할 수 있는 과정입니다.')
    const { data: duplicate } = await client.from('orders').select('order_code').eq('user_id', user.id).eq('program_id', programId).in('status', ['pending', 'ready', 'paid']).limit(1).maybeSingle()
    if (duplicate) return sendError(response, 409, 'DUPLICATE_ORDER', '이미 처리 중이거나 결제된 주문이 있습니다.')
    const orderCode = `EDU-${Date.now()}-${crypto.randomUUID().replaceAll('-', '').slice(0, 12)}`
    const { data: order, error } = await client.from('orders').insert({ order_code: orderCode, user_id: user.id, program_id: program.id, order_name: program.title.slice(0, 100), amount, status: 'pending' }).select('order_code,order_name,amount,program_id').single()
    if (error) throw error
    return response.status(201).json({ orderId: order.order_code, orderName: order.order_name, amount: order.amount, programId: order.program_id, customerKey: user.id })
  } catch (error) { if (error.code === '23505') return sendError(response, 409, 'DUPLICATE_ORDER', '이미 처리 중이거나 결제된 주문이 있습니다.'); return safeApiError(error, response) }
}

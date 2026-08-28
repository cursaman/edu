import { useState } from 'react'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { findManagedProgram } from '../data/contentStorage.js'
import { canPurchase, effectivePrice, formatPrice } from '../data/pricing.js'
import { callPaymentApi } from '../data/paymentClient.js'

export default function CheckoutPage({ programId, session }) {
  const program = findManagedProgram(programId)
  const [agreed, setAgreed] = useState(false)
  const [message, setMessage] = useState('')
  const [processing, setProcessing] = useState(false)

  if (!program) return <section className="content-page page-shell empty-state"><strong>결제할 교육 프로그램을 찾지 못했습니다.</strong><a className="button button-primary" href="#/programs">프로그램 목록으로</a></section>
  if (!session?.user) return <section className="content-page page-shell checkout-page"><div className="page-introduction"><span className="section-eyebrow">LOGIN REQUIRED</span><h1>로그인 후 결제할 수 있습니다</h1><p>결제와 수강권을 본인 계정에 안전하게 연결하기 위해 로그인이 필요합니다.</p><a className="button button-primary" href={`#/login?next=/checkout/${programId}`}>로그인하기 →</a></div></section>

  const price = effectivePrice(program)
  const available = canPurchase(program)
  async function preparePayment() {
    if (!agreed) return setMessage('환불 규정을 확인하고 동의해 주세요.')
    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY?.trim()
    if (!clientKey) return setMessage('토스 테스트 클라이언트 키가 설정되지 않았습니다.')
    setProcessing(true); setMessage('서버에서 주문 금액과 수강권을 확인하고 있습니다.')
    try {
      const order = await callPaymentApi('/api/orders/create', { programId })
      const tossPayments = await loadTossPayments(clientKey)
      const payment = tossPayments.payment({ customerKey: order.customerKey })
      const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin)
      const successUrl = new URL(baseUrl); successUrl.searchParams.set('paymentResult', 'success')
      const failUrl = new URL(baseUrl); failUrl.searchParams.set('paymentResult', 'fail')
      await payment.requestPayment({ method: 'CARD', amount: { currency: 'KRW', value: order.amount }, orderId: order.orderId, orderName: order.orderName, successUrl: successUrl.href, failUrl: failUrl.href, customerEmail: session.user.email })
    } catch (error) { setMessage(error.message || '테스트 결제창을 열지 못했습니다.'); setProcessing(false) }
  }

  return <section className="content-page page-shell checkout-page"><div className="page-introduction"><span className="section-eyebrow">TOSS TEST PAYMENT</span><h1>주문 내용을 확인해 주세요</h1><p>테스트 키로 결제 흐름을 확인합니다. 실제 카드 청구는 발생하지 않습니다.</p></div><div className="checkout-layout"><article className="checkout-order-card"><h2>{program.title}</h2><dl><div><dt>로그인 이메일</dt><dd>{session.user.email}</dd></div><div><dt>정상 가격</dt><dd>{formatPrice(program.regularPrice)}</dd></div><div><dt>화면 표시 금액</dt><dd><strong>{formatPrice(price)}</strong></dd></div><div><dt>판매 상태</dt><dd>{available ? '테스트 결제 가능' : program.isFree ? '무료 과정' : '현재 판매하지 않음'}</dd></div></dl><label className="checkout-agreement"><input checked={agreed} onChange={(event) => setAgreed(event.target.checked)} type="checkbox" /> 수업 시작 전 전액 환불, 수업 시작 후 제공된 회차에 따른 환불 규정을 확인했습니다.</label><button className="button button-primary" disabled={!available || processing} onClick={preparePayment} type="button">{processing ? '주문 확인 중...' : '토스 테스트 결제하기'}</button>{message && <p className="checkout-message" role="status">{message}</p>}</article><aside className="checkout-safety"><strong>결제 안전 안내</strong><ul><li>실제 결제 금액은 서버가 Supabase에서 다시 조회합니다.</li><li>성공 주소만으로 수강권을 발급하지 않습니다.</li><li>토스 승인 결과를 검증한 뒤 원자적으로 수강권을 발급합니다.</li><li>시크릿 키는 Vercel 서버 환경변수에만 저장합니다.</li></ul></aside></div></section>
}

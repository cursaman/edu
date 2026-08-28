import { useEffect, useState } from 'react'
import { callPaymentApi } from '../data/paymentClient.js'

export default function PaymentSuccessPage({ searchParams, session }) {
  const [state, setState] = useState({ status: 'loading', message: '서버에서 결제 승인과 금액을 확인하고 있습니다.' })
  const paymentKey = searchParams.get('paymentKey') || ''
  const orderId = searchParams.get('orderId') || ''
  const amount = searchParams.get('amount') || ''
  useEffect(() => {
    if (!session?.user) { setState({ status: 'error', message: '결제한 계정으로 다시 로그인해 주세요.' }); return }
    let active = true
    callPaymentApi('/api/payments/confirm', { paymentKey, orderId, amount: Number(amount) })
      .then((result) => { if (active) setState({ status: 'done', message: result.message, programId: result.programId }) })
      .catch((error) => { if (active) setState({ status: 'error', message: error.message }) })
    return () => { active = false }
  }, [amount, orderId, paymentKey, session?.user?.id])
  return <section className="content-page page-shell payment-result"><span className="section-eyebrow">TEST PAYMENT RESULT</span><h1>{state.status === 'done' ? '테스트 결제 승인이 완료되었습니다' : state.status === 'error' ? '결제를 확정하지 못했습니다' : '결제를 확인하고 있습니다'}</h1><p role="status">{state.message}</p><div className="payment-result-summary"><span>주문번호 <strong>{orderId || '확인되지 않음'}</strong></span><span>요청 금액 <strong>{Number(amount || 0).toLocaleString('ko-KR')}원</strong></span></div>{state.status === 'done' && <a className="button button-primary" href="#/classroom">내 강의실 확인하기 →</a>}{state.status === 'error' && <a className="button button-secondary" href="#/programs">프로그램으로 돌아가기</a>}</section>
}

import { useState } from 'react'
import { findManagedProgram } from '../data/contentStorage.js'
import { canPurchase, effectivePrice, formatPrice } from '../data/pricing.js'

export default function CheckoutPage({ programId, session }) {
  const program = findManagedProgram(programId)
  const [agreed, setAgreed] = useState(false)
  const [message, setMessage] = useState('')

  if (!program) return <section className="content-page page-shell empty-state"><strong>결제할 교육 프로그램을 찾지 못했습니다.</strong><a className="button button-primary" href="#/programs">프로그램 목록으로</a></section>
  if (!session?.user) return <section className="content-page page-shell checkout-page"><div className="page-introduction"><span className="section-eyebrow">LOGIN REQUIRED</span><h1>로그인 후 결제할 수 있습니다</h1><p>결제와 수강권을 본인 계정에 안전하게 연결하기 위해 로그인이 필요합니다.</p><a className="button button-primary" href={`#/login?next=/checkout/${programId}`}>로그인하기 →</a></div></section>

  const price = effectivePrice(program)
  const available = canPurchase(program)
  function preparePayment() {
    if (!agreed) return setMessage('환불 규정을 확인하고 동의해 주세요.')
    setMessage('테스트 결제창과 서버 주문 생성은 11일차에 연결합니다. 오늘은 실제 결제되지 않습니다.')
  }

  return <section className="content-page page-shell checkout-page"><div className="page-introduction"><span className="section-eyebrow">TEST CHECKOUT</span><h1>주문 내용을 확인해 주세요</h1><p>오늘 화면에서는 결제 정보만 확인하며 카드 결제창이나 실제 청구는 실행하지 않습니다.</p></div><div className="checkout-layout"><article className="checkout-order-card"><h2>{program.title}</h2><dl><div><dt>로그인 이메일</dt><dd>{session.user.email}</dd></div><div><dt>정상 가격</dt><dd>{formatPrice(program.regularPrice)}</dd></div><div><dt>최종 결제 금액</dt><dd><strong>{formatPrice(price)}</strong></dd></div><div><dt>판매 상태</dt><dd>{available ? '결제 준비 가능' : program.isFree ? '무료 과정' : '현재 판매하지 않음'}</dd></div></dl><label className="checkout-agreement"><input checked={agreed} onChange={(event) => setAgreed(event.target.checked)} type="checkbox" /> 수업 시작 전 전액 환불, 수업 시작 후 제공된 회차에 따른 환불 규정을 확인했습니다.</label><button className="button button-primary" disabled={!available} onClick={preparePayment} type="button">테스트 결제 준비하기</button>{message && <p className="checkout-message" role="status">{message}</p>}</article><aside className="checkout-safety"><strong>결제 안전 안내</strong><ul><li>브라우저에 표시된 금액을 서버가 다시 확인합니다.</li><li>결제 성공 주소만으로 수강권을 발급하지 않습니다.</li><li>결제 승인과 웹훅을 서버에서 검증한 뒤 수강권을 발급합니다.</li><li>시크릿 키는 Vercel 서버 환경변수에만 저장합니다.</li></ul></aside></div></section>
}

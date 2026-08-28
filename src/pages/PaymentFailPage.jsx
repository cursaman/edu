const easyMessages = { PAY_PROCESS_CANCELED: '사용자가 결제를 취소했습니다.', PAY_PROCESS_ABORTED: '결제가 중단되었습니다. 잠시 후 다시 시도해 주세요.', REJECT_CARD_COMPANY: '카드사가 결제를 승인하지 않았습니다. 다른 결제수단을 이용해 주세요.' }
export default function PaymentFailPage({ searchParams }) {
  const code = (searchParams.get('code') || 'PAYMENT_FAILED').slice(0, 80)
  const orderId = (searchParams.get('orderId') || '').slice(0, 64)
  return <section className="content-page page-shell payment-result"><span className="section-eyebrow">TEST PAYMENT FAILED</span><h1>테스트 결제가 완료되지 않았습니다</h1><p>{easyMessages[code] || '결제 정보를 확인한 뒤 다시 시도해 주세요.'}</p><div className="payment-result-summary"><span>오류 코드 <strong>{code}</strong></span>{orderId && <span>주문번호 <strong>{orderId}</strong></span>}</div><a className="button button-secondary" href="#/programs">프로그램으로 돌아가기</a></section>
}

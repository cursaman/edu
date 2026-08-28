// 11일차 구현 예정: 주문 소유자·서버 저장 금액 확인 → 토스 결제 승인 API → 결제 및 수강권 원자적 저장.
// TOSS_SECRET_KEY를 브라우저 응답, 로그 또는 GitHub에 절대 포함하지 않습니다.
export default function handler(_request, response) {
  return response.status(501).json({ code: 'PAYMENT_NOT_CONNECTED', message: '테스트 결제 승인은 아직 연결하지 않았습니다.' })
}

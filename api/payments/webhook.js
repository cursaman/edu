// 11일차 구현 예정: 웹훅 출처 확인 → 결제 조회 API로 상태·금액 재검증 → 멱등하게 payment_events 저장.
export default function handler(_request, response) {
  return response.status(501).json({ code: 'WEBHOOK_NOT_CONNECTED', message: '결제 웹훅은 아직 연결하지 않았습니다.' })
}

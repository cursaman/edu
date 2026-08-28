// 후속 구현 예정: 관리자 인증 → 취소 가능 상태 확인 → 토스 취소 API → 결제·수강권 상태 동기화.
export default function handler(_request, response) {
  return response.status(501).json({ code: 'CANCEL_NOT_CONNECTED', message: '실제 결제 취소와 환불은 아직 연결하지 않았습니다.' })
}

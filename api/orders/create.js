// 11일차 구현 예정: 로그인 토큰 확인 → Supabase의 프로그램 가격 재조회 → 주문번호와 pending 주문 생성.
// 브라우저가 보낸 금액은 사용하지 않으며 SUPABASE_SERVICE_ROLE_KEY는 Vercel 서버 환경변수에서만 읽습니다.
export default function handler(_request, response) {
  return response.status(501).json({ code: 'PAYMENT_NOT_CONNECTED', message: '테스트 주문 생성은 11일차에 연결합니다.' })
}

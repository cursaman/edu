export default function PaymentOverviewPanel() {
  return <div className="admin-content payment-overview"><div className="admin-toolbar"><h2>주문·결제 현황</h2></div><div className="privacy-warning"><strong>10일차 기본 구조입니다.</strong><p>오늘은 실제 결제를 생성하지 않습니다. 11일차에 서버 주문 생성과 토스페이먼츠 테스트 승인·웹훅을 연결하면 이 화면에서 공동 결제 내역을 조회합니다.</p></div><div className="admin-stats"><article><span>신규 주문</span><strong>0건</strong></article><article><span>결제 완료</span><strong>0건</strong></article><article><span>취소·환불</span><strong>0건</strong></article></div><div className="admin-item-list"><p>표시할 테스트 주문이 없습니다.</p></div></div>
}

const enrollmentSteps = [
  { number: '01', title: '과정을 살펴봅니다', description: '교육 분야와 프로그램 목록에서 배우고 싶은 과정을 선택합니다.' },
  { number: '02', title: '3회차까지 무료로 체험합니다', description: '로그인하지 않아도 대표 과정의 첫 3회차를 먼저 확인할 수 있습니다.' },
  { number: '03', title: '회원가입하고 신청합니다', description: '계속 배우고 싶다면 이메일로 가입한 뒤 과정 상세 화면에서 신청합니다.' },
  { number: '04', title: '수강권을 확인합니다', description: '무료 과정은 관리자 승인 후, 유료 과정은 테스트 결제 승인 후 전체 회차가 열립니다.' },
  { number: '05', title: '내 강의실에서 학습합니다', description: '최근 학습 회차와 진행률을 확인하며 중단한 곳부터 이어서 학습합니다.' },
]

const questions = [
  ['회원가입 전에 볼 수 있나요?', '네. 대표 과정은 1~3회차까지 로그인 없이 무료로 체험할 수 있습니다.'],
  ['어떤 개인정보를 받나요?', '현재 수강 기능은 Supabase 로그인 이메일만 사용하며 이름이나 전화번호를 추가로 받지 않습니다.'],
  ['신청하면 바로 모든 강의를 볼 수 있나요?', '무료 과정은 관리자 승인 상태를 확인합니다. 유료 과정은 서버에서 결제 승인이 확인된 뒤 수강권이 활성화됩니다.'],
  ['결제는 실제 결제인가요?', '현재는 토스페이먼츠 테스트 모드 준비 단계입니다. 실제 금액이 청구되지 않는다는 안내를 반드시 확인하세요.'],
  ['환불은 어떻게 하나요?', '실제 결제 서비스가 열리기 전 환불 기준과 처리 창구를 별도로 공지합니다. 현재 테스트 결제에는 실제 환불이 발생하지 않습니다.'],
]

export default function ApplicationPage() {
  return (
    <section className="content-page page-shell enrollment-guide" aria-labelledby="application-title">
      <div className="page-introduction enrollment-guide-hero">
        <span className="section-eyebrow">ENROLLMENT GUIDE</span>
        <h1 id="application-title">처음 방문하셨나요?<br />수강 방법부터 확인하세요.</h1>
        <p>개인정보를 입력하는 체험 폼 대신, 무료 체험에서 내 강의실 입장까지 필요한 순서를 한눈에 안내합니다.</p>
        <div className="enrollment-guide-actions">
          <a className="button button-primary" href="#/programs">교육 프로그램 보기</a>
          <a className="button button-secondary" href="#/classroom">내 강의실 확인</a>
        </div>
      </div>

      <div className="enrollment-guide-notice" role="note">
        <strong>먼저 3회차까지 무료로 확인하세요.</strong>
        <p>바로 신청하거나 결제할 필요가 없습니다. 수업 설명과 실습 방식이 나에게 맞는지 먼저 살펴보세요.</p>
      </div>

      <section aria-labelledby="enrollment-steps-title">
        <div className="section-heading">
          <span className="section-eyebrow">HOW TO START</span>
          <h2 id="enrollment-steps-title">수강은 이렇게 진행됩니다</h2>
        </div>
        <ol className="enrollment-guide-steps">
          {enrollmentSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="enrollment-guide-faq" aria-labelledby="enrollment-faq-title">
        <div className="section-heading">
          <span className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 id="enrollment-faq-title">자주 묻는 질문</h2>
        </div>
        <div className="enrollment-guide-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="enrollment-guide-final">
        <div><span className="section-eyebrow">READY TO LEARN?</span><h2>관심 있는 과정부터 골라보세요.</h2><p>과정 상세 화면에서 무료 회차, 전체 구성, 가격과 신청 상태를 확인할 수 있습니다.</p></div>
        <a className="button button-primary" href="#/programs">과정 선택하기 →</a>
      </div>
    </section>
  )
}

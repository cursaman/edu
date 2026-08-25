const pageInformation = {
  notice: {
    eyebrow: 'NOTICE',
    title: '교육 소식을 준비하고 있어요',
    description: '교육 일정, 신청 안내, 수업 준비물은 공지사항 기능이 준비되면 이곳에서 확인할 수 있습니다.',
    items: ['새 교육 프로그램 개설 일정', '수업 전 설치와 준비물 안내', '교육 운영 일정과 변경 사항'],
  },
  application: {
    eyebrow: 'APPLICATION',
    title: '수강 신청은 곧 열릴 예정입니다',
    description: '지금은 교육 프로그램을 먼저 살펴보는 단계입니다. 실제 신청 내용의 저장과 접수는 아직 연결하지 않았습니다.',
    items: ['관심 있는 교육 분야 선택하기', '프로그램 상세 내용과 준비물 확인하기', '신청 기능이 준비되면 접수하기'],
  },
}

export default function InformationPage({ kind }) {
  const information = pageInformation[kind]

  return (
    <section className="content-page page-shell information-page" aria-labelledby="information-title">
      <div className="information-panel">
        <span className="section-eyebrow">{information.eyebrow}</span>
        <h1 id="information-title">{information.title}</h1>
        <p>{information.description}</p>

        <ul className="information-list">
          {information.items.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <a className="button button-primary" href="#/programs">교육 프로그램 먼저 보기</a>
        <span className="information-caption">현재는 안내 화면이며 입력하거나 저장하는 기능은 없습니다.</span>
      </div>
    </section>
  )
}

export const notices = [
  {
    id: 'program-registration',
    title: '교육 프로그램 모집 안내',
    date: '2026.08.25',
    summary: '처음 시작하는 성인을 위한 웹개발 입문 프로그램을 소개합니다.',
    content: [
      'EDU 웹개발 교육 플랫폼에서는 코딩 경험이 거의 없는 성인 학습자를 위한 입문 프로그램을 준비하고 있습니다.',
      '현재 홈페이지의 수강 신청은 실제 접수가 아닌 체험 기능입니다. 실제 모집 일정과 접수 방법은 운영 준비가 끝난 뒤 별도로 안내합니다.',
    ],
    checklist: ['관심 프로그램의 상세 내용 확인', '교육 기간과 준비물 확인', '실제 모집 공지 게시 여부 확인'],
  },
  {
    id: 'class-preparation',
    title: '수업 전 준비물 안내',
    date: '2026.08.25',
    summary: '노트북과 인터넷, Node.js 설치 상태를 수업 전에 확인해 주세요.',
    content: [
      '수업에는 인터넷에 연결되는 노트북이 필요합니다. 충전기와 자주 사용하는 웹브라우저도 함께 준비해 주세요.',
      'Node.js는 JavaScript 개발 도구를 컴퓨터에서 실행하게 해주는 프로그램입니다. 설치 여부가 불확실하면 수업 전에 강사와 함께 확인할 수 있습니다.',
    ],
    checklist: ['노트북과 충전기 준비', '인터넷 연결 확인', 'Node.js 22 LTS와 npm 설치 확인', 'GitHub 계정 로그인 확인'],
  },
  {
    id: 'github-pages-published',
    title: 'GitHub Pages 홈페이지 공개 안내',
    date: '2026.08.25',
    summary: 'EDU 홈페이지가 실제 인터넷 주소에 안전하게 공개되었습니다.',
    content: [
      'EDU 프로젝트는 GitHub에 소스를 보관하고 GitHub Actions가 자동으로 배포용 파일을 만든 뒤 GitHub Pages에 공개합니다.',
      'main 브랜치에 새 소스를 올리면 자동 배포가 시작됩니다. 배포가 끝난 뒤 실제 홈페이지에서 변경 사항을 확인할 수 있습니다.',
    ],
    checklist: ['GitHub Actions 성공 표시 확인', '공개 홈페이지 첫 화면 확인', '메뉴와 교육자료 상세 화면 확인'],
  },
]

export function findNotice(noticeId) {
  return notices.find((notice) => notice.id === noticeId)
}

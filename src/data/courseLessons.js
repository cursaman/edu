const session = (id, week, order, title, goal, concept, practice, code, prompt, quiz, result) => ({
  id, week, order, title, duration: '50분', goal, concept, practice, code, prompt, quiz, result,
  errors: ['화면이 바뀌지 않으면 파일 저장 여부와 브라우저 주소를 확인합니다.', '오류가 나오면 콘솔의 첫 번째 빨간 문장부터 확인합니다.'],
})

export const reactWebsiteCourse = {
  programId: 'react-website', title: 'React 웹사이트 만들기', totalWeeks: 4,
  outcome: '교육 프로그램을 소개하는 PC·모바일 반응형 React 홈페이지',
  sessions: [
    session('react-01',1,1,'개발 환경과 첫 화면 실행','Node.js·npm·Vite의 역할을 알고 프로젝트를 실행합니다.','Node.js는 작업 도구를 움직이는 전기, npm은 필요한 도구를 가져오는 상자, Vite는 빠른 작업대입니다.',['터미널에서 node -v와 npm -v를 확인합니다.','프로젝트 폴더에서 npm install을 실행합니다.','npm run dev를 실행하고 안내 주소를 엽니다.','App.jsx 제목을 내 문구로 바꿉니다.'],'npm install\nnpm run dev','React 초보자입니다. 현재 프로젝트를 확인하고 App.jsx 제목만 수정해줘. 기존 파일은 삭제하지 말고 실행 방법도 알려줘.',['로컬 주소가 열리나요?','수정한 제목이 보이나요?'],'내 문구가 표시되는 첫 React 화면'),
    session('react-02',1,2,'JSX와 컴포넌트 이해','반복되는 화면을 재사용 가능한 컴포넌트로 나눕니다.','컴포넌트는 레고 블록처럼 다시 쓰는 화면 부품이고 JSX는 화면 구조를 JavaScript 안에 적는 방법입니다.',['Header.jsx 파일을 만듭니다.','제목과 메뉴를 JSX로 작성합니다.','App.jsx에서 Header를 불러옵니다.','화면에서 헤더를 확인합니다.'],'function Header() {\n  return <header><h1>EDU</h1></header>\n}\nexport default Header','Header 컴포넌트를 별도 파일로 만들고 App.jsx에 연결해줘. 초보자가 이해할 주석을 넣어줘.',['컴포넌트 이름이 대문자로 시작하나요?','export와 import가 연결됐나요?'],'재사용 가능한 헤더 컴포넌트'),
    session('react-03',2,3,'데이터로 교육 카드 만들기','배열과 map을 이용해 여러 교육 카드를 표시합니다.','배열은 여러 자료를 담는 서랍이고 map은 서랍 속 자료를 하나씩 카드로 바꾸는 반복 작업입니다.',['프로그램 배열 세 개를 만듭니다.','ProgramCard 컴포넌트를 만듭니다.','map으로 카드를 반복합니다.','각 카드 제목이 다른지 봅니다.'],'const programs = [{ id: 1, title: "React 입문" }]\n{programs.map(item => <ProgramCard key={item.id} program={item} />)}','임시 프로그램 배열 3개를 만들고 ProgramCard로 반복 표시해줘. key와 props도 쉽게 설명해줘.',['카드가 세 개 보이나요?','각 카드에 고유한 key가 있나요?'],'데이터로 반복되는 프로그램 카드'),
    session('react-04',2,4,'CSS 카드와 반응형 배치','PC에서는 여러 열, 모바일에서는 한 열로 보이게 만듭니다.','Grid는 카드가 놓일 칸을 만드는 바둑판이고 미디어 쿼리는 화면이 좁을 때 바뀌는 규칙입니다.',['카드에 여백과 테두리를 줍니다.','Grid로 세 열을 만듭니다.','680px 이하에서 한 열로 바꿉니다.','모바일 보기로 잘림을 확인합니다.'],'.grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }\n@media (max-width:680px){ .grid{grid-template-columns:1fr;} }','프로그램 카드를 PC 3열, 모바일 1열로 만들고 글자가 잘리지 않게 해줘.',['가로 스크롤이 없나요?','버튼을 손가락으로 누르기 쉬운가요?'],'PC·모바일 반응형 카드 화면'),
    session('react-05',3,5,'상태로 분야 필터 만들기','useState로 선택한 분야를 기억하고 목록을 필터링합니다.','상태는 화면이 기억하는 현재 값입니다. 버튼을 누르면 선택 분야가 바뀌고 화면도 다시 계산됩니다.',['useState를 불러옵니다.','선택 분야 상태를 만듭니다.','분야 버튼에 변경 동작을 연결합니다.','filter로 해당 카드만 표시합니다.'],"const [category,setCategory] = useState('all')\nconst visible = programs.filter(p => category === 'all' || p.category === category)",'전체·입문·실전 필터 버튼을 만들고 선택한 프로그램만 표시해줘. 현재 버튼도 구분해줘.',['전체 버튼에서 모두 보이나요?','선택한 버튼이 시각적으로 구분되나요?'],'분야별 프로그램 필터'),
    session('react-06',3,6,'상세 화면과 주소 연결','카드를 누르면 해당 프로그램의 상세 내용을 보여줍니다.','라우팅은 건물의 호수 안내처럼 주소에 맞는 화면을 연결하는 규칙입니다.',['카드 링크에 프로그램 ID를 넣습니다.','주소에서 ID를 읽습니다.','find로 프로그램을 찾습니다.','없는 ID에는 안내 화면을 표시합니다.'],'const program = programs.find(item => item.id === programId)','프로그램 카드에서 상세 주소로 이동하고 ID에 맞는 내용을 보여줘. 잘못된 ID 안내도 만들어줘.',['카드별 상세 내용이 다른가요?','잘못된 주소에서 백지 화면이 아닌가요?'],'프로그램 목록과 상세 화면 연결'),
    session('react-07',4,7,'입력 폼과 유효성 검사','필수 입력과 길이를 검사하는 수강 신청 체험 폼을 만듭니다.','유효성 검사는 접수 전에 빠진 내용이나 너무 긴 문장을 확인하는 과정입니다.',['이름과 관심 과정 입력을 만듭니다.','필수값을 검사합니다.','신청 동기를 300자로 제한합니다.','오류를 입력 항목 가까이에 표시합니다.'],"if (!name.trim()) setError('이름을 입력해 주세요.')",'이름과 프로그램이 필수인 체험 신청 폼을 만들어줘. 신청 동기는 300자로 제한하고 오류를 쉽게 표시해줘.',['빈 이름이 차단되나요?','오류 문장을 읽고 고칠 수 있나요?'],'입력 검사가 적용된 체험 폼'),
    session('react-08',4,8,'빌드·모바일 점검과 발표','완성 화면을 검사하고 배포 가능한 결과물을 준비합니다.','빌드는 작성한 소스를 인터넷 공개에 알맞은 파일로 정리하는 과정입니다.',['npm run build를 실행합니다.','전체 메뉴와 잘못된 주소를 확인합니다.','PC와 모바일 화면을 점검합니다.','완성 결과와 어려웠던 점을 발표합니다.'],'npm run build\ngit status','전체 화면을 점검하고 빌드해줘. 변경 파일, 성공 결과, 남은 문제를 초보자에게 설명해줘.',['빌드가 성공했나요?','모바일과 키보드 사용을 확인했나요?'],'발표 가능한 반응형 React 홈페이지'),
  ],
}

export const detailedCourses = [reactWebsiteCourse]
export const findDetailedCourse = (programId) => detailedCourses.find((course) => course.programId === programId)

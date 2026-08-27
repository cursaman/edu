const session = (id, week, order, title, goal, concept, practice, code, prompt, quiz, result) => ({
  id, week, order, title, duration: '50분', goal, concept, practice, code, prompt, quiz, result,
  materials: ['Node.js와 npm이 설치된 노트북', '현재 EDU 프로젝트', '실습 결과를 기록할 메모장'],
  timeline: [
    { minutes: '0~5분', activity: '지난 회차 확인과 오늘 만들 결과 소개' },
    { minutes: '5~15분', activity: `${title} 핵심 개념을 쉬운 예로 설명` },
    { minutes: '15~35분', activity: '예제 실행 후 내 프로젝트에 맞게 수정' },
    { minutes: '35~45분', activity: '오류 해결과 PC·모바일 결과 확인' },
    { minutes: '45~50분', activity: '확인 문제, 과제 안내, 학습 완료 표시' },
  ],
  instructorGuide: `오늘은 “${title}”을 완성합니다. 코드를 외우는 것보다 입력값이 어디에서 와서 어떤 화면으로 바뀌는지 확인해 주세요. 먼저 예제를 그대로 실행하고, 다음에는 문구나 값을 한 가지 바꾸어 차이를 설명하게 합니다.`,
  quizAnswers: quiz.map((_, index) => index === 0
    ? `${title}의 핵심 목적과 화면에서 맡는 역할을 자신의 말로 설명하면 됩니다.`
    : index === 1
      ? '예제의 제목·문구·숫자·조건 중 하나를 바꾸고 화면 변화를 확인합니다.'
      : '브라우저 화면보다 터미널과 개발자 도구에 표시된 첫 번째 오류 문장을 먼저 확인합니다.'),
  assignment: `${result}을(를) 내 프로젝트에 적용하고 변경 전후 화면을 한 장씩 기록합니다.`,
  completionCriteria: ['예제를 직접 실행했습니다.', '내 프로젝트에 맞게 한 가지 이상 수정했습니다.', '결과와 배운 점을 설명할 수 있습니다.'],
  errors: ['화면이 바뀌지 않으면 파일 저장 여부와 브라우저 주소를 확인합니다.', '오류가 나오면 콘솔의 첫 번째 빨간 문장부터 확인합니다.'],
})

const practiceSession = (id, week, order, title, goal, concept, code, prompt, result) => session(
  id, week, order, title, goal, concept,
  [`${title}에 필요한 입력과 결과를 먼저 적습니다.`, '제공된 예제 코드를 실행합니다.', '값이나 문구를 한 가지 바꿔 다시 실행합니다.', 'PC와 모바일에서 결과를 비교합니다.', '오류가 있으면 첫 오류와 재현 순서를 기록합니다.'],
  code, prompt,
  [`${title}의 핵심 역할을 말할 수 있나요?`, '예제의 어느 값을 바꾸면 화면이 달라지나요?', '오류가 생겼을 때 가장 먼저 확인할 것은 무엇인가요?'], result,
)

export const reactWebsiteCourse = {
  programId: 'react-website', title: 'React 웹사이트 만들기', totalWeeks: 10,
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
    practiceSession('react-09',5,9,'React 프로젝트 구조 정리','components·pages·data 폴더의 역할을 구분합니다.','폴더 구조는 서류함을 용도별로 나누는 일과 같습니다. 화면, 부품, 데이터를 분리하면 수정 위치를 찾기 쉽습니다.','src/\n├─ components/\n├─ pages/\n└─ data/','현재 React 파일을 components, pages, data 역할로 나누되 기존 기능은 유지해줘.','역할별로 정리된 React 프로젝트'),
    practiceSession('react-10',5,10,'props로 데이터 전달하기','부모 화면에서 자식 컴포넌트로 필요한 값을 전달합니다.','props는 부모가 자식에게 건네는 이름표가 붙은 준비물입니다. 자식은 받은 값을 화면에 표시합니다.','<ProgramCard title="React 입문" level="기초" />','title과 level을 props로 받는 프로그램 카드를 만들고 전달 흐름을 설명해줘.','데이터를 받아 표시하는 카드'),
    practiceSession('react-11',5,11,'조건부 화면 표시','조건에 따라 로딩·빈 목록·완료 화면을 다르게 표시합니다.','조건부 렌더링은 상황에 맞는 안내판을 골라 보여주는 방식입니다.','{items.length === 0 ? <p>자료가 없습니다.</p> : <ProgramList items={items} />}','목록이 비었을 때 안내 문구가 보이도록 조건부 화면을 추가해줘.','빈 상태 안내가 있는 목록'),
    practiceSession('react-12',6,12,'검색 기능 구현','입력한 검색어가 제목과 설명에 포함된 프로그램만 표시합니다.','검색은 모든 카드를 하나씩 살펴 조건에 맞는 것만 새 바구니에 담는 작업입니다.',"const found = items.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))",'제목과 설명을 검색하는 React 입력창을 만들고 검색어가 없으면 전체를 보여줘.','실시간 프로그램 검색'),
    practiceSession('react-13',6,13,'복합 필터 만들기','분야와 난이도 조건을 동시에 적용합니다.','복합 필터는 두 개 이상의 체를 차례로 통과시키는 과정입니다. 각 조건은 전체 선택도 허용해야 합니다.',"const visible = items.filter(item => (category === 'all' || item.category === category) && (level === 'all' || item.level === level))",'분야와 난이도를 함께 선택하는 복합 필터를 만들어줘. 조건 변경 시 결과 수도 보여줘.','분야·난이도 복합 필터'),
    practiceSession('react-14',6,14,'정렬 기능 구현','이름·난이도·최신 순으로 목록 순서를 바꿉니다.','정렬은 자료를 없애지 않고 줄 서는 기준만 바꾸는 기능입니다. 원본 배열을 복사한 뒤 정렬해야 안전합니다.',"const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title, 'ko'))",'원본 배열을 바꾸지 않고 이름 순과 최신 순 정렬을 추가해줘.','목록 정렬 선택 기능'),
    practiceSession('react-15',6,15,'페이지네이션 구현','많은 카드를 페이지 단위로 잘라 표시합니다.','페이지네이션은 두꺼운 명단을 여러 장으로 나눠 보는 방법입니다. 전체 개수와 현재 범위를 함께 알려줘야 합니다.','const start = (page - 1) * 9\nconst pageItems = items.slice(start, start + 9)','카드를 9개씩 나누고 이전·다음과 페이지 번호를 만들어줘. 필터 변경 시 1페이지로 이동해줘.','9개 단위 페이지네이션'),
    practiceSession('react-16',7,16,'해시 라우팅과 검색조건 유지','새로고침해도 검색·필터·페이지 조건이 주소에 남게 합니다.','URLSearchParams는 주소 뒤의 조건표를 읽고 쓰는 도구입니다. 링크를 공유해도 같은 목록을 보여줄 수 있습니다.',"const params = new URLSearchParams('category=frontend&page=2')\nparams.get('page')",'검색·필터·페이지를 해시 주소의 쿼리로 저장하고 다시 읽게 해줘.','공유 가능한 검색 결과 주소'),
    practiceSession('react-17',7,17,'localStorage 찜 기능','찜한 프로그램 ID를 브라우저에 저장하고 다시 불러옵니다.','localStorage는 지금 사용하는 브라우저 안의 작은 보관함입니다. 다른 기기에는 자동으로 옮겨지지 않습니다.',"localStorage.setItem('favorites', JSON.stringify(ids))",'프로그램 찜 ID를 localStorage에 저장하고 새로고침 후 복원해줘.','새로고침해도 유지되는 찜 목록'),
    practiceSession('react-18',7,18,'학습 완료와 진도율','완료한 회차를 저장하고 백분율로 계산합니다.','진도율은 완료 개수를 전체 개수로 나눈 뒤 100을 곱한 값입니다. 완료 취소도 가능해야 합니다.','const percent = Math.round(completed.length / sessions.length * 100)','회차 완료와 취소 버튼, 전체 진도율 막대를 만들어줘. localStorage에 저장해줘.','회차별 완료와 전체 진도율'),
    practiceSession('react-19',8,19,'외부 API 요청 기초','fetch로 공개 API를 요청하고 JSON 결과를 확인합니다.','API 요청은 다른 서비스 창구에 정해진 형식으로 자료를 부탁하는 일입니다. 로딩과 실패 상황도 함께 처리합니다.',"const response = await fetch(url)\nif (!response.ok) throw new Error('요청 실패')\nconst data = await response.json()",'공개 API를 fetch로 호출하고 로딩·오류·성공 화면을 각각 보여줘.','API 데이터를 표시하는 화면'),
    practiceSession('react-20',8,20,'로딩과 오류 화면','요청 중·성공·실패 상태를 사용자가 이해하도록 표시합니다.','네트워크 작업은 시간이 걸리거나 실패할 수 있습니다. 빈 화면 대신 현재 상황과 다시 시도 방법을 알려줘야 합니다.',"if (loading) return <p>자료를 불러오는 중입니다.</p>\nif (error) return <p role=\"alert\">{error}</p>",'API 화면에 로딩 문구, 오류 안내, 다시 시도 버튼을 추가해줘.','안내가 분명한 비동기 화면'),
    practiceSession('react-21',8,21,'폼 상태와 여러 입력 관리','하나의 객체로 여러 입력값을 관리합니다.','입력 객체는 신청서 한 장처럼 이름·연락처·동기를 한 곳에 모아 관리합니다.',"const [form, setForm] = useState({ name: '', motivation: '' })",'이름과 신청 동기를 하나의 form 상태로 관리하고 입력할 때 해당 항목만 수정해줘.','여러 입력을 관리하는 신청 폼'),
    practiceSession('react-22',8,22,'접근성 있는 폼 만들기','label·오류 연결·키보드 사용을 점검합니다.','접근성 있는 폼은 입력 이름과 오류 이유를 화면을 보지 못하는 사용자에게도 전달합니다.','<label htmlFor="name">이름</label>\n<input id="name" aria-describedby="name-error" />','모든 입력에 label을 연결하고 오류를 aria-describedby로 안내해줘.','키보드와 화면낭독기 친화 폼'),
    practiceSession('react-23',9,23,'Supabase 조회 흐름 이해','공동 데이터 조회와 로컬 임시 데이터의 차이를 이해합니다.','Supabase는 여러 사용자가 함께 보는 온라인 자료 보관함입니다. 브라우저 공개 키와 비밀 키를 구분해야 합니다.',"const { data, error } = await supabase.from('edu_programs').select('*')",'Supabase에서 공개 프로그램 목록을 조회하고 연결 정보가 없으면 기본 데이터를 보여줘.','공동 프로그램 목록 조회'),
    practiceSession('react-24',9,24,'환경변수와 비밀정보 보호','공개 가능한 설정과 서버 비밀정보를 구분합니다.','환경변수는 설정을 코드 밖에 두는 방법입니다. 브라우저에 들어간 값은 사용자가 볼 수 있으므로 비밀 키를 넣으면 안 됩니다.','VITE_SUPABASE_URL=프로젝트_URL\nVITE_SUPABASE_PUBLISHABLE_KEY=브라우저용_키','환경변수 사용 위치를 점검하고 비밀번호와 service role key가 브라우저 코드에 없는지 확인해줘.','비밀정보가 제외된 환경 설정'),
    practiceSession('react-25',9,25,'관리자 CRUD 화면 이해','등록·조회·수정·삭제 흐름과 입력 검사를 연결합니다.','CRUD는 주소록을 적고 찾고 고치고 지우는 네 가지 기본 작업입니다. 화면 제한과 DB 권한을 함께 적용해야 합니다.',"await supabase.from('edu_programs').insert(program)",'관리자 프로그램 등록 폼에 필수값 검사와 Supabase insert를 연결해줘. 오류도 표시해줘.','프로그램 등록 관리 화면'),
    practiceSession('react-26',9,26,'RLS와 관리자 권한','화면 숨김이 아닌 데이터베이스 정책으로 변경을 차단합니다.','RLS는 데이터 행마다 출입 규칙을 확인하는 경비원입니다. 버튼을 숨기는 것만으로는 보안이 되지 않습니다.','alter table edu_programs enable row level security;','공개 조회와 관리자 변경만 허용하는 RLS 정책을 점검하는 순서를 알려줘.','RLS가 적용된 데이터 관리'),
    practiceSession('react-27',10,27,'컴포넌트 통합 테스트','주요 메뉴와 사용자 행동이 계속 작동하는지 확인합니다.','회귀 테스트는 새 기능을 추가한 뒤 기존 기능이 망가지지 않았는지 다시 보는 검사입니다.','npm run build','홈·프로그램·교육자료·강의실의 주요 사용자 흐름을 테스트 목록으로 만들고 점검해줘.','전체 기능 테스트 체크리스트'),
    practiceSession('react-28',10,28,'성능과 이미지 최적화','이미지 용량과 렌더링 수를 줄여 화면을 빠르게 만듭니다.','성능 최적화는 사용자가 기다리는 시간을 줄이는 작업입니다. 먼저 측정한 뒤 큰 이미지와 불필요한 작업부터 줄입니다.','<img loading="lazy" src={image} alt={imageAlt} />','프로그램 이미지에 lazy loading과 대체 설명을 적용하고 큰 번들 원인을 알려줘.','빠르게 열리는 이미지 목록'),
    practiceSession('react-29',10,29,'GitHub Pages 자동 배포','GitHub Actions로 빌드하고 실제 주소에 공개합니다.','자동 배포는 소스를 올리면 작업자가 빌드와 공개를 정해진 순서로 수행하는 과정입니다.','npm run build\ngit status\ngit push origin main','Vite base와 GitHub Pages Actions 설정을 점검하고 배포 실패 시 확인 순서를 알려줘.','자동 배포되는 React 홈페이지'),
    practiceSession('react-30',10,30,'최종 발표와 인수 점검','완성 결과를 설명하고 다른 사람이 이어서 운영할 문서를 만듭니다.','인수 문서는 무엇을 만들었고 어떻게 실행·검사·수정하는지 다음 담당자에게 전달하는 안내서입니다.','npm install\nnpm run dev\nnpm run build','프로젝트 기능, 실행법, 테스트 결과, 보안 주의사항, 미완료 항목을 README에 정리해줘.','발표·배포·운영 문서를 갖춘 최종 프로젝트'),
  ],
}

const representativeCourseSpecs = [
  { programId: 'service-planning-basic', title: '아이디어를 웹서비스 기획서로 만들기', outcome: '사용자 문제·MVP·화면 흐름·개발 요청서가 담긴 웹서비스 기획서', tools: 'Codex와 문서 도구', modules: ['과정 목표와 아이디어 찾기','사용자와 문제 정의','인터뷰 질문 설계','경쟁 서비스 조사','핵심 가치 제안','MVP 기능 우선순위','사용자 여정 작성','화면 목록과 흐름','요구사항과 완료 기준','기획 발표와 인수 문서'] },
  { programId: 'uiux-figma-basic', title: 'Figma로 웹서비스 화면 설계하기', outcome: 'PC·모바일 화면과 디자인 규칙이 포함된 Figma 시안', tools: 'Figma와 웹브라우저', modules: ['Figma 환경과 프레임','색상과 대비','글자 체계','여백과 그리드','Auto Layout','버튼과 입력 요소','카드 컴포넌트','PC 메인 화면','모바일 반응형 화면','프로토타입과 개발 전달'] },
  { programId: 'web-foundation', title: '웹 기초부터 첫 홈페이지 만들기', outcome: 'HTML·CSS·JavaScript로 만든 반응형 소개 홈페이지', tools: 'VS Code와 Chrome', modules: ['웹과 개발 환경','HTML 문서 구조','제목·문단·링크','이미지와 목록','CSS 연결과 선택자','글자·색상·여백','Flex와 Grid','JavaScript 변수와 함수','클릭·폼 이벤트','반응형 점검과 공개'] },
  { programId: 'react-state-api', title: 'React 상태관리와 API 활용', outcome: '검색·필터·정렬과 외부 API가 동작하는 React 데이터 서비스', tools: 'React·Vite·Fetch API', modules: ['React 프로젝트 점검','컴포넌트와 props','useState와 입력','목록 검색','복합 필터','정렬과 페이지네이션','비동기와 fetch','로딩·오류·빈 상태','localStorage 저장','통합 테스트와 배포'] },
  { programId: 'node-backend', title: 'Node.js로 백엔드 시작하기', outcome: '입력 검증과 오류 처리가 적용된 교육자료 REST API', tools: 'Node.js·Express·API 도구', modules: ['서버와 개발 환경','Express 첫 실행','주소와 요청 방식','JSON 응답','목록 조회 API','상세 조회 API','등록 API와 검증','수정·삭제 API','오류·로그·보안','API 테스트와 문서화'] },
  { programId: 'supabase-database', title: 'Supabase로 데이터 저장하기', outcome: '관리자만 변경하고 누구나 조회할 수 있는 공동 교육자료 저장소', tools: 'Supabase·PostgreSQL·React', modules: ['데이터베이스 기본','테이블과 자료형','키와 관계','SELECT 조회','INSERT 등록','UPDATE와 DELETE','React 연결','Auth 로그인','RLS 권한 정책','백업·테스트·운영'] },
  { programId: 'codex-first-service', title: 'Codex로 첫 웹서비스 만들기', outcome: 'AI 요청·검토·수정 과정을 거쳐 배포한 첫 웹서비스', tools: 'Codex·React·GitHub', modules: ['Codex와 안전 규칙','좋은 요청문 구조','작업 범위와 완료 기준','React 첫 화면','데이터와 카드','검색·필터 기능','오류 전달과 수정','Git 변경 검토','GitHub 업로드','배포·발표·회고'] },
  { programId: 'web-security-infra-basic', title: '웹서비스 보안과 클라우드 인프라 입문', outcome: '계정·키·권한·네트워크·복구 항목을 갖춘 서비스 보안 점검서', tools: 'Chrome·GitHub·Supabase', modules: ['웹 보안의 기본','계정과 비밀번호','환경변수와 비밀 키','입력 검증','XSS와 안전한 출력','인증과 권한','RLS와 최소 권한','HTTPS·DNS·포트','로그와 모니터링','백업·복구·사고 대응'] },
  { programId: 'content-analytics-basic', title: '웹 콘텐츠 운영과 데이터 분석 기초', outcome: '독자 중심 콘텐츠 3편과 지표·개선 계획이 담긴 운영 보고서', tools: 'Codex·스프레드시트·분석 도구', modules: ['독자와 운영 목표','주제와 검색 의도','제목과 글 구조','이미지와 저작권','발행 체크리스트','콘텐츠 달력','조회·클릭·전환','데이터 정리와 시각화','개선 가설과 실험','성과 보고와 다음 계획'] },
  { programId: 'github-vercel', title: 'GitHub와 Vercel 배포 입문', outcome: '자동 배포와 운영 점검 절차를 갖춘 실제 웹사이트 URL', tools: 'Git·GitHub·Vercel', modules: ['Git 설치와 저장소','상태·추가·커밋','브랜치와 병합','GitHub 원격 연결','충돌과 안전한 복구','Vite 빌드 점검','Vercel 프로젝트 연결','환경변수와 보안','배포 로그와 오류 해결','실제 URL과 운영 인수'] },
]

const moduleExplanations = {
  '과정 목표와 아이디어 찾기': '교육이 끝났을 때 만들 결과와 해결하고 싶은 생활 속 불편을 연결해 후보 아이디어를 정합니다.',
  '사용자와 문제 정의': '누가 언제 어떤 어려움을 겪는지 관찰 사실로 적고 해결책을 섞지 않은 문제 문장을 만듭니다.',
  '인터뷰 질문 설계': '답을 유도하지 않는 열린 질문으로 사용자의 실제 행동·불편·대처 방법을 확인합니다.',
  '경쟁 서비스 조사': '비슷한 서비스의 대상·핵심 기능·장점·불편을 같은 기준표로 비교해 기회를 찾습니다.',
  '핵심 가치 제안': '우리 서비스가 특정 사용자에게 어떤 결과를 더 쉽거나 빠르게 주는지 한 문장으로 정리합니다.',
  'MVP 기능 우선순위': '첫 공개에 반드시 필요한 기능과 이후 기능을 나눠 4주 안에 검증할 제작 범위를 정합니다.',
  '사용자 여정 작성': '사용자가 서비스를 알게 된 순간부터 목표를 달성할 때까지 행동·생각·불편을 순서대로 그립니다.',
  '화면 목록과 흐름': '사용자 행동마다 필요한 화면과 이동 조건을 연결해 누락과 막힌 경로를 찾습니다.',
  '요구사항과 완료 기준': '기능의 입력·처리·출력·예외와 눈으로 확인할 수 있는 성공 조건을 함께 작성합니다.',
  '기획 발표와 인수 문서': '문제·사용자·범위·화면·일정·미완료 항목을 다른 사람이 이어서 작업할 수 있게 정리합니다.',
  'Figma 환경과 프레임': 'Figma 파일·페이지·프레임의 차이를 익히고 PC와 모바일 작업 영역을 정확한 크기로 만듭니다.',
  '색상과 대비': '주색·보조색·상태색을 정하고 글자와 배경의 명도 차이를 확인해 읽기 어려운 조합을 제거합니다.',
  '글자 체계': '제목·본문·설명·버튼의 크기와 굵기, 줄 간격을 단계화해 정보 우선순위를 보여줍니다.',
  '여백과 그리드': '일정한 간격 단위와 열 구조를 사용해 요소를 정렬하고 화면 크기가 달라도 질서를 유지합니다.',
  'Auto Layout': '내용 길이가 달라져도 카드와 버튼의 간격·정렬·크기가 자동으로 맞춰지도록 설정합니다.',
  '버튼과 입력 요소': '기본·마우스오버·선택·비활성·오류 상태를 만들어 사용자가 현재 상황을 알 수 있게 합니다.',
  '카드 컴포넌트': '반복되는 이미지·제목·설명·버튼을 하나의 컴포넌트로 만들고 속성만 바꿔 재사용합니다.',
  'PC 메인 화면': '헤더·대표 영역·핵심 콘텐츠·행동 버튼을 시선 흐름에 맞춰 한 화면으로 조립합니다.',
  '모바일 반응형 화면': '좁은 화면에서 열 수, 메뉴, 터치 영역, 글자 줄바꿈을 다시 설계해 가로 스크롤을 없앱니다.',
  '프로토타입과 개발 전달': '화면 이동을 연결하고 크기·색상·상태·에셋 정보를 개발자가 확인할 수 있게 공유합니다.',
  '웹과 개발 환경': '브라우저가 HTML·CSS·JavaScript 파일을 읽어 화면과 동작을 만드는 흐름을 이해하고 편집기를 준비합니다.',
  'HTML 문서 구조': 'doctype·html·head·body의 역할을 구분하고 브라우저가 읽을 수 있는 기본 문서를 작성합니다.',
  '제목·문단·링크': '내용의 의미에 맞는 제목 단계와 문단을 사용하고 링크 목적지가 분명한 이동 요소를 만듭니다.',
  '이미지와 목록': '이미지 주소와 대체 설명을 작성하고 순서 유무에 맞는 목록 태그로 반복 정보를 묶습니다.',
  'CSS 연결과 선택자': 'CSS 파일을 HTML에 연결하고 클래스 선택자로 원하는 요소에만 스타일 규칙을 적용합니다.',
  '글자·색상·여백': 'font·color·margin·padding을 구분해 읽기 편하고 요소 사이가 답답하지 않은 화면을 만듭니다.',
  'Flex와 Grid': 'Flex는 한 방향 정렬, Grid는 행과 열 배치에 사용해 카드와 메뉴 구조를 안정적으로 구성합니다.',
  'JavaScript 변수와 함수': '변수에 값을 기억하고 함수에 반복 작업을 묶어 입력에 따라 다른 결과를 만들게 합니다.',
  '클릭·폼 이벤트': '사용자의 클릭과 입력 변화를 감지해 화면 문구를 바꾸고 제출 전 필수값을 검사합니다.',
  '반응형 점검과 공개': '개발자 도구로 여러 너비를 검사하고 빌드 결과를 공개 주소에서 다시 확인합니다.',
  'React 프로젝트 점검': 'Vite 개발 서버, src 폴더, 진입 파일과 컴포넌트 연결을 확인해 수정 위치를 구분합니다.',
  '컴포넌트와 props': '화면을 재사용 부품으로 나누고 부모가 props로 제목·설명 같은 값을 자식에게 전달합니다.',
  'useState와 입력': 'useState가 현재 입력값을 기억하게 하고 onChange가 새 값을 상태에 반영하도록 연결합니다.',
  '목록 검색': '검색어를 소문자와 공백 정리 후 제목·설명과 비교해 일치하는 항목만 새 배열로 만듭니다.',
  '복합 필터': '전체 선택을 허용하면서 분야·난이도·상태 조건을 AND 방식으로 함께 적용합니다.',
  '정렬과 페이지네이션': '원본 배열을 복사해 정렬하고 전체 결과를 일정 개수로 잘라 현재 페이지 범위만 표시합니다.',
  '비동기와 fetch': 'fetch 요청이 끝날 때까지 기다린 뒤 응답 상태를 검사하고 JSON 데이터를 화면 상태에 저장합니다.',
  '로딩·오류·빈 상태': '요청 중, 실패, 결과 없음, 성공을 서로 다른 안내 화면으로 보여주고 재시도 방법을 제공합니다.',
  'localStorage 저장': '문자열만 저장하는 브라우저 보관함에 JSON으로 찜 목록을 넣고 시작할 때 안전하게 복원합니다.',
  '통합 테스트와 배포': '검색부터 상세 이동·저장·새로고침까지 사용자 흐름을 검사한 후 빌드와 공개 주소를 확인합니다.',
  '서버와 개발 환경': '서버는 요청을 받아 규칙에 따라 처리하고 응답하며 Node.js는 JavaScript를 서버에서 실행합니다.',
  'Express 첫 실행': 'Express 앱을 만들고 포트를 열어 브라우저 요청에 첫 문장을 응답하는 로컬 서버를 실행합니다.',
  '주소와 요청 방식': '자원 중심 URL과 조회 GET·등록 POST·수정 PATCH·삭제 DELETE의 목적을 구분합니다.',
  'JSON 응답': '서버 데이터를 키와 값 구조의 JSON으로 만들고 올바른 Content-Type과 상태 코드로 반환합니다.',
  '목록 조회 API': '쿼리 조건과 페이지 값을 검사해 여러 자료와 전체 개수 정보를 함께 응답합니다.',
  '상세 조회 API': '주소의 ID로 한 건을 찾고 존재하지 않으면 빈 성공 응답 대신 404 오류를 반환합니다.',
  '등록 API와 검증': '요청 본문의 필수값·자료형·길이를 서버에서 검사한 뒤 새 ID와 생성 시간을 저장합니다.',
  '수정·삭제 API': '대상 존재와 권한을 확인하고 허용된 항목만 수정하거나 삭제 후 알맞은 상태를 응답합니다.',
  '오류·로그·보안': '내부 오류 정보는 숨기고 요청 시각·경로·상태를 기록하며 입력 크기와 요청 횟수를 제한합니다.',
  'API 테스트와 문서화': '정상·경계·오류 입력을 반복 검사하고 주소·요청·응답 예시를 다른 개발자가 재현하게 기록합니다.',
  '데이터베이스 기본': '데이터베이스가 여러 사용자의 자료를 규칙에 따라 영구 저장하고 검색하는 역할을 이해합니다.',
  '테이블과 자료형': '한 종류의 자료를 테이블로 묶고 각 열에 text·number·date 등 허용할 값의 종류를 정합니다.',
  '키와 관계': '기본키로 각 행을 구분하고 외래키로 사용자·프로그램·교육자료 사이의 연결과 삭제 규칙을 정합니다.',
  'SELECT 조회': '필요한 열만 선택하고 where·order·limit을 사용해 조건·순서·개수를 제한합니다.',
  'INSERT 등록': '필수 열과 기본값을 확인해 새 행을 추가하고 반환된 ID와 오류를 반드시 검사합니다.',
  'UPDATE와 DELETE': 'where 조건 없는 전체 변경을 막고 대상 ID와 변경 권한을 확인한 뒤 수정·삭제합니다.',
  'React 연결': 'Supabase 클라이언트를 한 곳에서 만들고 로딩·데이터·오류 상태로 조회 결과를 화면에 표시합니다.',
  'Auth 로그인': '이메일과 비밀번호는 Auth가 확인하고 화면은 세션 유무에 따라 로그인·로그아웃 상태를 표시합니다.',
  'RLS 권한 정책': '모든 공개 테이블에 RLS를 켜고 공개 조회와 관리자 변경 조건을 데이터베이스에서 각각 제한합니다.',
  '백업·테스트·운영': '스키마와 초기 자료를 SQL로 보관하고 일반·관리자 계정으로 정책과 복구 절차를 시험합니다.',
  'Codex와 안전 규칙': 'AI가 수정할 폴더와 유지할 기능을 먼저 정하고 비밀정보·개인정보·파괴적 작업을 요청에서 제외합니다.',
  '좋은 요청문 구조': '프로젝트 위치, 목표, 작업 범위, 제외 범위, 완료 기준과 테스트를 순서대로 전달합니다.',
  '작업 범위와 완료 기준': '한 번에 확인 가능한 기능으로 나누고 사용자가 화면에서 판단할 구체적인 성공 조건을 씁니다.',
  'React 첫 화면': 'Vite 프로젝트를 실행한 뒤 컴포넌트와 CSS를 수정해 제목·설명·행동 버튼을 표시합니다.',
  '데이터와 카드': '반복 콘텐츠를 객체 배열에 두고 map과 props로 내용이 다른 동일 구조의 카드를 만듭니다.',
  '검색·필터 기능': '입력 상태와 선택 조건을 조합해 원본 자료를 바꾸지 않고 표시 목록을 계산합니다.',
  '오류 전달과 수정': '실행 명령·주소·재현 순서·첫 오류 문장을 제공하고 원인 설명과 최소 수정을 요청합니다.',
  'Git 변경 검토': 'git status와 diff로 요청 범위 밖 변경, 비밀 파일, 불필요한 생성물을 커밋 전에 확인합니다.',
  'GitHub 업로드': '원격 변경을 먼저 통합하고 의미 있는 커밋을 main에 올린 뒤 저장소에서 파일과 기록을 확인합니다.',
  '배포·발표·회고': '공개 URL에서 주요 흐름을 테스트하고 구현·미구현·보안·개선 항목을 발표 자료로 정리합니다.',
  '웹 보안의 기본': '보안의 목표를 기밀성·무결성·가용성으로 나누고 보호할 계정·데이터·서비스 자산을 식별합니다.',
  '계정과 비밀번호': '서비스마다 긴 고유 비밀번호와 다중 인증을 사용하고 공유 계정과 평문 메모를 피합니다.',
  '환경변수와 비밀 키': '브라우저 공개 설정과 서버 비밀 키를 구분하고 .env.local·배포 설정·Git 제외 규칙을 점검합니다.',
  '입력 검증': '길이·형식·허용값을 클라이언트와 서버에서 검사하고 예상하지 않은 값은 처리 전에 거부합니다.',
  'XSS와 안전한 출력': '사용자 입력을 HTML로 직접 실행하지 않고 React 기본 이스케이프와 안전한 출력 방식을 유지합니다.',
  '인증과 권한': '인증은 사용자 확인, 권한은 허용 작업 결정이며 로그인 여부만으로 관리자 작업을 허용하지 않습니다.',
  'RLS와 최소 권한': '사용자와 역할별로 필요한 행과 작업만 허용하고 service role 키를 브라우저에 노출하지 않습니다.',
  'HTTPS·DNS·포트': 'DNS가 도메인을 주소로 찾고 HTTPS가 통신을 암호화하며 방화벽은 필요한 포트만 허용합니다.',
  '로그와 모니터링': '비밀번호를 제외한 오류·접근·변경 기록을 모아 이상 징후를 찾고 담당자에게 알립니다.',
  '백업·복구·사고 대응': '백업 생성뿐 아니라 복원 시험을 하고 탐지·차단·복구·보고 순서와 담당자를 문서화합니다.',
  '독자와 운영 목표': '누가 어떤 문제를 해결하려 방문하는지 정하고 조회보다 신청·완료 같은 실제 운영 목표를 선택합니다.',
  '주제와 검색 의도': '독자가 검색한 말 뒤의 질문과 원하는 결과를 파악해 한 글에서 해결할 핵심 주제를 정합니다.',
  '제목과 글 구조': '핵심 답을 제목과 첫 문단에 두고 소제목·목록·예시로 길을 안내해 빠르게 읽게 합니다.',
  '이미지와 저작권': '직접 제작하거나 사용 허가된 이미지를 선택하고 출처·용량·대체 설명을 함께 관리합니다.',
  '발행 체크리스트': '오탈자·링크·모바일·접근성·작성일·담당자·행동 버튼을 확인한 뒤 공개합니다.',
  '콘텐츠 달력': '독자 질문과 운영 일정에 맞춰 주제·담당자·마감일·상태·재활용 계획을 한 표로 관리합니다.',
  '조회·클릭·전환': '조회는 노출, 클릭은 관심, 전환은 목표 달성이며 같은 기간과 기준으로 비교합니다.',
  '데이터 정리와 시각화': '중복과 빈 값을 정리하고 질문에 필요한 지표만 표와 단순 차트로 표현합니다.',
  '개선 가설과 실험': '관찰한 문제·바꿀 요소·예상 효과·측정 지표를 한 문장으로 적고 한 번에 한 요소를 시험합니다.',
  '성과 보고와 다음 계획': '목표·실행·수치·해석·한계·다음 행동을 연결해 재현 가능한 운영 보고서를 작성합니다.',
  'Git 설치와 저장소': 'Git 사용자 정보를 설정하고 프로젝트 폴더에 저장소를 만든 뒤 제외 파일을 먼저 정의합니다.',
  '상태·추가·커밋': 'status로 변경을 보고 필요한 파일만 staging한 뒤 한 가지 목적을 설명하는 커밋을 만듭니다.',
  '브랜치와 병합': '기능별 브랜치에서 작업하고 차이를 검토한 뒤 main에 병합해 안정된 기록을 유지합니다.',
  'GitHub 원격 연결': '로컬 저장소와 정확한 GitHub URL을 연결하고 pull로 원격 변경을 확인한 뒤 push합니다.',
  '충돌과 안전한 복구': '충돌 파일의 두 변경을 읽어 최종 내용을 직접 선택하고 빌드 후 병합을 계속합니다.',
  'Vite 빌드 점검': 'npm run build로 배포 파일을 만들고 base 경로·오류·자산 주소를 실제 배포 조건에 맞게 검사합니다.',
  'Vercel 프로젝트 연결': 'GitHub 저장소를 가져와 프레임워크·빌드 명령·출력 폴더를 확인하고 첫 배포를 실행합니다.',
  '환경변수와 보안': '배포 환경별 공개값과 서버 비밀값을 Vercel 설정에 분리하고 로그와 Git 노출을 점검합니다.',
  '배포 로그와 오류 해결': '실패한 단계의 첫 오류를 찾아 로컬에서 재현하고 수정 커밋 후 새 배포 결과를 확인합니다.',
  '실제 URL과 운영 인수': '공개 URL의 메뉴·새로고침·모바일·오류 화면을 검사하고 배포·복구·담당 정보를 인수 문서에 남깁니다.',
}

const exactModuleLessons = {
  '웹과 개발 환경': {
    codes: ['<!-- 브라우저는 위에서 아래로 HTML을 읽습니다. -->\n<h1>첫 웹페이지</h1>', '<!doctype html>\n<html lang="ko"><body><h1>첫 웹페이지</h1></body></html>', '<h1>우리 동네 배움터</h1>\n<p>처음 만드는 소개 홈페이지입니다.</p>'],
    question: 'HTML 파일을 화면으로 해석하는 프로그램은 무엇인가요?', answer: 'Chrome 같은 웹브라우저입니다.',
  },
  'HTML 문서 구조': {
    codes: ['<!doctype html>\n<html lang="ko">\n<head></head>\n<body></body>\n</html>', '<head>\n  <meta charset="UTF-8" />\n  <title>EDU</title>\n</head>', '<body>\n  <header><h1>EDU</h1></header>\n  <main><p>교육을 시작합니다.</p></main>\n</body>'],
    question: '사용자에게 보이는 내용은 어느 태그 안에 작성하나요?', answer: 'body 태그 안에 작성합니다.',
  },
  '제목·문단·링크': {
    codes: ['<h1>가장 중요한 제목</h1>\n<h2>하위 주제</h2>', '<p>초보자도 천천히 따라 할 수 있습니다.</p>\n<a href="courses.html">과정 보기</a>', '<section>\n  <h2>웹 기초 과정</h2>\n  <p>HTML부터 시작합니다.</p>\n  <a href="#apply">수강 신청</a>\n</section>'],
    question: '한 페이지의 핵심 제목에 주로 사용하는 태그는 무엇인가요?', answer: 'h1 태그이며 보통 페이지의 핵심 제목에 한 번 사용합니다.',
  },
  '이미지와 목록': {
    codes: ['<img src="classroom.webp" alt="노트북으로 웹을 배우는 수강생" />', '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>', '<figure>\n  <img src="result.webp" alt="완성된 반응형 홈페이지" />\n  <figcaption>4주차 완성 결과</figcaption>\n</figure>'],
    question: '이미지를 볼 수 없는 사용자에게 의미를 전달하는 속성은 무엇인가요?', answer: 'alt 대체 설명 속성입니다.',
  },
  'CSS 연결과 선택자': {
    codes: ['<link rel="stylesheet" href="styles.css" />', '.lesson-card {\n  background: white;\n}', '.program-card h2 { color: #4f5fff; }\n.program-card a { font-weight: 700; }'],
    question: '여러 요소에 반복해서 스타일을 적용할 때 주로 사용하는 선택자는 무엇인가요?', answer: '점(.)으로 시작하는 클래스 선택자입니다.',
  },
  '글자·색상·여백': {
    codes: ['body { color: #172033; background: #f7f8fc; }', '.card {\n  padding: 24px;\n  margin-bottom: 20px;\n  line-height: 1.7;\n}', '.hero h1 { font-size: 48px; }\n.hero p { max-width: 620px; color: #596477; }'],
    question: 'padding과 margin의 차이는 무엇인가요?', answer: 'padding은 상자 안쪽 여백이고 margin은 상자 바깥쪽 여백입니다.',
  },
  'Flex와 Grid': {
    codes: ['.menu { display: flex; gap: 16px; }', '.card-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}', '.page { display: grid; grid-template-columns: 240px 1fr; gap: 32px; }'],
    question: '여러 줄의 카드 행과 열을 배치할 때 적합한 CSS 기능은 무엇인가요?', answer: 'CSS Grid가 적합합니다.',
  },
  'JavaScript 변수와 함수': {
    codes: ["const courseName = '웹 기초'\nconsole.log(courseName)", "function welcome(name) {\n  return `${name}님, 환영합니다.`\n}\nconsole.log(welcome('홍길동'))", "const programs = ['HTML', 'CSS', 'JavaScript']\nconst titles = programs.map(item => `${item} 시작하기`)\nconsole.log(titles)"],
    question: '같은 계산이나 동작을 이름 붙여 반복 사용하는 것은 무엇인가요?', answer: '함수입니다.',
  },
  '클릭·폼 이벤트': {
    codes: ["const button = document.querySelector('button')\nbutton.addEventListener('click', () => alert('시작합니다.'))", "const nameInput = document.querySelector('#name')\nnameInput.addEventListener('input', event => console.log(event.target.value))", "form.addEventListener('submit', event => {\n  event.preventDefault()\n  if (!nameInput.value.trim()) error.textContent = '이름을 입력해 주세요.'\n})"],
    question: '폼을 검사하기 전에 기본 제출과 새로고침을 막는 메서드는 무엇인가요?', answer: 'event.preventDefault()입니다.',
  },
  '반응형 점검과 공개': {
    codes: ['@media (max-width: 680px) {\n  .card-grid { grid-template-columns: 1fr; }\n}', '<meta name="viewport" content="width=device-width, initial-scale=1" />', 'npm run build\n# dist 폴더가 생성되는지 확인합니다.'],
    question: '모바일 화면 규칙을 적용하는 CSS 조건은 무엇인가요?', answer: '@media 미디어 쿼리입니다.',
  },
  '서버와 개발 환경': {
    codes: ["console.log('Node.js에서 실행됩니다.')", "const http = require('node:http')\nhttp.createServer((req, res) => res.end('Hello')).listen(3000)", 'node server.js\n# 브라우저에서 http://localhost:3000 확인'],
    question: 'Node.js 서버가 브라우저에 돌려주는 결과를 무엇이라고 하나요?', answer: '응답(response)이라고 합니다.',
  },
  'Express 첫 실행': {
    codes: ["import express from 'express'\nconst app = express()", "app.get('/', (req, res) => res.send('EDU API'))\napp.listen(3000)", "app.get('/health', (req, res) => res.json({ ok: true }))\napp.listen(3000, () => console.log('3000번 포트 실행'))"],
    question: 'Express 서버를 특정 포트에서 기다리게 하는 메서드는 무엇인가요?', answer: 'app.listen()입니다.',
  },
  '주소와 요청 방식': {
    codes: ["app.get('/api/lessons', listLessons)", "app.post('/api/lessons', createLesson)\napp.patch('/api/lessons/:id', updateLesson)", "app.delete('/api/lessons/:id', deleteLesson)\n// URL에는 동사 대신 lessons 자원을 씁니다."],
    question: '기존 자료 일부를 수정할 때 주로 사용하는 요청 방식은 무엇인가요?', answer: 'PATCH 요청을 사용합니다.',
  },
  'JSON 응답': {
    codes: ["res.json({ message: '연결되었습니다.' })", "res.status(200).json([{ id: 1, title: 'HTML 시작' }])", "res.status(201).json({ id: 2, title: 'CSS 시작', createdAt: new Date().toISOString() })"],
    question: '새 자료 등록 성공에 주로 사용하는 HTTP 상태 코드는 무엇인가요?', answer: '201 Created입니다.',
  },
  '목록 조회 API': {
    codes: ["app.get('/api/lessons', (req, res) => res.json(lessons))", "const keyword = String(req.query.q || '').trim()\nconst found = lessons.filter(item => item.title.includes(keyword))", "const page = Math.max(1, Number(req.query.page) || 1)\nres.json({ items: found.slice((page - 1) * 10, page * 10), total: found.length })"],
    question: '검색 조건처럼 URL 뒤에 전달하는 값은 어디에서 읽나요?', answer: 'Express의 req.query에서 읽습니다.',
  },
  '상세 조회 API': {
    codes: ["app.get('/api/lessons/:id', (req, res) => {})", "const lesson = lessons.find(item => item.id === req.params.id)\nif (!lesson) return res.status(404).json({ message: '자료가 없습니다.' })", "app.get('/api/lessons/:id', (req, res) => {\n  const item = lessons.find(v => v.id === req.params.id)\n  return item ? res.json(item) : res.status(404).json({ message: '자료가 없습니다.' })\n})"],
    question: '요청한 자료가 존재하지 않을 때 사용하는 상태 코드는 무엇인가요?', answer: '404 Not Found입니다.',
  },
  '등록 API와 검증': {
    codes: ["app.use(express.json())", "const title = String(req.body.title || '').trim()\nif (!title || title.length > 100) return res.status(400).json({ message: '제목을 확인해 주세요.' })", "app.post('/api/lessons', (req, res) => {\n  const item = { id: crypto.randomUUID(), title: req.body.title.trim() }\n  lessons.push(item)\n  res.status(201).json(item)\n})"],
    question: '사용자가 보낸 JSON 본문은 Express의 어디에서 읽나요?', answer: 'express.json() 적용 후 req.body에서 읽습니다.',
  },
  '수정·삭제 API': {
    codes: ["app.patch('/api/lessons/:id', updateLesson)", "const index = lessons.findIndex(item => item.id === req.params.id)\nif (index < 0) return res.status(404).json({ message: '자료가 없습니다.' })", "app.delete('/api/lessons/:id', (req, res) => {\n  const index = lessons.findIndex(v => v.id === req.params.id)\n  if (index < 0) return res.status(404).end()\n  lessons.splice(index, 1)\n  res.status(204).end()\n})"],
    question: '삭제 성공 후 응답 본문이 없을 때 사용할 수 있는 상태 코드는 무엇인가요?', answer: '204 No Content입니다.',
  },
  '오류·로그·보안': {
    codes: ["app.use((req, res, next) => {\n  console.log(new Date().toISOString(), req.method, req.path)\n  next()\n})", "app.use(express.json({ limit: '20kb' }))", "app.use((error, req, res, next) => {\n  console.error(error)\n  res.status(500).json({ message: '서버 오류가 발생했습니다.' })\n})"],
    question: '서버 내부 오류 내용을 사용자에게 그대로 보내면 안 되는 이유는 무엇인가요?', answer: '파일 경로나 구조 같은 공격에 유용한 정보가 노출될 수 있기 때문입니다.',
  },
  'API 테스트와 문서화': {
    codes: ["fetch('http://localhost:3000/api/lessons').then(res => res.json()).then(console.log)", "curl -i -X POST http://localhost:3000/api/lessons -H 'Content-Type: application/json' -d '{\"title\":\"HTML\"}'", "// GET /api/lessons/:id\n// 200: 자료 객체\n// 404: { message: '자료가 없습니다.' }"],
    question: 'API 문서에 반드시 포함해야 하는 세 가지는 무엇인가요?', answer: '요청 주소와 방식, 입력 예시, 성공·오류 응답 예시입니다.',
  },
  '데이터베이스 기본': {
    codes: ['-- 한 행은 교육자료 한 건입니다.\nselect id, title from edu_lessons;', 'select title, category\nfrom edu_lessons\norder by created_at desc;', 'select category, count(*) as lesson_count\nfrom edu_lessons\ngroup by category;'],
    question: '테이블에서 자료 한 건을 무엇이라고 하나요?', answer: '행(row)이라고 합니다.',
  },
  '테이블과 자료형': {
    codes: ['create table edu_lessons (\n  id bigint generated always as identity primary key,\n  title text not null\n);', 'alter table edu_lessons\nadd column duration_minutes integer check (duration_minutes > 0);', "insert into edu_lessons (title, duration_minutes)\nvalues ('HTML 시작', 30);"],
    question: '값이 반드시 있어야 하는 열에 사용하는 제약조건은 무엇인가요?', answer: 'not null 제약조건입니다.',
  },
  '키와 관계': {
    codes: ['create table edu_programs (\n  id uuid primary key default gen_random_uuid(),\n  title text not null\n);', 'create table edu_lessons (\n  id uuid primary key default gen_random_uuid(),\n  program_id uuid references edu_programs(id)\n);', 'alter table edu_lessons\ndrop constraint edu_lessons_program_id_fkey,\nadd foreign key (program_id) references edu_programs(id) on delete cascade;'],
    question: '다른 테이블의 기본키를 가리키는 열을 무엇이라고 하나요?', answer: '외래키(foreign key)라고 합니다.',
  },
  'SELECT 조회': {
    codes: ['select id, title from edu_lessons;', "select * from edu_lessons\nwhere category = '웹 기초'\norder by title;", "select id, title from edu_lessons\nwhere title ilike '%React%'\nlimit 10;"],
    question: '대소문자를 구분하지 않고 일부 문자열을 찾는 PostgreSQL 연산자는 무엇인가요?', answer: 'ilike 연산자입니다.',
  },
  'INSERT 등록': {
    codes: ["insert into edu_lessons (title) values ('HTML 시작');", "insert into edu_lessons (title, category)\nvalues ('CSS 카드', '웹 기초')\nreturning id, title;", "insert into edu_lessons (title, category)\nvalues ('React 상태', '프런트엔드'), ('SQL 조회', '데이터베이스')\nreturning *;"],
    question: '등록된 행의 ID를 즉시 확인하는 PostgreSQL 문구는 무엇인가요?', answer: 'returning 절입니다.',
  },
  'UPDATE와 DELETE': {
    codes: ["update edu_lessons set title = 'HTML 첫 화면' where id = 1;", "update edu_lessons\nset title = 'CSS 카드 꾸미기', updated_at = now()\nwhere id = 2\nreturning *;", "delete from edu_lessons\nwhere id = 3\nreturning id;"],
    question: '수정과 삭제에서 반드시 확인해야 하는 조건절은 무엇인가요?', answer: '대상을 제한하는 where 절입니다.',
  },
  'React 연결': {
    codes: ["import { createClient } from '@supabase/supabase-js'\nexport const supabase = createClient(url, publishableKey)", "const { data, error } = await supabase\n  .from('edu_lessons')\n  .select('id,title,category')", "useEffect(() => {\n  supabase.from('edu_lessons').select('*')\n    .then(({ data, error }) => error ? setError(error.message) : setLessons(data))\n}, [])"],
    question: '브라우저에서 사용할 수 있지만 RLS로 제한해야 하는 키는 무엇인가요?', answer: 'Supabase publishable key입니다.',
  },
  'Auth 로그인': {
    codes: ["const { data, error } = await supabase.auth.signInWithPassword({ email, password })", "const { data: { session } } = await supabase.auth.getSession()", "await supabase.auth.signOut()\nsetUser(null)\nlocation.hash = '#/admin'"],
    question: '비밀번호를 애플리케이션 코드가 직접 저장해야 하나요?', answer: '아니요. Supabase Auth가 안전하게 처리하며 코드와 localStorage에 저장하지 않습니다.',
  },
  'RLS 권한 정책': {
    codes: ['alter table public.edu_lessons enable row level security;', 'create policy "public read lessons"\non public.edu_lessons for select\nusing (true);', 'create policy "admin changes lessons"\non public.edu_lessons for all to authenticated\nusing (public.is_admin())\nwith check (public.is_admin());'],
    question: '관리자 버튼을 숨기는 것만으로 데이터가 보호되나요?', answer: '아니요. 데이터베이스의 RLS 정책에서도 변경을 차단해야 합니다.',
  },
  '백업·테스트·운영': {
    codes: ['-- schema.sql에 테이블과 정책을 기록합니다.\nselect tablename, rowsecurity from pg_tables where schemaname = \'public\';', '-- 일반 사용자로 변경이 거부되는지 시험합니다.\nselect * from edu_lessons limit 3;', '-- 복원 확인\nselect count(*) as lessons, max(updated_at) as last_update\nfrom edu_lessons;'],
    question: '백업이 실제로 유효한지 확인하는 방법은 무엇인가요?', answer: '별도 환경에서 복원을 실행하고 자료와 권한을 확인해야 합니다.',
  },
  'Git 설치와 저장소': {
    codes: ['git --version\ngit config --global user.name', 'git init\ngit status', 'git init\nAdd-Content .gitignore ".env.local"\ngit status --short'],
    question: 'Git 저장소를 현재 폴더에 만드는 명령은 무엇인가요?', answer: 'git init입니다.',
  },
  '상태·추가·커밋': {
    codes: ['git status --short\ngit diff --stat', 'git add src README.md\ngit diff --cached', 'git commit -m "Add education program page"\ngit log -1 --oneline'],
    question: '커밋에 들어갈 변경을 미리 보는 명령은 무엇인가요?', answer: 'git diff --cached입니다.',
  },
  '브랜치와 병합': {
    codes: ['git branch --show-current\ngit switch -c feature/lesson-search', 'git add .\ngit commit -m "Add lesson search"\ngit switch main', 'git merge --no-ff feature/lesson-search\ngit log --oneline --graph -5'],
    question: '새 브랜치를 만들면서 이동하는 명령은 무엇인가요?', answer: 'git switch -c 브랜치이름입니다.',
  },
  'GitHub 원격 연결': {
    codes: ['git remote -v', 'git remote add origin https://github.com/USER/REPO.git\ngit remote -v', 'git pull --rebase origin main\ngit push -u origin main'],
    question: '원격 변경이 있을 때 강제 푸시보다 먼저 할 일은 무엇인가요?', answer: 'git pull 또는 fetch로 원격 기록을 확인하고 안전하게 통합합니다.',
  },
  '충돌과 안전한 복구': {
    codes: ['git status\n# both modified로 표시된 파일을 확인합니다.', 'git diff --name-only --diff-filter=U\n# <<<<<<<, =======, >>>>>>> 구간을 직접 정리합니다.', 'git add src/App.jsx\ngit rebase --continue\nnpm run build'],
    question: '충돌 해결 후 가장 먼저 해야 할 검증은 무엇인가요?', answer: '충돌 표시가 제거됐는지 확인하고 프로젝트 빌드와 주요 기능을 시험합니다.',
  },
  'Vite 빌드 점검': {
    codes: ['npm install\nnpm run dev', 'npm run build\nGet-ChildItem dist', "export default defineConfig({\n  base: '/edu/',\n  plugins: [react()],\n})"],
    question: 'GitHub Pages의 하위 저장소 경로에 필요한 Vite 설정은 무엇인가요?', answer: "vite.config.js의 base를 '/저장소이름/'으로 설정합니다.",
  },
  'Vercel 프로젝트 연결': {
    codes: ['npm run build\n# Framework Preset: Vite', '# Build Command\nnpm run build\n# Output Directory\ndist', '{\n  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]\n}'],
    question: 'Vite 프로젝트의 기본 배포 결과 폴더는 무엇인가요?', answer: 'dist 폴더입니다.',
  },
  '환경변수와 보안': {
    codes: ['# .env.example\nVITE_PUBLIC_API_URL=', '# .gitignore\n.env\n.env.local\n.env.*.local', 'git ls-files | Select-String -Pattern "env|key|secret"\ngit diff --cached'],
    question: 'VITE_로 시작하는 값에 비밀 키를 넣으면 안 되는 이유는 무엇인가요?', answer: '빌드된 브라우저 JavaScript에 포함되어 방문자가 확인할 수 있기 때문입니다.',
  },
  '배포 로그와 오류 해결': {
    codes: ['npm ci\nnpm run build', 'git log -1 --oneline\ngit status --short\n# 배포 로그의 첫 오류와 비교합니다.', 'git revert <문제-커밋-ID>\ngit push origin main'],
    question: '긴 배포 로그에서 우선 확인할 부분은 어디인가요?', answer: '실패한 단계에 나온 첫 번째 실제 오류 문장입니다.',
  },
  '실제 URL과 운영 인수': {
    codes: ['# 공개 주소 점검\nhttps://example.vercel.app/', 'curl -I https://example.vercel.app/\n# 200 상태와 HTTPS를 확인합니다.', '# 운영 인수 항목\n# 저장소 / 배포 주소 / 환경변수 이름 / 복구 순서 / 담당자'],
    question: '배포 완료 판단을 로컬 화면만으로 하면 안 되는 이유는 무엇인가요?', answer: '실제 URL의 경로·환경변수·캐시·HTTPS 조건은 로컬과 다를 수 있기 때문입니다.',
  },
  '웹 보안의 기본': {
    codes: ['// 보호 대상 목록\nconst assets = [\'계정\', \'개인정보\', \'서비스 운영\']', '// 기밀성·무결성·가용성 점검\nconst securityGoals = { secret: true, accurate: true, available: true }', '// 위험 = 발생 가능성 × 영향\nconst riskScore = likelihood * impact'],
    question: '정보보안의 세 가지 기본 목표는 무엇인가요?', answer: '기밀성, 무결성, 가용성입니다.',
  },
  '계정과 비밀번호': {
    codes: ['// 실제 비밀번호를 코드에 쓰지 않습니다.\nconst minimumLength = 14', '// 계정마다 다른 비밀번호와 MFA를 사용합니다.\nconst mfaEnabled = true', '// 관리자 계정 점검표\nconst checks = [\'고유 비밀번호\', \'MFA\', \'복구 수단\', \'최근 로그인\']'],
    question: '같은 비밀번호를 여러 서비스에서 사용하면 안 되는 이유는 무엇인가요?', answer: '한 서비스 유출이 다른 계정의 연쇄 침해로 이어질 수 있기 때문입니다.',
  },
  '환경변수와 비밀 키': {
    codes: ['# 공개 설정 예시\nVITE_SUPABASE_URL=https://project.supabase.co', '# 서버 전용 비밀은 호스팅 환경변수에만 저장\nOPENAI_API_KEY=실제값을_코드에_쓰지_않음', 'git check-ignore .env.local\ngit grep -n -i "service_role\|password\|private_key"'],
    question: 'Supabase service role 키를 브라우저에 넣으면 안 되는 이유는 무엇인가요?', answer: 'RLS를 우회하는 강한 권한이 노출되어 모든 데이터가 위험해질 수 있기 때문입니다.',
  },
  '입력 검증': {
    codes: ["const title = String(input.title || '').trim()", "if (!title || title.length > 100) throw new Error('제목은 1~100자입니다.')", "const allowed = ['웹 기초', '프런트엔드']\nif (!allowed.includes(category)) return res.status(400).json({ message: '분야를 확인하세요.' })"],
    question: '클라이언트에서 검사했더라도 서버에서 다시 검사해야 하는 이유는 무엇인가요?', answer: '사용자가 브라우저 검사를 우회해 서버로 직접 요청할 수 있기 때문입니다.',
  },
  'XSS와 안전한 출력': {
    codes: ['const message = <p>{userInput}</p>\n// React는 기본적으로 텍스트를 이스케이프합니다.', "element.textContent = userInput\n// innerHTML 대신 textContent를 사용합니다.", "// 신뢰할 수 없는 HTML에는 dangerouslySetInnerHTML을 사용하지 않습니다.\nreturn <article>{content}</article>"],
    question: '사용자 입력을 화면에 표시할 때 innerHTML보다 안전한 속성은 무엇인가요?', answer: 'textContent이며 React에서는 일반 JSX 중괄호 출력이 기본 이스케이프됩니다.',
  },
  '인증과 권한': {
    codes: ['const { data: { user } } = await supabase.auth.getUser()', "if (!user) return res.status(401).json({ message: '로그인이 필요합니다.' })", "if (!profile.is_admin) return res.status(403).json({ message: '관리자 권한이 필요합니다.' })"],
    question: '401과 403의 차이는 무엇인가요?', answer: '401은 로그인 확인 실패, 403은 로그인했지만 해당 작업 권한이 없는 경우입니다.',
  },
  'RLS와 최소 권한': {
    codes: ['alter table edu_lessons enable row level security;', 'create policy "read lessons" on edu_lessons\nfor select using (true);', 'create policy "admin update" on edu_lessons\nfor update to authenticated\nusing (is_admin()) with check (is_admin());'],
    question: '최소 권한 원칙은 무엇인가요?', answer: '사용자와 프로그램에 업무 수행에 꼭 필요한 권한만 주는 원칙입니다.',
  },
  'HTTPS·DNS·포트': {
    codes: ['nslookup example.com\n# 도메인이 가리키는 주소를 확인합니다.', 'curl -I https://example.com\n# HTTPS와 응답 상태를 확인합니다.', '# 방화벽 허용 예\n80/tcp  → HTTPS로 이동\n443/tcp → 웹서비스\n22/tcp  → 지정 관리자 IP만'],
    question: '일반 HTTPS 웹서비스가 사용하는 기본 포트는 무엇인가요?', answer: '443번 포트입니다.',
  },
  '로그와 모니터링': {
    codes: ["console.info({ time: new Date().toISOString(), method: req.method, path: req.path })", "console.warn({ event: 'login_failed', userId, ip: req.ip })\n// 비밀번호는 기록하지 않습니다.", "if (errorRate > 0.05) notifyOperator('오류율이 5%를 넘었습니다.')"],
    question: '로그에 비밀번호나 토큰을 기록하면 안 되는 이유는 무엇인가요?', answer: '로그 접근자나 외부 시스템을 통해 인증정보가 다시 노출될 수 있기 때문입니다.',
  },
  '백업·복구·사고 대응': {
    codes: ['# 백업 기록\nbackup_date=2026-08-27\nretention_days=30', '# 복구 시험\n1. 별도 환경 복원\n2. 행 수 확인\n3. 로그인·권한 확인\n4. 결과 기록', '# 사고 대응\n1. 탐지·기록\n2. 접근 차단\n3. 영향 조사\n4. 복구·통지\n5. 재발 방지'],
    question: '백업 파일만 만들고 복원 시험을 하지 않으면 안 되는 이유는 무엇인가요?', answer: '백업이 손상되었거나 필요한 데이터와 권한이 빠졌는지 실제 사고 전에 알 수 없기 때문입니다.',
  },
  '과정 목표와 아이디어 찾기': {
    codes: ['최종 결과: 한 장 웹서비스 기획서\n대상: 코딩 초보 성인\n기간: 4주\n제외: 결제·회원가입', '불편 관찰표\n- 상황: 외출 전 볼거리를 찾을 때\n- 현재 행동: 여러 사이트 검색\n- 불편: 시간이 오래 걸림', '아이디어 후보 평가\n1. 자주 발생하는가?\n2. 대상이 분명한가?\n3. 4주 안에 시험 가능한가?'],
    question: '좋은 첫 프로젝트 아이디어의 중요한 조건은 무엇인가요?', answer: '대상과 문제가 분명하고 정해진 기간 안에 작은 결과로 시험할 수 있어야 합니다.',
  },
  '사용자와 문제 정의': {
    codes: ['사용자: 퇴근 후 짧게 쉴 콘텐츠를 찾는 직장인\n상황: 평일 저녁 9시\n불편: 선택에 20분 이상 사용', '문제 문장\n[사용자]는 [상황]에서 [어려움]을 겪는다.\n현재 [대처]하지만 [한계]가 있다.', '확정 문제\n퇴근한 직장인은 짧게 볼 작품을 고를 때 정보가 많아 선택에 시간이 오래 걸린다.'],
    question: '문제 정의 문장에 해결 기능을 먼저 넣으면 안 되는 이유는 무엇인가요?', answer: '특정 해결책에 갇혀 사용자의 실제 문제와 다른 가능성을 놓칠 수 있기 때문입니다.',
  },
  '인터뷰 질문 설계': {
    codes: ['피할 질문: 추천 서비스가 있으면 쓰실 건가요?\n좋은 질문: 최근 작품을 고른 과정을 순서대로 말씀해 주세요.', '인터뷰 질문\n1. 마지막으로 언제 찾았나요?\n2. 가장 오래 걸린 단계는?\n3. 포기한 적은?\n4. 무엇을 기준으로 골랐나요?', '인터뷰 기록\n사실 / 직접 인용 / 해석을 세 열로 분리\n해석은 인터뷰 종료 후 작성'],
    question: '사용자의 실제 행동을 확인하기 좋은 질문 방식은 무엇인가요?', answer: '가상의 미래보다 최근 실제 경험과 행동 순서를 묻는 열린 질문입니다.',
  },
  '경쟁 서비스 조사': {
    codes: ['비교 기준\n대상 | 첫 화면 | 핵심 기능 | 가격 | 불편', '서비스 A\n- 장점: 검색이 빠름\n- 불편: 필터가 복잡함\n- 기회: 초보자용 선택 단순화', '차별화 문장\n많은 결과 대신 조건에 맞는 3개만 보여주고 선택 이유를 쉽게 설명한다.'],
    question: '경쟁 서비스 조사의 목적은 기능을 그대로 복사하는 것인가요?', answer: '아니요. 공통 기준으로 장단점과 아직 해결되지 않은 기회를 찾는 것입니다.',
  },
  '핵심 가치 제안': {
    codes: ['[사용자]에게\n[문제]를 해결하도록\n[핵심 결과]를 제공한다.', '퇴근 후 선택이 어려운 사람에게\n취향·시간 조건에 맞는 작품 3개를\n1분 안에 비교하도록 돕는다.', '가치 검증 질문\n- 결과가 구체적인가?\n- 기존 방법보다 나은 점은?\n- 사용자가 이해하는 말인가?'],
    question: '가치 제안에는 기능 목록보다 무엇이 먼저 보여야 하나요?', answer: '사용자가 얻는 구체적인 결과와 기존 방법보다 나은 점이 먼저 보여야 합니다.',
  },
  'MVP 기능 우선순위': {
    codes: ['Must: 검색·조건·결과 3개\nShould: 찜\nCould: 공유\nWon\'t: 로그인·결제', '우선순위 점수 = 사용자 가치 5 + 검증 필요 5 - 개발 난이도 3', '첫 MVP 범위\n입력: 검색어·장르·평점\n출력: 카드 3개\n저장: localStorage 찜'],
    question: 'MVP에서 Won’t 항목을 명시하는 이유는 무엇인가요?', answer: '이번 제작 범위를 지키고 중요하지 않은 기능으로 일정이 늘어나는 것을 막기 위해서입니다.',
  },
  '사용자 여정 작성': {
    codes: ['단계: 발견 → 방문 → 입력 → 비교 → 저장\n각 단계에 행동·생각·불편 기록', '입력 단계\n행동: 장르 선택\n생각: 어떤 장르가 맞지?\n불편: 선택지가 너무 많음', '개선 기회\n장르를 쉬운 분위기 표현과 함께 제공하고 기본값을 안내한다.'],
    question: '사용자 여정에는 화면 이름 외에 무엇을 함께 기록하나요?', answer: '단계별 사용자 행동, 생각, 감정 또는 불편과 개선 기회를 기록합니다.',
  },
  '화면 목록과 흐름': {
    codes: ['화면 목록\n홈 / 검색 결과 / 상세 / 찜 / 오류 안내', '흐름\n홈 입력 → 결과 3개 → 상세 확인 → 찜\n결과 없음 → 조건 수정 안내', '예외 흐름\n잘못된 주소 → 404 안내 → 홈\nAPI 실패 → 오류 문구 → 다시 시도'],
    question: '정상 화면만 설계하면 안 되는 이유는 무엇인가요?', answer: '결과 없음·오류·잘못된 주소 같은 상황에서 사용자가 다음 행동을 할 수 없기 때문입니다.',
  },
  '요구사항과 완료 기준': {
    codes: ['요구사항\n사용자는 장르를 하나 선택할 수 있다.\n전체를 선택하면 모든 자료를 표시한다.', '입력: 장르 ID\n처리: 일치 항목 filter\n출력: 카드와 결과 수\n예외: 결과가 없으면 안내', '완료 기준\n- 선택 즉시 목록 변경\n- 전체 선택 정상\n- 결과 수 표시\n- 모바일 잘림 없음'],
    question: '좋은 완료 기준은 어떤 방식으로 작성해야 하나요?', answer: '구현 방법보다 사용자가 화면과 동작에서 직접 확인할 수 있는 조건으로 작성합니다.',
  },
  '기획 발표와 인수 문서': {
    codes: ['발표 5분\n1. 사용자 문제\n2. MVP\n3. 화면 흐름\n4. 시연\n5. 다음 단계', '인수 문서\n목표 / 실행 방법 / 데이터 위치 / 테스트 / 보안 / 미완료', '개발 시작 요청\n프로젝트 위치:\n오늘 범위:\n유지 기능:\n제외 범위:\n완료 기준:'],
    question: '인수 문서에 미완료 항목을 적어야 하는 이유는 무엇인가요?', answer: '다음 담당자가 완성된 기능으로 오해하지 않고 우선순위와 위험을 정확히 판단할 수 있기 때문입니다.',
  },
  'Figma 환경과 프레임': {
    codes: ['파일 구조\nPage 01 Foundations\nPage 02 Components\nPage 03 Screens', 'Desktop Frame: 1440 × 1024\nMobile Frame: 390 × 844\nLayout Grid: 12 columns', '레이어 이름\nHeader/Desktop\nHero/Desktop\nProgramCard/Default'],
    question: '웹페이지 한 화면의 작업 영역을 Figma에서 무엇으로 만드나요?', answer: 'Frame으로 만듭니다.',
  },
  '색상과 대비': {
    codes: ['Primary #5B61F6\nText #172033\nBackground #F7F8FC\nError #C73B45', '본문 대비 점검\n#596477 on #FFFFFF\n작은 글자 WCAG AA 4.5:1 이상 확인', 'Color Styles\nBrand/Primary\nText/Strong\nText/Muted\nSurface/Soft\nState/Error'],
    question: '작은 일반 글자의 권장 최소 명도 대비는 얼마인가요?', answer: 'WCAG AA 기준으로 4.5:1 이상입니다.',
  },
  '글자 체계': {
    codes: ['Display 48/60 Bold\nH1 36/46 Bold\nH2 28/38 Bold\nBody 16/28 Regular', '모바일\nH1 32/40\nH2 24/34\nBody 16/27\nCaption 13/20', 'Text Styles\nHeading/1\nHeading/2\nBody/Default\nBody/Small\nButton/Label'],
    question: '글자 크기와 함께 반드시 정해야 읽기 편한 값은 무엇인가요?', answer: '줄 간격(line height)과 굵기입니다.',
  },
  '여백과 그리드': {
    codes: ['Spacing Scale\n4 / 8 / 12 / 16 / 24 / 32 / 48 / 64', 'Desktop Grid\n12 columns\nMargin 80\nGutter 24\nContent max 1200', 'Mobile Grid\n4 columns\nMargin 20\nGutter 16\nSection gap 64'],
    question: '여백 값을 일정한 단위로 제한하는 이유는 무엇인가요?', answer: '화면 전체의 정렬과 리듬을 일관되게 유지하고 수정하기 쉽게 만들기 위해서입니다.',
  },
  'Auto Layout': {
    codes: ['Card Auto Layout\nDirection: Vertical\nGap: 16\nPadding: 24\nWidth: Fill container', 'Button Auto Layout\nDirection: Horizontal\nGap: 8\nPadding: 14 20\nHug contents', 'Card List\nDirection: Horizontal\nGap: 24\nWrap: On\nChildren: Fill container'],
    question: '내용 길이에 맞춰 버튼 너비가 변하게 하는 크기 옵션은 무엇인가요?', answer: 'Hug contents입니다.',
  },
  '버튼과 입력 요소': {
    codes: ['Button variants\nType: Primary/Secondary\nState: Default/Hover/Focus/Disabled', 'Input variants\nState: Empty/Filled/Focus/Error/Disabled\nLabel과 오류 문구 포함', 'Touch target: 최소 44 × 44\nFocus ring: 2px Primary\nError: 색상 + 문장 함께 표시'],
    question: '오류 상태를 빨간색만으로 표현하면 안 되는 이유는 무엇인가요?', answer: '색을 구분하기 어려운 사용자가 오류를 알 수 없으므로 아이콘이나 설명 문장을 함께 제공해야 합니다.',
  },
  '카드 컴포넌트': {
    codes: ['ProgramCard 구조\nImage / Category / Title / Summary / Meta / Action', 'Properties\nCategory: Text\nLevel: Text\nImage: Instance swap\nSaved: Boolean', 'Variants\nDefault / Hover / Saved\nDesktop / Mobile\nImage / No image'],
    question: '같은 카드의 상태 차이를 한 컴포넌트 안에서 관리하는 Figma 기능은 무엇인가요?', answer: 'Variants입니다.',
  },
  'PC 메인 화면': {
    codes: ['Desktop 1440\nHeader 72\nHero 560\nContent max 1200\nSection gap 120', 'Hero 구성\nEyebrow / H1 / Description / Primary CTA / Image\n텍스트 폭 520', '메인 순서\n대표 메시지 → 분야 → 프로그램 → 오늘의 자료 → 이용 순서 → Footer'],
    question: '메인 화면의 첫 영역에서 가장 먼저 전달해야 하는 것은 무엇인가요?', answer: '서비스가 누구에게 어떤 결과를 제공하는지 보여주는 핵심 메시지입니다.',
  },
  '모바일 반응형 화면': {
    codes: ['Mobile 390\nSide padding 20\nHeader 64\nSection gap 72', '변경 규칙\n메뉴 → 버튼\nHero 2열 → 1열\nCard 3열 → 1열\nCTA full width', '점검\n가로 스크롤 없음\n44px 터치 영역\n16px 이상 본문\n이미지 비율 유지'],
    question: 'PC 화면을 단순히 축소하는 대신 모바일에서 다시 정해야 하는 것은 무엇인가요?', answer: '정보 우선순위, 열 배치, 메뉴 방식, 터치 영역과 줄바꿈입니다.',
  },
  '프로토타입과 개발 전달': {
    codes: ['Prototype\nHome CTA → Programs\nCard → Detail\nMenu → Overlay\nBack → Previous', '개발 전달\nFrame 이름 / 상태 / 간격 / 색상 Style / Export asset / 예외 화면', '검수표\nPC·모바일 비교\nHover·Focus·Error\n빈 목록·로딩\n이미지 alt 문장'],
    question: '개발 전달 시 정상 화면 외에 반드시 포함할 상태는 무엇인가요?', answer: '로딩, 결과 없음, 오류, 선택, 비활성 같은 상태입니다.',
  },
  'Codex와 안전 규칙': {
    codes: ['프로젝트: EDU\n작업 위치: C:\\...\\edu\\app\n수정 허용: src\n수정 금지: outputs와 다른 프로젝트', '비밀정보 규칙\n.env.local Git 제외\n비밀번호·service role 키 코드 금지\n실제 개인정보 입력 금지', '작업 전 확인\n1. git status\n2. 기존 파일\n3. 변경 목록 보고\n4. 최소 범위 수정'],
    question: 'Codex에 작업 위치와 수정 금지 범위를 함께 알려야 하는 이유는 무엇인가요?', answer: '다른 프로젝트나 기존 자료를 뜻하지 않게 수정하는 일을 막기 위해서입니다.',
  },
  '좋은 요청문 구조': {
    codes: ['프로젝트명:\n프로젝트 위치:\n현재 상태:\n오늘 목표:', '작업 범위:\n1. 검색 입력\n2. 제목 필터\n3. 결과 수\n유지: 기존 메뉴·디자인', '완료 조건:\n- 검색 동작\n- 모바일 정상\n- npm run build 성공\n- 변경 파일 보고'],
    question: '좋은 개발 요청문에 목표와 함께 반드시 들어갈 두 범위는 무엇인가요?', answer: '구현할 작업 범위와 이번에 구현하지 않거나 유지할 범위입니다.',
  },
  '작업 범위와 완료 기준': {
    codes: ['큰 요청: 관리자 전체를 만들어줘.\n작은 요청: 교육자료 목록·등록만 만들고 수정·삭제는 제외해줘.', '완료 기준\n- 빈 검색어는 전체 표시\n- 제목·설명 검색\n- 결과 없으면 안내\n- 새로고침 정상', '테스트 요청\nPC 1280px / 모바일 390px\n정상·빈 값·잘못된 값\nnpm run build'],
    question: '“보기 좋게 만들어줘”가 완료 기준으로 부족한 이유는 무엇인가요?', answer: '사람마다 판단이 달라 성공 여부를 같은 방법으로 확인할 수 없기 때문입니다.',
  },
  'React 첫 화면': {
    codes: ['npm create vite@latest app -- --template react\ncd app\nnpm install\nnpm run dev', '요청: App.jsx에 제목과 설명, 교육 프로그램 보기 버튼을 추가해줘. TypeScript는 사용하지 마.', '확인:\n브라우저 주소 열기\n제목·버튼 확인\n모바일 너비 확인\nnpm run build'],
    question: 'Vite 개발 화면을 실행하는 기본 명령은 무엇인가요?', answer: 'npm run dev입니다.',
  },
  '데이터와 카드': {
    codes: ["const programs = [{ id: 'react', title: 'React 입문', level: '기초' }]", 'function ProgramCard({ program }) {\n  return <article><h2>{program.title}</h2><p>{program.level}</p></article>\n}', '{programs.map(program => <ProgramCard key={program.id} program={program} />)}'],
    question: '반복 카드에 고유한 key가 필요한 이유는 무엇인가요?', answer: 'React가 각 항목을 구분하고 변경된 항목만 정확하게 갱신하기 위해서입니다.',
  },
  '검색·필터 기능': {
    codes: ["const [keyword, setKeyword] = useState('')", "const visible = programs.filter(item =>\n  item.title.toLowerCase().includes(keyword.trim().toLowerCase())\n)", '<input value={keyword} onChange={event => setKeyword(event.target.value)} />\n<p>{visible.length}개 결과</p>'],
    question: '검색 전 trim과 소문자 변환을 하는 이유는 무엇인가요?', answer: '앞뒤 공백과 영문 대소문자 차이 때문에 예상한 결과가 빠지는 일을 줄이기 위해서입니다.',
  },
  '오류 전달과 수정': {
    codes: ['오류 요청\n실행: npm run dev\n주소: #/programs\n행동: 카드 클릭\n결과: 백지 화면', '첫 오류:\nTypeError: Cannot read properties of undefined\n발생 파일과 줄 번호도 함께 전달', '수정 요청:\n원인을 쉬운 말로 설명해줘.\n기존 검색과 배포 설정은 유지하고 필요한 파일만 수정해줘.\n빌드로 확인해줘.'],
    question: '오류 로그 전체보다 먼저 전달할 핵심 문장은 무엇인가요?', answer: '실패 원인이 처음 나타난 첫 번째 오류 문장과 파일·줄 번호입니다.',
  },
  'Git 변경 검토': {
    codes: ['git status --short\ngit diff --stat', 'git diff -- src/pages/ProgramPage.jsx\ngit diff --check', 'git diff | Select-String -Pattern "password|secret|service_role" -CaseSensitive:$false\nnpm run build'],
    question: 'Codex 결과를 커밋하기 전에 확인할 세 가지는 무엇인가요?', answer: '요청 범위의 파일만 바뀌었는지, 비밀정보가 없는지, 빌드와 주요 기능이 성공하는지 확인합니다.',
  },
  'GitHub 업로드': {
    codes: ['git status --short\ngit add src README.md', 'git commit -m "Add lesson search"\ngit log -1 --oneline', 'git pull --rebase origin main\ngit push origin main\n# GitHub에서 커밋 확인'],
    question: '원격 저장소가 앞서 있을 때 바로 강제 푸시하면 안 되는 이유는 무엇인가요?', answer: '다른 사람이 올린 커밋을 잃거나 저장소 기록을 손상할 수 있기 때문입니다.',
  },
  '배포·발표·회고': {
    codes: ['배포 확인\nActions 초록색 성공\n실제 URL 새로고침\n메뉴·이미지·상세·모바일 테스트', '발표\n문제 1분\n핵심 기능 2분\n시연 3분\n어려움·해결 1분\n다음 계획 1분', '회고\n잘된 점:\n막힌 점:\n도움을 받은 요청:\n다음에는 바꿀 점:\n미완료·보안 주의:'],
    question: '프로젝트 발표에서 기능 목록보다 중요한 것은 무엇인가요?', answer: '어떤 사용자 문제를 해결했고 실제 화면에서 어떻게 동작하는지 보여주는 것입니다.',
  },
  '독자와 운영 목표': {
    codes: ['핵심 독자\n- 50대 코딩 초보자\n- 노트북과 인터넷 사용 가능\n- 직접 만든 결과를 원하는 사람', '운영 목표\n방문자 수보다 “교육자료 학습 시작”과 “강좌 상세 확인”을 우선 측정', '목표표\n목표: 자료 학습 시작 증가\n지표: 시작 버튼 클릭률\n기간: 4주\n목표값: 15%'],
    question: '콘텐츠 운영 목표를 단순 방문자 수로만 정하면 부족한 이유는 무엇인가요?', answer: '방문자가 실제로 학습하거나 신청하는 등 원하는 행동을 했는지 알 수 없기 때문입니다.',
  },
  '주제와 검색 의도': {
    codes: ['검색어: React 설치 방법\n의도: 정보 탐색\n원하는 결과: 오류 없이 첫 화면 실행', '주제표\n검색어 | 독자 질문 | 글의 답 | 다음 행동\nVite 설치 | 무엇을 설치? | 순서 안내 | 첫 화면 실행', '한 글 한 질문\n제목: Node.js 설치 확인하는 3단계\n제외: React 프로젝트 전체 제작'],
    question: '검색어가 같아도 검색 의도를 확인해야 하는 이유는 무엇인가요?', answer: '사용자가 정의·비교·구매·실행 중 어떤 결과를 원하는지에 따라 제공할 내용이 달라지기 때문입니다.',
  },
  '제목과 글 구조': {
    codes: ['제목 공식\n[대상] + [해결할 문제] + [구체적 결과]\n예: 초보자를 위한 Vite 설치와 첫 화면 실행', '본문 구조\n1. 먼저 답\n2. 준비물\n3. 단계별 실습\n4. 오류 해결\n5. 완료 확인', '소제목 점검\n소제목만 읽어도 전체 순서가 보이는가?\n한 문단에 한 가지 내용만 있는가?'],
    question: '초보자용 글에서 결론을 앞부분에 배치하는 이유는 무엇인가요?', answer: '독자가 자신에게 필요한 글인지 빠르게 판단하고 전체 진행 방향을 이해할 수 있기 때문입니다.',
  },
  '이미지와 저작권': {
    codes: ['이미지 기록표\n파일: react-install.webp\n출처: 직접 제작\n사용 범위: EDU\n대체 설명: Vite 설치가 완료된 터미널', '<img src="react-install.webp" alt="Vite 설치 완료 메시지가 표시된 터미널" loading="lazy" />', '최적화 점검\n형식: WebP\n너비: 표시 크기의 2배 이하\n용량: 300KB 이하\n파일명: 내용 설명'],
    question: '이미지 출처와 사용 범위를 기록해야 하는 이유는 무엇인가요?', answer: '나중에 저작권과 재사용 가능 여부를 확인하고 문제가 있는 이미지를 교체하기 위해서입니다.',
  },
  '발행 체크리스트': {
    codes: ['내용 확인\n□ 제목과 본문 일치\n□ 실행 순서 검증\n□ 코드 복사 가능\n□ 날짜·버전 표시', '화면 확인\n□ 링크 정상\n□ 이미지 alt\n□ 모바일 줄바꿈\n□ 키보드 사용\n□ 오류 주소 안내', '발행 기록\n작성자:\n검수자:\n발행일:\n수정일:\n관련 강좌:\n다음 검토일:'],
    question: '교육자료의 코드를 발행 전에 직접 실행해야 하는 이유는 무엇인가요?', answer: '오탈자와 버전 차이로 학습자가 첫 단계부터 막히는 일을 방지하기 위해서입니다.',
  },
  '콘텐츠 달력': {
    codes: ['열 구성\n주제 | 독자 | 형식 | 담당자 | 마감일 | 상태 | URL', '1주차 월: HTML 첫 화면 / 신규 / 실습 / 작성 중\n1주차 목: 오류 해결 / 재방문 / FAQ / 예정', '상태 규칙\n아이디어 → 작성 → 기술 검수 → 발행 예약 → 발행 → 개선'],
    question: '콘텐츠 달력에 담당자와 상태를 함께 기록하는 이유는 무엇인가요?', answer: '작업이 누구에게 멈춰 있는지 파악하고 발행 누락과 중복 작업을 막기 위해서입니다.',
  },
  '조회·클릭·전환': {
    codes: ['조회수 1,000\n버튼 클릭 180\n학습 시작 90', '클릭률 = 180 / 1,000 × 100 = 18%\n전환율 = 90 / 1,000 × 100 = 9%', '비교표\n이번 주 전환율 9%\n지난주 전환율 7%\n변화 +2%p\n원인 후보: CTA 문구 변경'],
    question: '클릭률과 전환율의 분모를 함께 기록해야 하는 이유는 무엇인가요?', answer: '어떤 전체 집단을 기준으로 계산했는지 달라지면 수치를 정확히 비교할 수 없기 때문입니다.',
  },
  '데이터 정리와 시각화': {
    codes: ['정리 전\nReact / react / React \n정리 후\nReact 한 값으로 통일', '주간 표\n주차 | 조회 | 시작 | 완료\n1 | 1000 | 90 | 30\n2 | 1200 | 132 | 48', '차트 선택\n시간 변화 → 선 그래프\n항목 비교 → 막대 그래프\n구성 비율 → 제한적으로 원 그래프'],
    question: '차트를 만들기 전에 중복과 빈 값을 정리해야 하는 이유는 무엇인가요?', answer: '같은 항목이 나뉘거나 누락되어 잘못된 합계와 비율이 표시될 수 있기 때문입니다.',
  },
  '개선 가설과 실험': {
    codes: ['관찰: 모바일에서 시작 클릭률이 낮다.\n가설: 첫 버튼을 화면 위로 옮기면 클릭률이 높아질 것이다.', '실험\n대상: 모바일 방문자\n변경: CTA 위치만 변경\n지표: 클릭률\n기간: 2주\n중단 조건: 오류 증가', '결과\n기존 12% / 변경 15%\n차이 +3%p\n한계: 표본 200명\n결정: 2주 추가 관찰'],
    question: '한 실험에서 여러 요소를 동시에 바꾸면 안 되는 이유는 무엇인가요?', answer: '어떤 변경이 결과에 영향을 주었는지 구분하기 어렵기 때문입니다.',
  },
  '성과 보고와 다음 계획': {
    codes: ['보고 순서\n목표 → 실행 → 결과 수치 → 해석 → 한계 → 다음 행동', '요약\n목표: 학습 시작률 10%\n결과: 9%\n잘된 점: 조회 증가\n문제: 모바일 이탈\n다음: CTA 개선 실험', '다음 달 계획\n유지: 인기 10분 실습\n개선: 모바일 첫 화면\n중단: 클릭 없는 배너\n신규: 최근 본 자료'],
    question: '성과 보고서에 한계와 다음 행동을 함께 적는 이유는 무엇인가요?', answer: '수치를 과장하지 않고 다음 운영자가 근거를 이어서 검증하고 개선할 수 있게 하기 위해서입니다.',
  },
  'React 프로젝트 점검': {
    codes: ['npm install\nnpm run dev\n# package.json의 scripts와 로컬 주소 확인', 'src/\n├─ components/\n├─ pages/\n├─ data/\n└─ App.jsx', 'npm run build\ngit status --short\n# 빌드 오류와 예상 밖 생성 파일 확인'],
    question: 'React 수정 전에 package.json의 scripts를 확인하는 이유는 무엇인가요?', answer: '프로젝트마다 실행·빌드·테스트 명령이 다를 수 있기 때문입니다.',
  },
  '컴포넌트와 props': {
    codes: ['function Badge({ children }) {\n  return <span className="badge">{children}</span>\n}', 'function ProgramCard({ title, level }) {\n  return <article><Badge>{level}</Badge><h2>{title}</h2></article>\n}', '<ProgramCard title="React API 활용" level="기초" />\n<ProgramCard title="관리자 대시보드" level="실전" />'],
    question: 'props를 직접 수정하지 않고 읽기 전용으로 다루는 이유는 무엇인가요?', answer: '데이터가 부모에서 자식으로 흐르는 규칙을 유지해 변경 원인을 예측하기 쉽게 하기 위해서입니다.',
  },
  'useState와 입력': {
    codes: ["const [keyword, setKeyword] = useState('')", '<label htmlFor="search">검색</label>\n<input id="search" value={keyword} onChange={event => setKeyword(event.target.value)} />', "const [filters, setFilters] = useState({ category: 'all', level: 'all' })\nsetFilters(current => ({ ...current, level: '기초' }))"],
    question: '객체 상태의 한 항목만 바꿀 때 이전 값을 펼쳐 쓰는 이유는 무엇인가요?', answer: '다른 상태 항목이 사라지지 않게 유지하면서 필요한 값만 변경하기 위해서입니다.',
  },
  '목록 검색': {
    codes: ["const normalized = keyword.trim().toLowerCase()", "const searched = programs.filter(item =>\n  `${item.title} ${item.description}`.toLowerCase().includes(normalized)\n)", '<p aria-live="polite">{searched.length}개 프로그램</p>\n{searched.length ? <ProgramGrid items={searched} /> : <EmptyResult />}'],
    question: '검색 결과 개수를 aria-live로 안내하면 어떤 사용자를 도울 수 있나요?', answer: '화면낭독기를 사용하는 사용자가 입력 후 결과가 바뀐 사실을 알 수 있습니다.',
  },
  '복합 필터': {
    codes: ["const categoryMatches = category === 'all' || item.categoryId === category", "const visible = programs.filter(item =>\n  (category === 'all' || item.categoryId === category) &&\n  (level === 'all' || item.level === level)\n)", "function resetFilters() {\n  setCategory('all')\n  setLevel('all')\n  setPage(1)\n}"],
    question: '필터 조건을 바꿀 때 페이지를 1로 돌리는 이유는 무엇인가요?', answer: '새 결과의 페이지 수가 줄어 현재 페이지가 빈 화면이 되는 것을 막기 위해서입니다.',
  },
  '정렬과 페이지네이션': {
    codes: ["const sorted = [...visible].sort((a, b) => a.title.localeCompare(b.title, 'ko'))", 'const pageSize = 9\nconst pageCount = Math.ceil(sorted.length / pageSize)\nconst pageItems = sorted.slice((page - 1) * pageSize, page * pageSize)', '<button disabled={page === 1} onClick={() => setPage(page - 1)}>이전</button>\n<span>{page} / {pageCount}</span>'],
    question: 'sort 전에 배열을 복사해야 하는 이유는 무엇인가요?', answer: 'sort가 원본 배열 자체를 변경해 다른 화면 상태에 예상하지 않은 영향을 줄 수 있기 때문입니다.',
  },
  '비동기와 fetch': {
    codes: ["const response = await fetch('https://api.tvmaze.com/search/shows?q=office')", "if (!response.ok) throw new Error(`요청 실패: ${response.status}`)\nconst data = await response.json()", "useEffect(() => {\n  const controller = new AbortController()\n  loadShows(controller.signal)\n  return () => controller.abort()\n}, [keyword])"],
    question: '컴포넌트가 사라질 때 진행 중인 요청을 취소하는 이유는 무엇인가요?', answer: '필요 없는 응답이 뒤늦게 상태를 바꾸거나 네트워크를 낭비하는 일을 줄이기 위해서입니다.',
  },
  '로딩·오류·빈 상태': {
    codes: ["if (loading) return <p role='status'>자료를 불러오는 중입니다.</p>", "if (error) return <div role='alert'><p>{error}</p><button onClick={retry}>다시 시도</button></div>", "if (!items.length) return <div><strong>결과가 없습니다.</strong><button onClick={resetFilters}>조건 초기화</button></div>"],
    question: '오류 화면에 오류 문장만 표시하는 것보다 다시 시도 버튼을 제공해야 하는 이유는 무엇인가요?', answer: '사용자가 페이지를 떠나지 않고 문제에서 복구할 다음 행동을 선택할 수 있기 때문입니다.',
  },
  'localStorage 저장': {
    codes: ["localStorage.setItem('edu:favorites', JSON.stringify(favoriteIds))", "function readFavorites() {\n  try { return JSON.parse(localStorage.getItem('edu:favorites')) || [] }\n  catch { return [] }\n}", "setFavoriteIds(current => {\n  const next = current.includes(id) ? current.filter(v => v !== id) : [...current, id]\n  localStorage.setItem('edu:favorites', JSON.stringify(next))\n  return next\n})"],
    question: 'localStorage 값을 읽을 때 try/catch가 필요한 이유는 무엇인가요?', answer: '저장값이 손상되거나 JSON 형식이 아니면 JSON.parse가 오류를 발생시킬 수 있기 때문입니다.',
  },
  '통합 테스트와 배포': {
    codes: ['테스트 흐름\n홈 → 프로그램 → 검색 → 필터 → 2페이지 → 상세 → 찜 → 새로고침', 'npm run build\ngit diff --check\ngit status --short', '배포 점검\n실제 URL 직접 접속\n상세 주소 새로고침\n390px 모바일\n키보드 Tab\n저장 복원'],
    question: '개별 기능뿐 아니라 사용자 흐름 전체를 테스트해야 하는 이유는 무엇인가요?', answer: '각 기능이 단독으로 동작해도 화면 이동과 상태 조합에서 오류가 발생할 수 있기 때문입니다.',
  },
}

const makeRepresentativeCourse = ({ programId, title, outcome, tools, modules }) => ({
  programId, title, outcome, totalWeeks: 10,
  sessions: modules.flatMap((moduleTitle, moduleIndex) => {
    const week = moduleIndex + 1
    const formats = [
      ['개념 이해', `${moduleTitle}의 역할과 필요한 이유를 설명합니다.`, `${moduleTitle}은(는) 결과물을 안전하고 순서 있게 완성하기 위한 기본 단계입니다.`],
      ['따라 하기', `${moduleTitle}의 핵심 작업을 직접 실행합니다.`, `작은 예제를 먼저 실행하고 한 가지 값을 바꾸면 ${moduleTitle}의 작동 원리를 눈으로 확인할 수 있습니다.`],
      ['내 프로젝트 적용', `${moduleTitle}을(를) 결과물에 적용하고 완료 기준으로 점검합니다.`, `예제를 그대로 두지 않고 내 주제와 자료로 바꾸어야 실제로 사용할 수 있는 결과물이 됩니다.`],
    ]
    return formats.map(([format, goal], formatIndex) => {
      const order = moduleIndex * 3 + formatIndex + 1
      const exactExplanation = moduleExplanations[moduleTitle]
      const exactLesson = exactModuleLessons[moduleTitle]
      const concepts = [
        exactExplanation,
        `${exactExplanation} 이번 회차에서는 ${tools}에서 작은 예제를 직접 실행해 입력과 결과의 연결을 확인합니다.`,
        `${exactExplanation} 마지막으로 예제를 자신의 주제와 자료에 맞게 바꾸고 결과물에 반영합니다.`,
      ]
      const generated = session(
        `${programId}-${String(order).padStart(2, '0')}`, week, order, `${moduleTitle} · ${format}`, goal, concepts[formatIndex],
        formatIndex === 0
          ? [`${tools}를 준비하고 ${moduleTitle}과 관련된 현재 상태를 기록합니다.`, exactExplanation, '핵심 용어와 역할을 자신의 말로 한 문장씩 적습니다.', '좋은 예와 잘못된 예를 하나씩 비교합니다.', '오늘 적용할 한 가지 목표를 정합니다.']
          : formatIndex === 1
            ? [`${tools}에서 ${moduleTitle} 실습 위치를 엽니다.`, '제공된 예제의 입력·처리·결과를 구분합니다.', '예제를 그대로 실행하고 첫 결과를 저장합니다.', '값이나 조건 한 가지를 바꾸어 다시 실행합니다.', '변경 전후 차이와 오류 여부를 기록합니다.']
            : [`이전 회차의 ${moduleTitle} 예제를 엽니다.`, '내 서비스의 사용자·자료·조건으로 예제를 바꿉니다.', 'PC와 모바일 또는 정상·오류 조건을 각각 확인합니다.', `완성된 ${moduleTitle} 결과를 프로젝트에 저장합니다.`, '완료 기준 세 항목을 확인하고 다음 주차 준비를 기록합니다.'],
        exactLesson?.codes[formatIndex] || `// ${title} ${order}회차 실습 기록\nconst topic = '${moduleTitle}'\nconst result = '${format} 완료'\nconsole.log(topic, result)`,
        `${title}의 ${order}회차입니다. ${moduleTitle} ${format} 실습을 초보자도 따라 할 수 있게 작은 단계로 진행해줘. 기존 결과는 유지하고 완료 후 확인 방법과 오류 복구 순서를 알려줘.`,
        [`${moduleTitle}이(가) 필요한 이유를 설명할 수 있나요?`, '예제에서 직접 바꾼 부분은 무엇인가요?', '완료 결과를 어떤 방법으로 확인했나요?'],
        `${moduleTitle} ${format} 결과물`,
      )
      if (!exactLesson) return generated
      return {
        ...generated,
        quiz: [exactLesson.question, `이번 ${format} 회차에서 직접 확인한 결과는 무엇인가요?`, '오류가 생겼을 때 먼저 기록할 정보는 무엇인가요?'],
        quizAnswers: [exactLesson.answer, generated.result, '실행 명령·브라우저 주소·재현 순서와 첫 번째 오류 문장입니다.'],
      }
    })
  }),
})

export const representativeCourses = representativeCourseSpecs.map(makeRepresentativeCourse)
export const detailedCourses = [reactWebsiteCourse, ...representativeCourses]
export const findDetailedCourse = (programId) => detailedCourses.find((course) => course.programId === programId)

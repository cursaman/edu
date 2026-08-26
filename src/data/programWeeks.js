const weeks = (items) => items.map((item, index) => ({ week: index + 1, ...item }))

export const programWeeks = {
  'web-foundation': weeks([
    { title: 'HTML로 첫 화면 세우기', summary: '웹페이지의 뼈대를 이해하고 소개 화면을 만듭니다.', topics: ['HTML 문서 구조', '제목·문단·버튼 태그', '브라우저에서 결과 확인'], tools: ['HTML5', 'VS Code', 'Chrome'], result: '소개 문장과 버튼이 있는 첫 화면', lessonIds: ['html-first-page'] },
    { title: 'CSS로 읽기 좋은 화면 꾸미기', summary: '색상과 글자, 여백을 조절해 편안한 카드 화면을 만듭니다.', topics: ['CSS 연결 방법', '글자와 배경색', '여백과 둥근 모서리'], tools: ['CSS3', '개발자 도구'], result: '모바일에서도 읽기 좋은 교육 카드', lessonIds: ['css-first-style'] },
    { title: 'JavaScript로 버튼에 행동 넣기', summary: '클릭하면 문장이 바뀌는 작은 상호작용을 구현합니다.', topics: ['변수와 요소 찾기', '클릭 이벤트', '화면 문구 변경'], tools: ['JavaScript', 'Console'], result: '버튼에 반응하는 홈페이지', lessonIds: ['javascript-basics'] },
    { title: '반응형 점검과 홈페이지 발표', summary: 'PC와 모바일 화면을 점검하고 완성 결과를 설명합니다.', topics: ['화면 너비 점검', '오류와 문구 수정', '완성 결과 발표'], tools: ['Chrome 모바일 보기', 'Codex'], result: '공유할 수 있는 첫 홈페이지', lessonIds: ['responsive-layout', 'codex-review'] },
  ]),
  'react-website': weeks([
    { title: 'React 프로젝트와 첫 컴포넌트', summary: 'Vite 프로젝트를 실행하고 화면을 작은 부품으로 나눕니다.', topics: ['Node.js와 npm 확인', 'Vite 실행', '컴포넌트와 JSX'], tools: ['React', 'Vite', 'npm'], result: '제목과 소개가 보이는 React 화면', lessonIds: ['react-components'] },
    { title: '데이터로 프로그램 카드 만들기', summary: '반복되는 카드를 데이터 한 곳에서 관리합니다.', topics: ['배열과 객체', 'map으로 반복 표시', 'props 전달'], tools: ['React', 'JavaScript'], result: '내용이 다른 프로그램 카드 3개', lessonIds: ['react-components', 'javascript-basics'] },
    { title: '분야 필터와 상세 화면 연결', summary: '선택한 분야만 표시하고 카드에서 상세 화면으로 이동합니다.', topics: ['useState', 'filter', '해시 주소 이동'], tools: ['React Hooks', 'JavaScript'], result: '필터 가능한 프로그램 목록', lessonIds: ['react-state-filter'] },
    { title: '모바일 완성과 사용자 점검', summary: '화면 잘림과 버튼 사용성을 확인하고 결과물을 발표합니다.', topics: ['반응형 그리드', '접근성 기본', '빌드와 최종 점검'], tools: ['CSS', 'Chrome', 'npm'], result: 'PC·모바일 반응형 React 사이트', lessonIds: ['responsive-layout', 'codex-review'] },
  ]),
  'node-backend': weeks([
    { title: '서버의 요청과 응답 이해하기', summary: '식당 주문에 비유해 브라우저와 서버의 대화를 이해합니다.', topics: ['프런트엔드와 백엔드', '요청·응답', '상태 코드'], tools: ['Node.js', 'Chrome Network'], result: '요청 흐름을 설명하는 작은 실습', lessonIds: ['node-request-response'] },
    { title: 'Express로 첫 서버 실행하기', summary: '로컬 서버를 켜고 주소에 접속해 응답을 확인합니다.', topics: ['npm 프로젝트', 'Express 설치', '서버 포트'], tools: ['Node.js', 'Express', 'npm'], result: '브라우저에 응답하는 로컬 서버', lessonIds: ['node-request-response'] },
    { title: '교육자료 JSON API 만들기', summary: '교육자료 목록을 약속된 JSON 형식으로 제공합니다.', topics: ['GET 주소', 'JSON 배열', 'fetch로 확인'], tools: ['Express', 'JSON', 'fetch'], result: '/api/lessons 교육자료 API', lessonIds: ['node-json-api'] },
    { title: '입력 검증과 오류 처리', summary: '빈 값과 긴 문장을 막고 이해하기 쉬운 오류를 돌려줍니다.', topics: ['필수값 검사', '길이 제한', '400 오류 응답'], tools: ['JavaScript', 'Postman 또는 브라우저'], result: '잘못된 입력을 막는 안전한 API', lessonIds: ['api-validation'] },
  ]),
  'supabase-database': weeks([
    { title: '데이터베이스 표 설계하기', summary: '엑셀 표에 비유해 테이블·행·열과 고유 번호를 익힙니다.', topics: ['테이블과 행·열', '자료에 필요한 항목', '기본키'], tools: ['Supabase', 'PostgreSQL'], result: 'edu_lessons 테이블 설계안', lessonIds: ['database-table-basics'] },
    { title: 'React에서 자료 조회하기', summary: 'Supabase의 공개 자료를 읽어 카드 목록으로 표시합니다.', topics: ['프로젝트 연결', 'select 조회', '로딩·오류 표시'], tools: ['React', 'Supabase JS'], result: '공동 교육자료 목록', lessonIds: ['supabase-crud'] },
    { title: '관리자 CRUD 연결하기', summary: '관리자가 자료를 등록·수정·삭제하는 흐름을 연결합니다.', topics: ['insert 등록', 'update 수정', 'delete 삭제'], tools: ['Supabase', 'React'], result: '공동 저장되는 교육자료 관리', lessonIds: ['supabase-crud'] },
    { title: 'RLS로 자료 보호하기', summary: '누구나 읽되 관리자만 변경할 수 있는 규칙을 적용합니다.', topics: ['RLS 활성화', '공개 조회 정책', '관리자 변경 정책'], tools: ['Supabase Auth', 'SQL Editor'], result: '다른 브라우저에서도 안전한 공동 저장', lessonIds: ['supabase-rls'] },
  ]),
  'github-vercel': weeks([
    { title: 'Git과 GitHub 안전하게 시작하기', summary: '변경 기록과 온라인 저장소의 차이를 이해합니다.', topics: ['Git 설치', 'GitHub 저장소', '.gitignore'], tools: ['Git', 'GitHub'], result: '비밀 파일이 제외된 저장소', lessonIds: ['github-first-push'] },
    { title: '첫 커밋과 원격 업로드', summary: '상태를 확인하고 의미 있는 한 묶음으로 변경을 기록합니다.', topics: ['git status', 'add와 commit', 'push'], tools: ['Git', 'GitHub'], result: 'GitHub main에 올라간 첫 커밋', lessonIds: ['github-first-push'] },
    { title: 'Vercel과 저장소 연결하기', summary: 'GitHub 저장소를 가져와 자동 배포를 시작합니다.', topics: ['프로젝트 Import', '빌드 설정', '배포 로그'], tools: ['GitHub', 'Vercel'], result: '실제 *.vercel.app 주소', lessonIds: ['github-actions-check'] },
    { title: '공개 주소 점검과 수정 반영', summary: '모바일·새로고침·오류 주소를 확인하고 수정본을 다시 배포합니다.', topics: ['실제 URL 점검', '재배포 확인', '운영 체크리스트'], tools: ['Vercel', 'Chrome', 'Git'], result: '다른 사람에게 공유 가능한 홈페이지', lessonIds: ['github-pages-publish'] },
  ]),
  'codex-first-service': weeks([
    { title: '바이브코딩 시작 & 환경 세팅', summary: '전체 개발 흐름을 살펴보고 에디터와 Git 기본 환경을 준비합니다.', topics: ['오리엔테이션', '개발 흐름', '에디터·Git 설정'], tools: ['Claude', 'Cursor AI', 'VS Code', 'GitHub'], result: '실습 가능한 개발 환경', lessonIds: ['codex-request', 'github-first-push'] },
    { title: 'MCP로 AI↔클라우드 연동 이해', summary: 'MCP의 역할과 동작을 이해하고 간단한 데이터 연결을 경험합니다.', topics: ['MCP 개념', '도구 연결 흐름', '데이터 연결 실습'], tools: ['Claude', 'MCP', 'Cursor AI'], result: 'AI 도구 연결 흐름도와 첫 연결', lessonIds: ['codex-request'] },
    { title: '웹 기본기 & 프로젝트 뼈대', summary: 'HTTP와 클라이언트·서버를 이해하고 React 프로젝트 구조를 세웁니다.', topics: ['HTTP', '클라이언트·서버', '폴더 구조·라우팅'], tools: ['React', 'VS Code'], result: '라우팅이 연결된 React 프로젝트', lessonIds: ['react-components', 'node-request-response'] },
    { title: 'GitHub 협업 & 형상관리', summary: '저장소와 브랜치를 만들고 PR과 이슈로 작업을 관리합니다.', topics: ['레포 생성', '브랜치와 PR', '이슈 트래킹'], tools: ['GitHub', 'Git'], result: '협업 규칙이 있는 GitHub 저장소', lessonIds: ['github-first-push'] },
    { title: '프런트엔드 CRUD ① 게시판/폼', summary: '게시판 목록·상세 화면과 입력 폼의 상태·유효성 검사를 구현합니다.', topics: ['목록과 상세', '폼 상태', '필수값·길이 검증'], tools: ['React', 'Cursor AI', 'Claude'], result: '등록 폼이 있는 게시판 화면', lessonIds: ['react-state-filter', 'api-validation'] },
    { title: '프런트엔드 CRUD ② To-do·비동기', summary: '할 일 상태를 관리하고 Fetch로 비동기 통신을 연결합니다.', topics: ['상태 추가·수정·삭제', 'Fetch', '로딩·오류 처리'], tools: ['React', 'Cursor AI', 'Claude'], result: '비동기로 동작하는 To-do', lessonIds: ['javascript-basics', 'node-json-api'] },
    { title: '외부 API 활용 & 갤러리', summary: '공공·날씨 API를 연결하고 페이지네이션이 있는 갤러리를 만듭니다.', topics: ['외부 API 요청', '갤러리 UI', '페이지네이션'], tools: ['React', 'Fetch API'], result: '외부 데이터 갤러리', lessonIds: ['node-json-api', 'responsive-layout'] },
    { title: '백엔드 기초 & 데이터베이스', summary: 'Spring Boot 프로젝트를 시작하고 MariaDB 설치와 SQL을 실습합니다.', topics: ['Spring Boot 구조', 'MariaDB 설치', '기본 SQL'], tools: ['Spring Boot', 'MariaDB'], result: 'DB에 연결할 백엔드 프로젝트', lessonIds: ['database-table-basics', 'node-request-response'] },
    { title: 'DB 연동 CRUD API 만들기', summary: '서버와 데이터베이스를 연결하고 REST API의 CRUD를 검증합니다.', topics: ['Entity·Repository', 'REST CRUD', 'API 테스트'], tools: ['Spring Boot', 'MariaDB'], result: '게시판 CRUD REST API', lessonIds: ['supabase-crud', 'api-validation'] },
    { title: 'FE↔BE 연동 & 인증 기본', summary: 'React에서 백엔드 API를 호출하고 세션·토큰 인증 흐름을 익힙니다.', topics: ['프런트 API 호출', 'CORS', '세션·토큰'], tools: ['React', 'Spring Boot'], result: '로그인 흐름이 연결된 웹서비스', lessonIds: ['node-request-response', 'api-validation'] },
    { title: 'AWS 배포 ① EC2·RDS', summary: 'EC2 실행 환경을 구성하고 RDS 데이터베이스 스키마를 연결합니다.', topics: ['EC2 환경 구성', '보안 그룹', 'RDS 연결'], tools: ['AWS EC2', 'AWS RDS'], result: '클라우드에서 실행되는 서버와 DB', lessonIds: ['github-actions-check'] },
    { title: '운영 배포 & 점검 루틴', summary: '백엔드를 빌드·배포하고 로그와 모니터링으로 이슈에 대응합니다.', topics: ['백엔드 빌드·배포', '로그·모니터링', '장애 대응 체크'], tools: ['AWS', 'GitHub', 'Spring Boot'], result: '운영 점검표를 갖춘 실제 웹서비스', lessonIds: ['github-pages-publish', 'codex-review'] },
  ]),
}

export function getProgramWeeks(program) {
  if (programWeeks[program.id]) return programWeeks[program.id]
  return (program.curriculum || []).map((title, index) => ({
    week: index + 1, title, summary: '이 주차의 핵심 내용을 실습하고 결과를 직접 확인합니다.',
    topics: [title], tools: ['Codex', '웹브라우저'], result: `${index + 1}주차 실습 결과물`, lessonIds: [],
  }))
}

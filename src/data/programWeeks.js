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
  'codex-first-service': weeks([
    { title: '좋은 개발 요청서 작성하기', summary: '위치·범위·제외 사항·확인 방법을 갖춘 요청을 만듭니다.', topics: ['프로젝트 위치', '작업 범위', '완료 기준'], tools: ['Codex', '메모장'], result: '실행 가능한 1일차 요청서', lessonIds: ['codex-request'] },
    { title: '첫 화면을 요청하고 실행하기', summary: 'Codex가 만든 파일을 확인하고 로컬 화면을 실행합니다.', topics: ['변경 파일 확인', 'npm 실행', '브라우저 점검'], tools: ['Codex', 'React', 'Vite'], result: '제목과 메뉴가 있는 첫 화면', lessonIds: ['html-first-page', 'react-components'] },
    { title: '오류를 전달하고 수정하기', summary: '첫 오류와 재현 순서를 전달해 필요한 부분만 고칩니다.', topics: ['콘솔 오류 읽기', '재현 순서', '최소 수정 요청'], tools: ['Codex', 'Chrome Console'], result: '오류를 직접 설명하고 복구한 화면', lessonIds: ['codex-error-request'] },
    { title: '결과 검토와 다음 계획 만들기', summary: '변경 범위와 보안을 확인하고 다음 기능을 작은 단계로 나눕니다.', topics: ['git diff 확인', '빌드 테스트', '다음 요청서'], tools: ['Codex', 'Git', 'npm'], result: '검증된 첫 웹서비스와 개발 계획', lessonIds: ['codex-review'] },
  ]),
  'github-vercel': weeks([
    { title: 'Git과 GitHub 안전하게 시작하기', summary: '변경 기록과 온라인 저장소의 차이를 이해합니다.', topics: ['Git 설치', 'GitHub 저장소', '.gitignore'], tools: ['Git', 'GitHub'], result: '비밀 파일이 제외된 저장소', lessonIds: ['github-first-push'] },
    { title: '첫 커밋과 원격 업로드', summary: '상태를 확인하고 의미 있는 한 묶음으로 변경을 기록합니다.', topics: ['git status', 'add와 commit', 'push'], tools: ['Git', 'GitHub'], result: 'GitHub main에 올라간 첫 커밋', lessonIds: ['github-first-push'] },
    { title: 'Vercel과 저장소 연결하기', summary: 'GitHub 저장소를 가져와 자동 배포를 시작합니다.', topics: ['프로젝트 Import', '빌드 설정', '배포 로그'], tools: ['GitHub', 'Vercel'], result: '실제 *.vercel.app 주소', lessonIds: ['github-actions-check'] },
    { title: '공개 주소 점검과 수정 반영', summary: '모바일·새로고침·오류 주소를 확인하고 수정본을 다시 배포합니다.', topics: ['실제 URL 점검', '재배포 확인', '운영 체크리스트'], tools: ['Vercel', 'Chrome', 'Git'], result: '다른 사람에게 공유 가능한 홈페이지', lessonIds: ['github-pages-publish'] },
  ]),
}

export function getProgramWeeks(program) {
  if (programWeeks[program.id]) return programWeeks[program.id]
  return (program.curriculum || []).map((title, index) => ({
    week: index + 1, title, summary: '이 주차의 핵심 내용을 실습하고 결과를 직접 확인합니다.',
    topics: [title], tools: ['Codex', '웹브라우저'], result: `${index + 1}주차 실습 결과물`, lessonIds: [],
  }))
}

-- EDU 웹개발 교육 플랫폼 최신 초기 데이터 (2026-08-26)
-- schema.sql을 먼저 실행한 뒤 이 파일 전체를 SQL Editor에서 실행합니다.
-- 같은 파일을 다시 실행해도 id를 기준으로 갱신되며 중복 행은 생기지 않습니다.

insert into public.edu_programs (
  id, title, category_id, category, level, duration, description, introduction,
  audience, goals, curriculum, preparations, related_lesson_ids,
  status, color, display_number, image_url, image_alt
) values
(
  'web-foundation', 'HTML·CSS·JavaScript로 첫 홈페이지 만들기', 'foundation', '웹 기초', '입문', '4주 · 토요일',
  '웹의 세 가지 기본 도구를 익히고 직접 반응하는 홈페이지를 완성합니다.',
  'HTML로 내용을 정리하고 CSS로 꾸민 뒤 JavaScript로 버튼이 반응하는 첫 홈페이지를 완성합니다.',
  '["코딩을 처음 시작하는 분", "웹페이지가 만들어지는 순서를 기초부터 배우고 싶은 분"]'::jsonb,
  '["HTML, CSS, JavaScript의 역할을 구분합니다.", "읽기 좋은 소개 홈페이지를 직접 만듭니다.", "버튼과 간단한 상호작용을 구현합니다."]'::jsonb,
  '["웹페이지의 구조와 HTML 첫 화면 만들기", "CSS로 글자·색상·여백 꾸미기", "JavaScript로 버튼과 화면 반응 만들기", "PC·모바일 점검과 첫 홈페이지 발표"]'::jsonb,
  '["인터넷에 연결되는 노트북", "웹브라우저", "Visual Studio Code 또는 사용 중인 편집 도구"]'::jsonb,
  '["html-first-page", "css-first-style", "javascript-basics"]'::jsonb, '모집 예정', 'mint', '01',
  '/edu/images/program-foundation.webp', '성인 학습자가 화면 구성 블록을 조립해 첫 홈페이지를 완성하는 모습'
),
(
  'react-website', 'React 웹사이트 만들기', 'frontend', '프런트엔드', '입문', '4주 · 토요일',
  '화면을 작은 부품으로 나누고, 나만의 첫 웹사이트를 완성합니다.',
  '웹사이트 화면을 작은 구성 요소로 나누어 만들고 첫 React 웹사이트를 완성하는 입문 과정입니다.',
  '["코딩 경험이 거의 없지만 웹사이트를 만들어 보고 싶은 분", "화면을 수정하면서 결과를 확인하고 싶은 분"]'::jsonb,
  '["React 화면의 기본 구조를 이해합니다.", "교육 프로그램 카드를 직접 만들고 수정합니다.", "PC와 모바일에서 읽기 좋은 화면을 완성합니다."]'::jsonb,
  '["개발 환경 확인과 첫 화면 실행", "화면 구성 요소와 교육 분야 카드 만들기", "프로그램 목록과 상세 화면 연결", "화면 점검과 완성 결과 발표"]'::jsonb,
  '["인터넷에 연결되는 노트북", "Node.js와 npm 설치", "웹브라우저와 편집 도구"]'::jsonb,
  '["react-components", "javascript-basics"]'::jsonb, '모집 예정', 'violet', '02',
  '/edu/images/program-react.webp', '데스크톱과 태블릿, 스마트폰에서 같은 교육 홈페이지가 열려 있는 모습'
),
(
  'node-backend', 'Node.js 웹서비스 기초', 'backend', '백엔드', '기초', '4주 · 토요일',
  '화면의 요청을 받아 처리하고 결과를 돌려주는 서버의 흐름을 배웁니다.',
  'Node.js로 브라우저의 요청을 받고 JSON 데이터를 돌려주는 작은 서버를 만듭니다.',
  '["웹사이트 뒤에서 데이터가 처리되는 과정이 궁금한 분", "프런트엔드 다음 단계로 서버를 경험하고 싶은 분"]'::jsonb,
  '["프런트엔드와 백엔드의 역할을 구분합니다.", "간단한 API 요청과 응답을 이해합니다.", "입력값을 확인하고 안전한 응답을 돌려줍니다."]'::jsonb,
  '["서버와 요청·응답의 생활 속 개념 이해", "Node.js로 첫 서버 실행하기", "JSON 데이터를 제공하는 API 만들기", "입력 검증·오류 처리와 전체 동작 점검"]'::jsonb,
  '["인터넷에 연결되는 노트북", "Node.js와 npm 설치", "웹브라우저와 편집 도구"]'::jsonb,
  '["javascript-basics", "codex-request"]'::jsonb, '모집 예정', 'coral', '03',
  '/edu/images/program-backend.webp', '브라우저의 요청이 서버 블록을 거쳐 성공 응답으로 돌아오는 흐름을 학습자가 확인하는 모습'
),
(
  'supabase-database', 'Supabase 데이터 저장 입문', 'database', '데이터베이스', '기초', '4주 · 토요일',
  '교육자료를 공동 저장하고 검색하며 안전하게 관리하는 방법을 익힙니다.',
  'Supabase PostgreSQL에 교육자료를 저장하고 조회·수정·삭제하며 RLS의 기초를 배웁니다.',
  '["브라우저를 바꿔도 유지되는 공동 저장 기능이 필요한 분", "데이터베이스를 쉬운 실습으로 처음 배우고 싶은 분"]'::jsonb,
  '["테이블·행·열을 생활 속 표에 비유해 이해합니다.", "교육자료를 등록하고 검색합니다.", "RLS로 허용된 사용자만 데이터를 변경하게 합니다."]'::jsonb,
  '["Supabase 가입과 프로젝트·테이블 만들기", "React에서 자료 조회하고 목록 표시하기", "관리자 자료 등록·수정·삭제 연결하기", "RLS 정책과 다른 브라우저 공동 저장 점검"]'::jsonb,
  '["인터넷에 연결되는 노트북", "GitHub 계정", "Supabase 계정", "실행 가능한 React 프로젝트"]'::jsonb,
  '["javascript-basics", "codex-request"]'::jsonb, '모집 예정', 'violet', '04',
  '/edu/images/program-database.webp', '학습자가 교육자료 카드를 보안이 적용된 데이터베이스에 저장하고 검색하는 모습'
),
(
  'codex-first-service', 'Codex로 첫 웹서비스 만들기', 'ai-development', 'AI 활용 개발', '기초', '4주 · 토요일',
  'AI에게 작은 작업을 요청하고 직접 실행하며 실전 개발을 경험합니다.',
  'Codex에게 오늘 할 작업을 요청하고 실행 결과를 확인하며 웹서비스 제작 흐름을 익힙니다.',
  '["AI와 함께 개발을 시작해 보고 싶은 분", "작은 작업부터 차근차근 완성하고 싶은 분"]'::jsonb,
  '["개발 요청을 구체적으로 작성합니다.", "실행 결과와 오류를 직접 확인합니다.", "첫 웹서비스 화면을 완성합니다."]'::jsonb,
  '["Codex 사용법과 첫 작업 요청", "서비스 화면과 메뉴 구성", "교육 프로그램 데이터 연결", "결과 검토와 다음 개발 계획 정리"]'::jsonb,
  '["인터넷에 연결되는 노트북", "Codex 사용 환경", "Node.js와 npm 설치"]'::jsonb,
  '["codex-request", "html-first-page"]'::jsonb, '모집 예정', 'coral', '05',
  '/edu/images/program-codex.webp', '학습자가 AI에게 개발을 요청하고 완성된 웹사이트 화면을 확인하는 모습'
),
(
  'github-vercel', 'GitHub와 Vercel 배포 입문', 'deployment', '배포 및 운영', '입문', '4주 · 토요일',
  '코드를 안전하게 저장하고 실제 접속 가능한 웹주소를 만듭니다.',
  '웹사이트 소스를 GitHub에 보관하고 Vercel에 연결해 다른 사람도 접속할 수 있는 주소를 만듭니다.',
  '["완성한 웹사이트를 다른 사람에게 보여 주고 싶은 분", "소스 저장과 배포 흐름을 처음 배우는 분"]'::jsonb,
  '["Git과 GitHub의 역할을 구분합니다.", "프로젝트를 GitHub에 안전하게 보관합니다.", "실제 접속 주소를 확인합니다."]'::jsonb,
  '["소스 저장의 필요성과 GitHub 가입", "Git 저장소 만들기와 첫 커밋", "GitHub와 Vercel 연결하기", "실제 접속 주소 점검"]'::jsonb,
  '["인터넷에 연결되는 노트북", "GitHub 계정", "Vercel 계정", "실행 가능한 React 프로젝트"]'::jsonb,
  '["github-first-push", "github-pages-publish"]'::jsonb, '모집 예정', 'mint', '06',
  '/edu/images/program-deployment.webp', '노트북의 소스가 온라인 저장소와 배포 과정을 거쳐 홈페이지로 공개되는 흐름'
)
on conflict (id) do update set
  title = excluded.title,
  category_id = excluded.category_id,
  category = excluded.category,
  level = excluded.level,
  duration = excluded.duration,
  description = excluded.description,
  introduction = excluded.introduction,
  audience = excluded.audience,
  goals = excluded.goals,
  curriculum = excluded.curriculum,
  preparations = excluded.preparations,
  related_lesson_ids = excluded.related_lesson_ids,
  status = excluded.status,
  color = excluded.color,
  display_number = excluded.display_number,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt;

insert into public.edu_lessons (
  id, title, category_id, category, level, duration, description, explanation,
  goals, steps, code_language, code, prompt, checklist, next_lesson_id
) values
(
  'html-first-page', 'HTML이란 무엇인가', 'foundation', '웹 기초', '입문', '20분',
  '제목, 문단, 버튼처럼 웹페이지의 뼈대를 만드는 방법을 알아봅니다.',
  'HTML은 웹페이지의 설계도입니다. 제목은 h1, 설명은 p처럼 내용의 종류를 표시합니다.',
  '["HTML이 화면의 내용을 정리하는 약속임을 이해합니다.", "제목과 문단을 구분합니다."]'::jsonb,
  '["index.html 파일을 엽니다.", "제목과 설명 문장을 작성합니다.", "브라우저에서 화면을 확인합니다."]'::jsonb,
  'HTML', E'<h1>나의 첫 웹페이지</h1>\n<p>오늘부터 차근차근 배웁니다.</p>',
  'HTML의 제목과 문단을 초보자도 이해할 수 있게 설명하고 간단한 예제를 만들어줘.',
  '["제목과 설명 문장이 화면에 나타나나요?"]'::jsonb, 'css-first-style'
),
(
  'css-first-style', 'CSS로 화면 꾸미기', 'foundation', '웹 기초', '입문', '25분',
  '글자 크기, 색상, 여백을 바꿔 읽기 편한 화면을 만듭니다.',
  'CSS는 웹페이지의 옷과 인테리어입니다. 글자 색, 배경색, 여백을 정합니다.',
  '["CSS의 역할을 이해합니다.", "글자 색과 여백을 변경합니다."]'::jsonb,
  '["스타일 파일을 엽니다.", "글자 색과 여백을 수정합니다.", "화면이 바뀌는지 확인합니다."]'::jsonb,
  'CSS', E'.card {\n  color: #24304a;\n  padding: 24px;\n}',
  '50대 학습자가 읽기 편하도록 글자와 여백이 충분한 카드 디자인을 만들어줘.',
  '["글자가 잘 읽히나요?", "내용 주위에 여백이 있나요?"]'::jsonb, 'javascript-basics'
),
(
  'javascript-basics', 'JavaScript 기초 이해하기', 'foundation', '웹 기초', '기초', '30분',
  '버튼을 누르면 반응하는 예제로 화면에 움직임을 더합니다.',
  'JavaScript는 웹페이지의 행동을 담당합니다. 검색, 버튼 클릭, 저장 기능을 만듭니다.',
  '["JavaScript의 역할을 이해합니다.", "버튼과 함수의 동작을 확인합니다."]'::jsonb,
  '["예제 문장을 읽습니다.", "인사말을 변경합니다.", "실행 결과를 확인합니다."]'::jsonb,
  'JavaScript', E'const greeting = "처음 시작해도 괜찮아요."\nconsole.log(greeting)',
  'JavaScript 변수와 함수를 생활 속 비유로 설명하고 간단한 예제를 보여줘.',
  '["바꾼 문장이 실행 결과에 나타나나요?"]'::jsonb, 'react-components'
),
(
  'react-components', 'React 화면 구성하기', 'frontend', '프런트엔드', '기초', '30분',
  '카드와 버튼을 화면 부품으로 나누어 재사용하는 방법을 알아봅니다.',
  'React는 화면을 레고 블록처럼 작은 부품으로 나누어 조립하는 도구입니다.',
  '["화면 부품의 의미를 이해합니다.", "같은 카드를 여러 번 표시합니다."]'::jsonb,
  '["화면 부품 파일을 엽니다.", "제목 문구를 변경합니다.", "화면에서 결과를 확인합니다."]'::jsonb,
  'JavaScript', E'function LessonCard() {\n  return <h2>오늘의 교육자료</h2>\n}',
  'React 컴포넌트를 레고 블록에 비유해서 설명하고 교육자료 카드 예제를 만들어줘.',
  '["카드 제목이 화면에 보이나요?"]'::jsonb, 'codex-request'
),
(
  'codex-request', 'Codex에 개발 요청하기', 'ai-development', 'AI 활용 개발', '입문', '20분',
  '만들 화면과 확인할 내용을 쉬운 문장으로 요청하는 방법을 연습합니다.',
  'Codex는 개발 작업을 함께하는 도우미입니다. 원하는 화면과 제한 조건을 구체적으로 알려줍니다.',
  '["구체적인 요청의 중요성을 이해합니다.", "작업 범위와 확인 방법을 함께 전달합니다."]'::jsonb,
  '["원하는 화면을 문장으로 작성합니다.", "수정하지 않을 범위를 전달합니다.", "결과를 직접 확인합니다."]'::jsonb,
  'Text', '교육자료 목록에 제목 검색 기능을 추가하고 기존 디자인은 유지해줘.',
  '코딩 초보자를 위한 개발 요청서 작성 방법과 좋은 요청 문장 예시를 알려줘.',
  '["원하는 기능과 변경하지 않을 범위를 함께 적었나요?"]'::jsonb, 'github-first-push'
),
(
  'github-first-push', 'GitHub에 소스 올리기', 'deployment', '배포 및 운영', '기초', '25분',
  '프로젝트 변경 내용을 기록하고 GitHub 저장소에 보관합니다.',
  'Git은 변경 기록을 관리하는 노트이고 GitHub는 그 노트를 보관하는 온라인 서랍입니다.',
  '["Git과 GitHub의 차이를 이해합니다.", "비밀 정보가 올라가지 않는지 확인합니다."]'::jsonb,
  '["git status로 변경 파일을 확인합니다.", "비밀 파일 제외 여부를 확인합니다.", "변경 내용을 기록하고 업로드합니다."]'::jsonb,
  'Shell', E'git status\ngit add .\ngit commit -m "교육자료 화면 개선"',
  'GitHub에 소스를 올리기 전 확인해야 할 파일과 비밀 정보 점검 순서를 알려줘.',
  '[".env.local과 비밀번호가 포함되지 않았나요?"]'::jsonb, 'github-pages-publish'
),
(
  'github-pages-publish', 'GitHub Pages로 홈페이지 공개하기', 'deployment', '배포 및 운영', '기초', '30분',
  '완성된 홈페이지를 실제 인터넷 주소로 확인합니다.',
  'GitHub Pages는 저장소의 웹사이트를 실제 인터넷 주소에 공개하는 기능입니다.',
  '["자동 배포 흐름을 이해합니다.", "공개 주소에서 주요 화면을 확인합니다."]'::jsonb,
  '["npm run build를 실행합니다.", "GitHub Actions 실행 결과를 확인합니다.", "공개 홈페이지 주소를 엽니다."]'::jsonb,
  'Shell', 'npm run build',
  'GitHub Pages 배포 설정과 배포 후 확인할 항목을 초보자 눈높이로 설명해줘.',
  '["공개 주소에서 첫 화면과 메뉴가 정상적으로 열리나요?"]'::jsonb, null
)
on conflict (id) do update set
  title=excluded.title, category_id=excluded.category_id, category=excluded.category,
  level=excluded.level, duration=excluded.duration, description=excluded.description,
  explanation=excluded.explanation, goals=excluded.goals, steps=excluded.steps,
  code_language=excluded.code_language, code=excluded.code, prompt=excluded.prompt,
  checklist=excluded.checklist, next_lesson_id=excluded.next_lesson_id;

-- 재방문용 신규 교육자료 11개를 추가합니다. 기존 7개와 합쳐 분야별 3개, 총 18개가 됩니다.
insert into public.edu_lessons (
  id, title, category_id, category, level, duration, description, explanation,
  goals, steps, code_language, code, prompt, checklist, next_lesson_id,
  related_program_id, is_featured, is_popular, published_at
) values
('react-state-filter','React 상태로 분야 필터 만들기','frontend','프런트엔드','기초','30분','선택한 분야의 카드만 보여주는 필터를 만듭니다.','상태는 화면이 기억하는 현재 값입니다.','["상태의 역할을 이해합니다.","filter로 자료를 구분합니다."]','["분야 상태를 만듭니다.","버튼을 연결합니다.","filter로 자료를 고릅니다.","전체 버튼을 확인합니다."]','React JSX',E'const [category, setCategory] = useState(\'all\')\nconst visible = items.filter(item => category === \'all\' || item.category === category)','React 목록에 전체와 분야별 필터 버튼을 만들어줘.','["선택 버튼이 구분되나요?","전체 자료도 나오나요?"]','responsive-layout','react-website',true,false,'2026-08-28'),
('responsive-layout','모바일 반응형 화면 점검하기','frontend','프런트엔드','기초','25분','PC의 여러 열 카드를 모바일에서는 한 열로 정리합니다.','반응형 화면은 기기 너비에 맞춰 배치를 바꾸는 방식입니다.','["PC와 모바일 배치를 구분합니다.","카드 그리드를 한 열로 바꿉니다."]','["모바일 보기를 엽니다.","잘림을 확인합니다.","680px 조건을 넣습니다.","버튼 크기를 확인합니다."]','CSS',E'@media (max-width: 680px) {\n  .lesson-grid { grid-template-columns: 1fr; }\n}','교육자료 카드가 680px 이하에서 한 줄에 하나씩 보이게 해줘.','["가로 스크롤이 없나요?","버튼을 누르기 쉬운가요?"]','node-request-response','react-website',false,false,'2026-08-26'),
('node-request-response','서버의 요청과 응답 이해하기','backend','백엔드','입문','25분','식당 주문에 비유해 브라우저와 서버의 대화를 이해합니다.','브라우저 요청은 손님의 주문이고 서버 응답은 주방에서 내보내는 음식과 같습니다.','["요청과 응답 순서를 설명합니다.","GET 요청을 이해합니다."]','["API 주소를 엽니다.","Network 창을 봅니다.","상태와 JSON을 찾습니다.","잘못된 주소도 확인합니다."]','JavaScript',E'fetch(\'/api/lessons\')\n  .then(response => response.json())','브라우저와 서버의 요청과 응답을 식당 주문에 비유해 설명해줘.','["요청과 응답 주체를 구분하나요?","응답 상태를 봤나요?"]','node-json-api','node-backend',true,false,'2026-08-29'),
('node-json-api','Node.js JSON API 만들기','backend','백엔드','기초','30분','교육자료 목록을 JSON으로 돌려주는 작은 API를 만듭니다.','API는 프로그램끼리 자료를 주고받는 창구이고 JSON은 읽기 쉬운 자료 형식입니다.','["API와 JSON을 이해합니다.","목록 응답을 만듭니다."]','["서버 파일을 만듭니다.","주소를 정합니다.","배열을 응답합니다.","브라우저에서 봅니다."]','JavaScript',E'app.get(\'/api/lessons\', (req, res) => {\n  res.json([{ id: 1, title: \'HTML 시작\' }])\n})','Express에서 교육자료 두 개를 JSON으로 반환하는 API를 만들어줘.','["JSON이 보이나요?","자료를 하나 추가했나요?"]','api-validation','node-backend',false,true,'2026-08-26'),
('api-validation','API 입력값 안전하게 확인하기','backend','백엔드','기초','25분','비어 있거나 너무 긴 입력을 서버에서 막습니다.','입력 검증은 택배를 보내기 전 주소를 확인하는 일과 같습니다.','["입력 검증의 이유를 압니다.","필수값과 길이를 검사합니다."]','["title을 읽습니다.","빈 값을 봅니다.","100자를 제한합니다.","오류 문장을 응답합니다."]','JavaScript',E'if (!title || title.trim().length > 100) {\n  return res.status(400).json({ message: \'제목을 확인해 주세요.\' })\n}','교육자료 제목을 필수로 받고 100자로 제한하는 코드를 작성해줘.','["빈 값이 막히나요?","오류 문장이 쉬운가요?"]','database-table-basics','node-backend',false,false,'2026-08-26'),
('database-table-basics','데이터베이스 표 구조 이해하기','database','데이터베이스','입문','25분','교육자료 표를 만들며 테이블·행·열을 이해합니다.','데이터베이스 테이블은 엑셀 표와 비슷하며 id는 각 행의 번호표입니다.','["테이블·행·열을 구분합니다.","필요한 열을 정합니다."]','["자료 표를 그립니다.","id·제목·분야 열을 적습니다.","세 행을 적습니다.","id 중복을 봅니다."]','SQL',E'create table edu_lessons (\n  id text primary key,\n  title text not null\n);','교육자료 표를 만들고 테이블, 행, 열, 기본키를 설명해줘.','["한 행의 뜻을 아나요?","id가 중복되면 안 되는 이유를 아나요?"]','supabase-crud','supabase-database',true,false,'2026-08-30'),
('supabase-crud','Supabase 자료 저장하고 불러오기','database','데이터베이스','기초','30분','교육자료를 저장하고 목록으로 다시 불러옵니다.','CRUD는 등록·조회·수정·삭제이며 주소록을 관리하는 과정과 같습니다.','["CRUD를 이해합니다.","자료를 조회하고 등록합니다."]','["기존 자료를 조회합니다.","제목을 입력합니다.","한 건을 등록합니다.","목록을 다시 읽습니다."]','JavaScript',E'const { data } = await supabase.from(\'edu_lessons\').select(\'*\')','Supabase에서 교육자료를 조회하고 한 건 등록하는 예제를 만들어줘.','["새 자료가 조회되나요?","error도 확인했나요?"]','supabase-rls','supabase-database',false,true,'2026-08-26'),
('supabase-rls','RLS로 자료 안전하게 보호하기','database','데이터베이스','기초','30분','누구나 읽되 관리자만 수정하는 규칙을 이해합니다.','RLS는 건물 출입 규칙처럼 데이터베이스에서 권한을 검사합니다.','["화면 숨김과 데이터 보호를 구분합니다.","조회와 수정 정책을 구분합니다."]','["RLS를 켭니다.","조회 정책을 봅니다.","관리자 수정 정책을 봅니다.","일반 사용자로 시험합니다."]','SQL',E'alter table edu_lessons enable row level security;\ncreate policy "public read" on edu_lessons for select using (true);','RLS를 건물 출입 규칙에 비유하고 공개 조회 정책을 설명해줘.','["RLS가 켜졌나요?","일반 수정이 차단되나요?"]','codex-request','supabase-database',false,false,'2026-08-26'),
('codex-error-request','오류 화면을 Codex와 해결하기','ai-development','AI 활용 개발','기초','25분','오류 문장과 재현 순서를 전달해 원인을 좁힙니다.','오류 해결은 아픈 곳을 의사에게 설명하는 일과 같습니다.','["오류 메시지를 전달합니다.","재현 순서를 씁니다."]','["오류를 다시 만듭니다.","첫 오류를 복사합니다.","명령과 주소를 적습니다.","최소 수정을 요청합니다."]','요청문',E'npm run dev 후 화면이 백지입니다.\n콘솔 첫 오류는 ... 입니다.','오류 원인을 초보자에게 설명하고 최소 수정을 찾아줘.','["오류를 생략하지 않았나요?","재현 순서를 적었나요?"]','codex-review','codex-first-service',true,false,'2026-08-31'),
('codex-review','Codex 결과를 직접 검토하기','ai-development','AI 활용 개발','기초','25분','변경 파일과 테스트 결과를 확인하고 안전하게 마무리합니다.','AI 결과도 변경 파일, 화면, 빌드와 비밀정보를 사람이 확인해야 합니다.','["변경 파일을 확인합니다.","빌드와 화면을 시험합니다."]','["git status를 봅니다.","불필요한 파일을 찾습니다.","빌드합니다.","PC와 모바일을 봅니다."]','터미널',E'git status\ngit diff --stat\nnpm run build','변경 사항에서 범위 이탈, 보안 위험, 테스트 누락을 찾아줘.','["파일을 설명할 수 있나요?","비밀 키가 없고 빌드가 성공했나요?"]','github-first-push','codex-first-service',false,false,'2026-08-26'),
('github-actions-check','GitHub Actions 배포 확인하기','deployment','배포 및 운영','기초','20분','자동 배포 진행 상태와 오류 위치를 확인합니다.','Actions는 정해 둔 일을 실행하는 자동 작업자입니다.','["실행 상태를 구분합니다.","첫 오류를 찾습니다."]','["Actions를 엽니다.","최근 실행을 고릅니다.","Build와 Deploy를 봅니다.","첫 오류를 읽습니다."]','터미널',E'npm install\nnpm run build','최신 Actions 배포 실패 원인을 로그에서 찾고 복구 순서를 알려줘.','["최신 실행을 봤나요?","Build와 Deploy가 성공인가요?"]','github-pages-publish','github-vercel',false,false,'2026-08-26')
on conflict (id) do update set
  title=excluded.title, category_id=excluded.category_id, category=excluded.category,
  level=excluded.level, duration=excluded.duration, description=excluded.description,
  explanation=excluded.explanation, goals=excluded.goals, steps=excluded.steps,
  code_language=excluded.code_language, code=excluded.code, prompt=excluded.prompt,
  checklist=excluded.checklist, next_lesson_id=excluded.next_lesson_id,
  related_program_id=excluded.related_program_id, is_featured=excluded.is_featured,
  is_popular=excluded.is_popular, published_at=excluded.published_at;

-- 기존 7개 자료에도 관련 프로그램과 홈 추천 정보를 연결합니다.
update public.edu_lessons set related_program_id='web-foundation', is_popular=(id='html-first-page'), is_featured=(id='css-first-style') where id in ('html-first-page','css-first-style','javascript-basics');
update public.edu_lessons set related_program_id='react-website', is_popular=true where id='react-components';
update public.edu_lessons set related_program_id='codex-first-service', is_popular=true where id='codex-request';
update public.edu_lessons set related_program_id='github-vercel', is_popular=(id='github-first-push'), is_featured=(id='github-pages-publish') where id in ('github-first-push','github-pages-publish');

insert into public.edu_notices (id, title, display_date, summary, content, checklist) values
(
  'program-registration', '교육 프로그램 모집 안내', '2026.08.25',
  '처음 시작하는 성인을 위한 웹개발 입문 프로그램을 소개합니다.',
  '["코딩 경험이 거의 없는 성인 학습자를 위한 입문 프로그램을 준비하고 있습니다.", "현재 수강 신청은 실제 접수가 아닌 체험 기능입니다."]'::jsonb,
  '["관심 프로그램의 상세 내용 확인", "교육 기간과 준비물 확인"]'::jsonb
),
(
  'class-preparation', '수업 전 준비물 안내', '2026.08.25',
  '노트북과 인터넷, Node.js 설치 상태를 수업 전에 확인해 주세요.',
  '["인터넷에 연결되는 노트북과 충전기를 준비해 주세요.", "Node.js 설치가 불확실하면 수업 전에 강사와 함께 확인합니다."]'::jsonb,
  '["노트북과 충전기 준비", "인터넷 연결 확인", "Node.js 설치 확인"]'::jsonb
),
(
  'github-pages-published', 'GitHub Pages 홈페이지 공개 안내', '2026.08.25',
  'EDU 홈페이지가 실제 인터넷 주소에 공개되었습니다.',
  '["GitHub Actions가 배포용 파일을 만든 뒤 GitHub Pages에 공개합니다.", "배포가 끝나면 공개 주소에서 변경 사항을 확인합니다."]'::jsonb,
  '["자동 배포 성공 확인", "홈페이지 첫 화면 확인", "메뉴 이동 확인"]'::jsonb
)
on conflict (id) do update set
  title=excluded.title, display_date=excluded.display_date, summary=excluded.summary,
  content=excluded.content, checklist=excluded.checklist;

-- 실행 결과 확인: 프로그램 6개, 교육자료 18개, 공지사항 3개가 정상입니다.
select '교육 프로그램' as item, count(*) as saved_count from public.edu_programs
union all
select '교육자료', count(*) from public.edu_lessons
union all
select '공지사항', count(*) from public.edu_notices;

-- 분야별 교육자료가 각각 3개인지 확인합니다.
select category, count(*) as lesson_count
from public.edu_lessons
group by category
order by category;


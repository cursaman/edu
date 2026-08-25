-- schema.sql을 먼저 실행한 뒤 이 파일 전체를 SQL Editor에서 실행합니다.

insert into public.edu_programs (
  id, title, category_id, category, level, duration, description, introduction,
  audience, goals, curriculum, preparations, related_lesson_ids,
  status, color, display_number, image_url, image_alt
) values
(
  'react-website', 'React 웹사이트 만들기', 'frontend', '프런트엔드', '입문', '4주 · 토요일',
  '화면을 작은 부품으로 나누고, 나만의 첫 웹사이트를 완성합니다.',
  '웹사이트 화면을 작은 구성 요소로 나누어 만들고 첫 React 웹사이트를 완성하는 입문 과정입니다.',
  '["코딩 경험이 거의 없지만 웹사이트를 만들어 보고 싶은 분", "화면을 수정하면서 결과를 확인하고 싶은 분"]'::jsonb,
  '["React 화면의 기본 구조를 이해합니다.", "교육 프로그램 카드를 직접 만들고 수정합니다.", "PC와 모바일에서 읽기 좋은 화면을 완성합니다."]'::jsonb,
  '["개발 환경 확인과 첫 화면 실행", "화면 구성 요소와 교육 분야 카드 만들기", "프로그램 목록과 상세 화면 연결", "화면 점검과 완성 결과 발표"]'::jsonb,
  '["인터넷에 연결되는 노트북", "Node.js와 npm 설치", "웹브라우저와 편집 도구"]'::jsonb,
  '["react-components", "javascript-basics"]'::jsonb, '모집 예정', 'violet', '01',
  '/edu/images/program-react.webp', '데스크톱과 태블릿, 스마트폰에서 같은 교육 홈페이지가 열려 있는 모습'
),
(
  'codex-first-service', 'Codex로 첫 웹서비스 만들기', 'ai-development', 'AI 활용 개발', '기초', '4주 · 토요일',
  'AI에게 작은 작업을 요청하고 직접 실행하며 실전 개발을 경험합니다.',
  'Codex에게 오늘 할 작업을 요청하고 실행 결과를 확인하며 웹서비스 제작 흐름을 익힙니다.',
  '["AI와 함께 개발을 시작해 보고 싶은 분", "작은 작업부터 차근차근 완성하고 싶은 분"]'::jsonb,
  '["개발 요청을 구체적으로 작성합니다.", "실행 결과와 오류를 직접 확인합니다.", "첫 웹서비스 화면을 완성합니다."]'::jsonb,
  '["Codex 사용법과 첫 작업 요청", "서비스 화면과 메뉴 구성", "교육 프로그램 데이터 연결", "결과 검토와 다음 개발 계획 정리"]'::jsonb,
  '["인터넷에 연결되는 노트북", "Codex 사용 환경", "Node.js와 npm 설치"]'::jsonb,
  '["codex-request", "html-first-page"]'::jsonb, '모집 예정', 'coral', '02',
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
  '["github-first-push", "github-pages-publish"]'::jsonb, '모집 예정', 'mint', '03',
  '/edu/images/program-deployment.webp', '노트북의 소스가 온라인 저장소와 배포 과정을 거쳐 홈페이지로 공개되는 흐름'
)
on conflict (id) do update set
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
on conflict (id) do nothing;

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
on conflict (id) do nothing;


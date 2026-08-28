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
  'codex-first-service', '바이브코딩 실전: React·Spring Boot·AWS 웹서비스 구축', 'ai-development', 'AI 활용 개발', '중급', '12주 · 주 1회',
  'AI 개발 도구와 React, Spring Boot, AWS를 연결해 풀스택 웹서비스를 완성합니다.',
  'AI 개발 요청부터 프런트엔드 CRUD, Spring Boot·MariaDB API, 인증 기초, AWS 배포와 운영 점검까지 경험하는 12주 실전 과정입니다.',
  '["React 기초를 배우고 실제 서비스까지 확장하고 싶은 분", "AI 개발 도구로 프런트엔드와 백엔드를 함께 만들고 싶은 분"]'::jsonb,
  '["AI 개발 도구에 명확한 작업을 요청합니다.", "React와 Spring Boot를 연결해 CRUD 서비스를 만듭니다.", "AWS EC2와 RDS에 배포하고 운영 상태를 점검합니다."]'::jsonb,
  '["바이브코딩 시작과 환경 세팅", "MCP로 AI와 클라우드 연동 이해", "웹 기본기와 프로젝트 뼈대", "GitHub 협업과 형상관리", "프런트엔드 CRUD 게시판과 폼", "프런트엔드 CRUD To-do와 비동기", "외부 API 활용과 갤러리", "백엔드 기초와 데이터베이스", "DB 연동 CRUD API", "프런트엔드와 백엔드 연동·인증", "AWS EC2·RDS 배포", "운영 배포와 점검 루틴"]'::jsonb,
  '["인터넷에 연결되는 노트북", "GitHub와 AWS 계정", "Node.js, Java, VS Code 설치", "Claude 또는 Cursor AI 사용 환경"]'::jsonb,
  '["codex-request", "react-components", "github-first-push", "node-json-api", "database-table-basics", "api-validation"]'::jsonb,
  '모집 예정', 'violet', '05', '/edu/images/program-codex.webp',
  '학습자가 AI 개발 도구와 코드 화면을 함께 보며 풀스택 웹서비스를 만드는 모습'
),
(
  'github-vercel', 'GitHub와 Vercel 배포 입문', 'deployment', '테스트·배포·운영', '입문', '4주 · 토요일',
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

insert into public.edu_programs (
  id, title, category_id, category, level, duration, description, introduction,
  audience, goals, curriculum, preparations, related_lesson_ids,
  status, color, display_number, image_url, image_alt
) values
('service-planning-basic','아이디어를 웹서비스 기획서로 만들기','service-planning','서비스 기획','입문','4주 · 주 1회','사용자 문제부터 MVP 기능과 화면 흐름까지 한 장의 기획서로 정리합니다.','사용자 문제를 정의하고 꼭 필요한 기능과 화면 흐름, 개발 요청서를 완성합니다.','["웹서비스 아이디어를 정리하고 싶은 분","개발 전에 만들 범위를 정하고 싶은 분"]','["사용자 문제를 정의합니다.","MVP 우선순위를 정합니다.","개발 요청서를 완성합니다."]','["사용자와 문제 찾기","MVP 기능 우선순위","화면 흐름과 요구사항","기획 발표와 개발 요청서"]','["인터넷 노트북","메모 도구","Codex"]','["codex-request","codex-review"]','모집 예정','coral','07','/edu/images/program-foundation.webp','아이디어 카드로 웹서비스 흐름을 정리하는 모습'),
('uiux-figma-basic','Figma로 웹서비스 화면 설계하기','uiux-design','UI·UX 웹디자인','입문','4주 · 주 1회','색상·글자·여백 원칙을 익히고 PC와 모바일 화면을 설계합니다.','Figma 기본 도구와 디자인 시스템, 반응형 화면을 거쳐 React로 옮길 시안을 완성합니다.','["웹디자인을 처음 배우는 분","개발 전에 화면을 설계하고 싶은 분"]','["읽기 좋은 색상과 글자를 선택합니다.","Figma로 주요 화면을 설계합니다.","PC와 모바일 시안을 완성합니다."]','["디자인 기본과 Figma","메인 화면·메뉴·카드","모바일과 디자인 시스템","Figma 시안을 React로 구현"]','["인터넷 노트북","Figma 계정","웹브라우저"]','["css-first-style","responsive-layout","react-components"]','모집 예정','violet','08','/edu/images/program-react.webp','여러 화면 크기의 웹서비스 디자인을 설계하는 모습'),
('web-security-infra-basic','웹서비스 보안과 클라우드 인프라 입문','security-infrastructure','보안·네트워크·인프라','기초','4주 · 주 1회','비밀 키·인증·HTTPS·DNS·방화벽과 클라우드 연결을 안전하게 익힙니다.','환경변수, 입력 검증, 인증·권한, HTTPS, DNS와 방화벽을 익혀 서비스를 안전하게 점검합니다.','["배포한 서비스를 안전하게 운영하고 싶은 분","네트워크와 보안을 쉽게 배우고 싶은 분"]','["비밀정보를 안전하게 관리합니다.","인증과 권한을 구분합니다.","서버 연결 흐름을 설명합니다."]','["환경변수와 비밀 키","입력 검증과 웹 공격 기초","인증·권한·HTTPS","DNS·포트·방화벽 점검"]','["인터넷 노트북","GitHub 계정","연습 프로젝트"]','["api-validation","supabase-rls","github-pages-publish"]','모집 예정','mint','09','/edu/images/program-database.webp','보안이 적용된 서버와 데이터베이스를 점검하는 모습'),
('content-analytics-basic','웹 콘텐츠 운영과 데이터 분석 기초','content-analytics','콘텐츠·데이터 분석','입문','4주 · 주 1회','교육 콘텐츠를 기획하고 검색·클릭 데이터를 바탕으로 개선합니다.','콘텐츠 구조, SEO, 이미지 저작권, 방문 지표와 개선 기록을 익혀 운영 계획을 완성합니다.','["홈페이지 콘텐츠를 꾸준히 운영하고 싶은 분","방문자 반응으로 글과 화면을 개선하고 싶은 분"]','["독자 중심 콘텐츠를 작성합니다.","검색과 클릭 지표를 이해합니다.","월간 개선 계획을 만듭니다."]','["독자와 콘텐츠 주제","제목·본문·이미지와 SEO","방문·검색·클릭 지표","콘텐츠 달력과 개선 보고서"]','["인터넷 노트북","운영할 홈페이지 주제","스프레드시트"]','["codex-request","github-pages-publish"]','모집 예정','coral','10','/edu/images/program-codex.webp','콘텐츠 카드와 방문 데이터를 살펴보는 모습')
on conflict (id) do update set title=excluded.title, category_id=excluded.category_id, category=excluded.category, level=excluded.level, duration=excluded.duration, description=excluded.description, introduction=excluded.introduction, audience=excluded.audience, goals=excluded.goals, curriculum=excluded.curriculum, preparations=excluded.preparations, related_lesson_ids=excluded.related_lesson_ids, status=excluded.status, color=excluded.color, display_number=excluded.display_number, image_url=excluded.image_url, image_alt=excluded.image_alt;

-- 분야별 입문·기초·실전 구성을 완성하는 확장 프로그램 20개
with expanded_programs(id, title, category_id, category, level, description, curriculum, lesson_id, color, display_number, image_url) as (
  values
  ('user-research-basic','사용자 조사와 서비스 요구사항 작성','service-planning','서비스 기획','기초','인터뷰와 사용자 여정을 통해 필요한 기능과 완료 기준을 정리합니다.','["조사 목표와 인터뷰 질문","사용자 인터뷰와 핵심 발견","사용자 여정과 문제 우선순위","요구사항 명세서 완성"]'::jsonb,'codex-request','coral','11','/edu/images/program-foundation.webp'),
  ('service-planning-project','실전 웹서비스 기획 프로젝트','service-planning','서비스 기획','실전','시장 조사부터 화면 정책과 개발 일정까지 실제 서비스 기획안을 완성합니다.','["시장·경쟁 서비스 분석","핵심 지표와 기능 정책","화면·데이터·예외 정책","로드맵과 최종 기획 발표"]'::jsonb,'codex-review','coral','12','/edu/images/program-foundation.webp'),
  ('responsive-ui-basic','반응형 UI·UX 디자인 실습','uiux-design','UI·UX 웹디자인','기초','PC·태블릿·모바일에서 편리한 화면 구조와 상호작용을 설계합니다.','["사용 흐름과 정보 구조","PC 그리드와 주요 화면","모바일 전환과 터치 UI","사용성 점검과 시안 개선"]'::jsonb,'responsive-layout','violet','13','/edu/images/program-react.webp'),
  ('design-system-project','웹 디자인 시스템 만들기','uiux-design','UI·UX 웹디자인','실전','색상·글자·버튼·카드를 재사용 가능한 디자인 규칙으로 완성합니다.','["브랜드 원칙과 디자인 토큰","버튼·입력·카드 컴포넌트","상태·접근성·반응형 규칙","문서화와 개발 전달"]'::jsonb,'css-first-style','violet','14','/edu/images/program-react.webp'),
  ('web-accessibility-basic','쉬운 웹 접근성과 반응형 기초','foundation','웹 기초','기초','누구나 읽고 키보드로 사용할 수 있는 모바일 친화 화면을 만듭니다.','["의미 있는 HTML 구조","글자·색상 대비와 대체 설명","키보드와 입력 항목 점검","반응형 페이지 완성"]'::jsonb,'responsive-layout','mint','15','/edu/images/program-foundation.webp'),
  ('interactive-web-project','JavaScript 인터랙티브 랜딩페이지','foundation','웹 기초','실전','메뉴·탭·폼·저장 기능이 있는 소개 홈페이지를 직접 완성합니다.','["랜딩페이지 구조와 데이터","메뉴·탭·모달 상호작용","폼 검증과 localStorage","모바일 점검과 공개"]'::jsonb,'javascript-basics','mint','16','/edu/images/program-foundation.webp'),
  ('react-state-api','React 상태관리와 API 활용','frontend','프런트엔드','기초','검색·필터·비동기 요청이 동작하는 데이터 중심 화면을 만듭니다.','["상태와 사용자 입력","목록 검색·필터·정렬","Fetch API와 비동기 상태","데이터 서비스 완성"]'::jsonb,'react-state-filter','violet','17','/edu/images/program-react.webp'),
  ('react-dashboard-project','React 관리자 대시보드 프로젝트','frontend','프런트엔드','실전','CRUD 화면과 차트·권한 UI를 갖춘 반응형 관리 화면을 완성합니다.','["대시보드 구조와 라우팅","목록·상세·등록·수정","통계 카드와 차트 UI","권한 화면·테스트·배포"]'::jsonb,'react-components','violet','18','/edu/images/program-react.webp'),
  ('rest-api-basic','REST API 설계와 구현','backend','백엔드','기초','주소·요청 방식·상태 코드의 원칙에 맞는 CRUD API를 구현합니다.','["REST와 API 명세","조회·등록 API","수정·삭제와 입력 검증","API 문서와 통합 테스트"]'::jsonb,'node-json-api','coral','19','/edu/images/program-backend.webp'),
  ('backend-auth-project','인증이 있는 백엔드 서비스','backend','백엔드','실전','로그인·권한·로그를 적용한 안전한 웹 API 프로젝트를 완성합니다.','["인증 흐름과 사용자 모델","로그인·토큰·세션","역할별 API 권한","보안 점검·로그·배포"]'::jsonb,'api-validation','coral','20','/edu/images/program-backend.webp'),
  ('sql-foundation','SQL로 데이터 조회하기','database','데이터베이스','입문','표를 만들고 필요한 정보를 조건·정렬·집계로 찾아보는 SQL 입문 과정입니다.','["테이블·행·열과 자료형","SELECT와 조건 검색","정렬·그룹·집계","작은 교육 데이터 분석"]'::jsonb,'database-table-basics','violet','21','/edu/images/program-database.webp'),
  ('database-modeling-project','서비스 데이터 모델링 실전','database','데이터베이스','실전','중복을 줄이고 관계와 권한을 고려한 서비스 데이터 구조를 설계합니다.','["요구사항과 개체 찾기","관계·키·정규화","인덱스와 조회 성능","RLS와 최종 스키마 검증"]'::jsonb,'supabase-rls','violet','22','/edu/images/program-database.webp'),
  ('ai-prompt-foundation','AI 개발 요청문 작성 입문','ai-development','AI 활용 개발','입문','원하는 기능을 작게 나누고 AI에게 정확히 요청·검토·수정하는 방법을 익힙니다.','["AI 개발 도구와 안전 규칙","맥락·범위·완료 기준 작성","오류 전달과 수정 요청","작은 웹 기능 완성"]'::jsonb,'codex-request','violet','23','/edu/images/program-codex.webp'),
  ('ai-workflow-project','AI 업무 자동화 웹앱 만들기','ai-development','AI 활용 개발','실전','반복 업무를 분석하고 AI와 API를 연결한 안전한 자동화 웹앱을 설계합니다.','["반복 업무와 위험 분석","프롬프트·API·데이터 설계","자동화 화면과 예외 처리","품질 평가·보안·발표"]'::jsonb,'codex-review','violet','24','/edu/images/program-codex.webp'),
  ('personal-web-security','일반인을 위한 웹 보안 기초','security-infrastructure','보안·네트워크·인프라','입문','계정·비밀번호·피싱·개인정보와 웹서비스의 기본 보안 습관을 익힙니다.','["계정과 안전한 비밀번호","피싱·악성 링크 구분","개인정보와 브라우저 보안","내 서비스 보안 점검표"]'::jsonb,'api-validation','mint','25','/edu/images/program-database.webp'),
  ('cloud-security-project','클라우드 보안 운영 실전','security-infrastructure','보안·네트워크·인프라','실전','권한·네트워크·로그·백업을 점검하고 사고 대응 절차를 만듭니다.','["자산·계정·권한 점검","네트워크와 비밀정보 보호","로그·모니터링·경보","백업·복구·사고 대응 훈련"]'::jsonb,'supabase-rls','mint','26','/edu/images/program-database.webp'),
  ('seo-content-basic','검색되는 웹 콘텐츠 만들기','content-analytics','콘텐츠·데이터 분석','기초','검색 의도에 맞는 제목·본문·이미지와 기본 SEO 정보를 작성합니다.','["독자 질문과 검색 의도","제목·소제목·본문 구성","이미지·링크·메타 정보","발행과 검색 품질 점검"]'::jsonb,'html-first-page','coral','27','/edu/images/program-codex.webp'),
  ('web-analytics-project','웹 데이터 분석과 개선 프로젝트','content-analytics','콘텐츠·데이터 분석','실전','방문·전환 데이터를 읽고 가설과 실험으로 홈페이지를 개선합니다.','["목표·지표·측정 계획","방문 흐름과 전환 분석","가설과 개선 실험","결과 보고와 다음 운영 계획"]'::jsonb,'codex-review','coral','28','/edu/images/program-codex.webp'),
  ('web-testing-basic','웹사이트 테스트와 오류 점검','deployment','테스트·배포·운영','기초','기능·모바일·접근성·성능을 순서대로 검사하고 오류를 기록합니다.','["완료 기준과 테스트 목록","기능·입력·오류 주소 검사","모바일·접근성·성능 검사","오류 보고와 회귀 테스트"]'::jsonb,'codex-review','mint','29','/edu/images/program-deployment.webp'),
  ('cicd-operation-project','CI/CD 자동 배포와 운영 실전','deployment','테스트·배포·운영','실전','GitHub Actions로 빌드·배포를 자동화하고 로그·복구 절차를 구성합니다.','["브랜치와 배포 전략","Actions 빌드·테스트 자동화","환경별 배포와 모니터링","장애 대응·롤백·운영 문서"]'::jsonb,'github-actions-check','mint','30','/edu/images/program-deployment.webp')
)
insert into public.edu_programs (
  id, title, category_id, category, level, duration, description, introduction,
  audience, goals, curriculum, preparations, related_lesson_ids,
  status, color, display_number, image_url, image_alt
)
select id, title, category_id, category, level, '4주 · 주 1회', description,
  description || ' 매주 쉬운 개념 설명과 직접 실습을 거쳐 마지막 주에 결과물을 완성합니다.',
  jsonb_build_array(category || ' 분야를 단계적으로 배우고 싶은 분', '직접 결과물을 완성하고 싶은 분'),
  jsonb_build_array('핵심 개념을 쉬운 말로 설명합니다.', '주차별 실습 결과물을 완성합니다.', '완성 결과를 점검하고 발표합니다.'),
  curriculum, jsonb_build_array('인터넷에 연결되는 노트북', '웹브라우저', '실습용 계정 또는 도구'),
  jsonb_build_array(lesson_id), '모집 예정', color, display_number, image_url,
  title || ' 교육의 주요 실습 과정을 보여주는 모습'
from expanded_programs
on conflict (id) do update set title=excluded.title, category_id=excluded.category_id, category=excluded.category, level=excluded.level, duration=excluded.duration, description=excluded.description, introduction=excluded.introduction, audience=excluded.audience, goals=excluded.goals, curriculum=excluded.curriculum, preparations=excluded.preparations, related_lesson_ids=excluded.related_lesson_ids, status=excluded.status, color=excluded.color, display_number=excluded.display_number, image_url=excluded.image_url, image_alt=excluded.image_alt;

-- 분야별 10개 구성을 완성하는 추가 프로그램 70개
with category_expansions(category_order, category_id, category, color, image_url, lesson_id, ids, titles, levels, focuses) as (
  values
  (1,'service-planning','서비스 기획','coral','/edu/images/program-foundation.webp','codex-request',
   array['planning-persona','planning-benchmark','planning-mvp','planning-policy','planning-kpi','planning-agile','planning-portfolio'],
   array['고객 페르소나와 사용자 여정','경쟁 서비스 벤치마킹','MVP 기능 우선순위 워크숍','웹서비스 화면·운영 정책 설계','서비스 KPI와 데이터 측정 설계','애자일 프로젝트와 스프린트 기획','서비스 기획 포트폴리오 완성'],
   array['입문','기초','기초','중급','중급','실전','프로젝트'],
   array['고객 유형과 이용 흐름 정리','경쟁 서비스 비교와 차별점 발견','핵심 기능 선정과 제작 범위 결정','정상·오류·예외 상황의 화면 정책 작성','목표 지표와 측정 이벤트 정의','백로그와 주간 실행 계획 운영','문제부터 성과까지 기획 사례 문서화']),
  (2,'uiux-design','UI·UX 웹디자인','violet','/edu/images/program-react.webp','responsive-layout',
   array['design-color-type','design-wireframe','design-mobile','design-prototype','design-accessibility','design-ecommerce','design-portfolio'],
   array['웹 색상과 타이포그래피 입문','Figma 와이어프레임 제작','모바일 앱 UI 디자인 기초','Figma 인터랙티브 프로토타입','접근성을 고려한 UI 디자인','쇼핑몰 UI·UX 프로젝트','웹디자이너 포트폴리오 완성'],
   array['입문','입문','기초','기초','중급','실전','프로젝트'],
   array['읽기 좋은 색상·글자·간격 구성','핵심 화면의 정보 구조와 배치 설계','터치 중심 모바일 화면과 이동 설계','클릭 가능한 화면 흐름과 전환 구현','대비·초점·대체 설명 디자인 점검','상품 탐색부터 주문까지 화면 설계','디자인 과정과 결과를 사례로 정리']),
  (3,'foundation','웹 기초','mint','/edu/images/program-foundation.webp','javascript-basics',
   array['foundation-html','foundation-css','javascript-practical','foundation-form','foundation-dom','foundation-storage','foundation-portfolio'],
   array['HTML 문서 구조 집중 과정','CSS 레이아웃 집중 과정','실무 JavaScript 완성 과정','웹 입력 폼과 유효성 검사','DOM과 이벤트 실습','localStorage 생활 웹앱 만들기','개인 소개 웹사이트 완성'],
   array['입문','입문','기초','기초','기초','실전','프로젝트'],
   array['의미 있는 태그와 웹 문서 구조 작성','박스·Flex·Grid를 이용한 화면 배치','문법부터 DOM·저장·비동기까지 실무 기능 완성','안전하고 이해하기 쉬운 입력 화면 구현','클릭·입력에 반응하는 화면 구현','새로고침 후에도 유지되는 브라우저 저장','반응형 개인 홈페이지 제작과 공개']),
  (4,'frontend','프런트엔드','violet','/edu/images/program-react.webp','react-components',
   array['frontend-router','frontend-form','frontend-query','frontend-performance','frontend-test','frontend-shop','frontend-portfolio'],
   array['React 라우팅과 다중 페이지 구성','React 폼과 입력 상태 관리','React 서버 데이터 관리','React 성능과 코드 분할','React 컴포넌트 테스트','React 쇼핑몰 프런트엔드','프런트엔드 포트폴리오 완성'],
   array['기초','기초','중급','중급','중급','실전','프로젝트'],
   array['주소에 따라 바뀌는 화면과 이동 구현','등록·수정 폼과 오류 안내 구현','API 캐시·재요청·로딩 상태 구성','느린 화면 분석과 필요한 코드만 불러오기','사용자 행동 중심의 화면 자동 검사','상품·장바구니·주문 화면 제작','기획·개발·배포 과정을 사례로 정리']),
  (5,'backend','백엔드','coral','/edu/images/program-backend.webp','node-json-api',
   array['backend-express','backend-validation','backend-upload','backend-email','backend-spring','backend-realtime','backend-project'],
   array['Express 서버 개발 입문','백엔드 입력 검증과 오류 처리','파일 업로드 API 만들기','이메일 알림 서비스 구현','Spring Boot 백엔드 입문','실시간 알림과 WebSocket','예약 서비스 백엔드 프로젝트'],
   array['입문','기초','중급','중급','기초','실전','프로젝트'],
   array['라우팅과 미들웨어가 있는 서버 구현','안전한 요청 검사와 일관된 오류 응답','파일 형식·크기 검사와 저장 흐름 구현','템플릿과 발송 상태를 관리하는 알림 기능','Java 기반 컨트롤러와 서비스 계층 구성','연결 상태와 실시간 메시지 처리','예약·취소·권한·동시성 API 완성']),
  (6,'database','데이터베이스','violet','/edu/images/program-database.webp','database-table-basics',
   array['database-postgresql','database-supabase','database-rls','database-index','database-backup','database-analytics','database-project'],
   array['PostgreSQL 실무 SQL','Supabase CRUD 집중 실습','RLS 데이터 보안 정책','인덱스와 SQL 성능 개선','데이터 백업과 복구 운영','교육 데이터 분석 SQL 프로젝트','게시판 데이터베이스 프로젝트'],
   array['기초','기초','중급','중급','중급','실전','프로젝트'],
   array['조인·서브쿼리·집계 쿼리 작성','공동 데이터를 등록·조회·수정·삭제','사용자와 역할에 따른 행 단위 권한 적용','실행 계획을 이용한 느린 조회 개선','백업 주기·검증·복구 훈련 구성','학습·신청 데이터를 지표로 분석','회원·게시글·댓글·권한 스키마 완성']),
  (7,'ai-development','AI 활용 개발','violet','/edu/images/program-codex.webp','codex-request',
   array['ai-codex-start','ai-debug','ai-docs','ai-api','ai-rag','ai-evaluation','ai-project'],
   array['Codex로 개발 시작하기','AI와 함께 오류 해결하기','AI로 개발 문서와 매뉴얼 작성','생성형 AI API 연동 기초','내 자료를 찾는 RAG 서비스 입문','AI 결과 품질 평가와 개선','AI 교육 도우미 웹서비스 프로젝트'],
   array['입문','기초','기초','중급','중급','실전','프로젝트'],
   array['파일 확인부터 작은 수정과 검증까지 경험','오류 정보 수집과 단계별 원인 진단','README·사용법·운영 절차 자동 초안 작성','서버 측 AI 호출과 안전한 결과 표시','문서 검색과 근거 기반 답변 흐름 설계','평가 기준·테스트 자료·품질 기록 구성','질문·답변·검토가 있는 AI 서비스 완성']),
  (8,'security-infrastructure','보안·네트워크·인프라','mint','/edu/images/program-database.webp','api-validation',
   array['security-password','security-network','security-webattack','security-cloud','security-linux','security-monitoring','security-project'],
   array['계정·비밀번호·MFA 보안','웹 네트워크와 HTTP·DNS 기초','웹 공격과 안전한 코딩 기초','AWS 클라우드 인프라 입문','Linux 서버 운영 기초','서버 모니터링과 로그 분석','안전한 웹서비스 구축 프로젝트'],
   array['입문','입문','기초','기초','중급','실전','프로젝트'],
   array['안전한 로그인과 다중 인증 습관 적용','브라우저부터 서버까지 연결 흐름 이해','XSS·인젝션·CSRF 원리와 방어 점검','서버·네트워크·스토리지 기본 구성','계정·권한·서비스·로그 기본 관리','상태 지표·로그·경보로 이상 발견','인증·권한·HTTPS·점검표 통합 적용']),
  (9,'content-analytics','콘텐츠·데이터 분석','coral','/edu/images/program-codex.webp','codex-review',
   array['content-writing','content-image','content-calendar','content-newsletter','content-ga','content-experiment','content-project'],
   array['읽기 쉬운 웹 글쓰기','웹 이미지 제작과 저작권 기초','월간 콘텐츠 캘린더 운영','뉴스레터 콘텐츠 기획','웹 분석 도구 기초','콘텐츠 A/B 테스트 실습','교육 콘텐츠 운영 프로젝트'],
   array['입문','입문','기초','기초','중급','실전','프로젝트'],
   array['독자 질문에 답하는 제목과 본문 작성','합법적 이미지 선택·편집·대체 설명 작성','주제·담당·발행일·검수 상태 관리','구독자가 기다리는 정기 콘텐츠 구성','방문·유입·전환 지표 확인과 해석','가설·비교안·측정·판단 과정 운영','기획·제작·발행·분석의 한 달 운영']),
  (10,'deployment','테스트·배포·운영','mint','/edu/images/program-deployment.webp','github-actions-check',
   array['deploy-git','deploy-pages','deploy-vercel','deploy-test','deploy-monitor','deploy-docker','deploy-project'],
   array['Git과 GitHub 버전관리 입문','GitHub Pages 정적 사이트 배포','Vercel 프런트엔드 배포','웹 자동 테스트와 품질 검사','서비스 로그와 모니터링 입문','Docker 컨테이너 배포 기초','무중단 배포와 운영 프로젝트'],
   array['입문','기초','기초','중급','중급','실전','프로젝트'],
   array['변경 기록·복구·원격 저장의 기본 활용','Vite 빌드와 Actions 자동 공개 구성','저장소 연결과 환경별 배포 확인','빌드 전에 실행되는 기능·화면 검사 구성','오류·성능·가용성 지표와 경보 확인','같은 실행 환경을 이미지로 만들고 배포','배포·점검·롤백·장애 대응 절차 완성'])
), expanded_rows as (
  select e.*, p.id, p.title, p.level, p.focus, p.position
  from category_expansions e
  cross join lateral unnest(e.ids, e.titles, e.levels, e.focuses) with ordinality as p(id, title, level, focus, position)
)
insert into public.edu_programs (
  id, title, category_id, category, level, duration, description, introduction,
  audience, goals, curriculum, preparations, related_lesson_ids,
  status, color, display_number, image_url, image_alt
)
select id, title, category_id, category, level, '4주 · 주 1회',
  focus || '을(를) 단계별 실습으로 배우는 과정입니다.',
  focus || '을(를) 단계별 실습으로 배우며 마지막 주에 결과물을 완성합니다.',
  jsonb_build_array(category || ' 분야를 더 깊게 배우고 싶은 분', '직접 결과물을 만들며 익히고 싶은 분'),
  jsonb_build_array(focus || '의 핵심 개념을 설명합니다.', '단계별 실습을 직접 수행합니다.', '완성 결과를 점검하고 개선합니다.'),
  jsonb_build_array(focus || ' 핵심 개념', focus || ' 따라하기', focus || ' 응용 실습', title || ' 결과물 완성과 발표'),
  jsonb_build_array('인터넷에 연결되는 노트북', '웹브라우저', '분야별 실습 도구 또는 계정'),
  jsonb_build_array(lesson_id, 'codex-review'), '모집 예정', color,
  lpad((30 + ((category_order - 1) * 7) + position)::text, 2, '0'), image_url,
  title || ' 교육의 주요 실습 과정을 보여주는 모습'
from expanded_rows
on conflict (id) do update set title=excluded.title, category_id=excluded.category_id, category=excluded.category, level=excluded.level, duration=excluded.duration, description=excluded.description, introduction=excluded.introduction, audience=excluded.audience, goals=excluded.goals, curriculum=excluded.curriculum, preparations=excluded.preparations, related_lesson_ids=excluded.related_lesson_ids, status=excluded.status, color=excluded.color, display_number=excluded.display_number, image_url=excluded.image_url, image_alt=excluded.image_alt;

-- 모든 교육 프로그램에 프로그램 ID와 일치하는 개별 대표 이미지를 연결합니다.
update public.edu_programs
set image_url = '/edu/images/programs/' || id || '.webp',
    image_alt = title || ' 교육의 핵심 실습 장면을 표현한 일러스트';

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
  'github-first-push', 'GitHub에 소스 올리기', 'deployment', '테스트·배포·운영', '기초', '25분',
  '프로젝트 변경 내용을 기록하고 GitHub 저장소에 보관합니다.',
  'Git은 변경 기록을 관리하는 노트이고 GitHub는 그 노트를 보관하는 온라인 서랍입니다.',
  '["Git과 GitHub의 차이를 이해합니다.", "비밀 정보가 올라가지 않는지 확인합니다."]'::jsonb,
  '["git status로 변경 파일을 확인합니다.", "비밀 파일 제외 여부를 확인합니다.", "변경 내용을 기록하고 업로드합니다."]'::jsonb,
  'Shell', E'git status\ngit add .\ngit commit -m "교육자료 화면 개선"',
  'GitHub에 소스를 올리기 전 확인해야 할 파일과 비밀 정보 점검 순서를 알려줘.',
  '[".env.local과 비밀번호가 포함되지 않았나요?"]'::jsonb, 'github-pages-publish'
),
(
  'github-pages-publish', 'GitHub Pages로 홈페이지 공개하기', 'deployment', '테스트·배포·운영', '기초', '30분',
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
('github-actions-check','GitHub Actions 배포 확인하기','deployment','테스트·배포·운영','기초','20분','자동 배포 진행 상태와 오류 위치를 확인합니다.','Actions는 정해 둔 일을 실행하는 자동 작업자입니다.','["실행 상태를 구분합니다.","첫 오류를 찾습니다."]','["Actions를 엽니다.","최근 실행을 고릅니다.","Build와 Deploy를 봅니다.","첫 오류를 읽습니다."]','터미널',E'npm install\nnpm run build','최신 Actions 배포 실패 원인을 로그에서 찾고 복구 순서를 알려줘.','["최신 실행을 봤나요?","Build와 Deploy가 성공인가요?"]','github-pages-publish','github-vercel',false,false,'2026-08-26')
on conflict (id) do update set
  title=excluded.title, category_id=excluded.category_id, category=excluded.category,
  level=excluded.level, duration=excluded.duration, description=excluded.description,
  explanation=excluded.explanation, goals=excluded.goals, steps=excluded.steps,
  code_language=excluded.code_language, code=excluded.code, prompt=excluded.prompt,
  checklist=excluded.checklist, next_lesson_id=excluded.next_lesson_id,
  related_program_id=excluded.related_program_id, is_featured=excluded.is_featured,
  is_popular=excluded.is_popular, published_at=excluded.published_at;

-- 기존 18개를 유지하고 프로그램별 핵심 실습 82개를 추가하여 분야별 10개, 총 100개를 만듭니다.
with lesson_targets(category_id, existing_count) as (
  values
  ('service-planning',0),('uiux-design',0),('foundation',3),('frontend',3),('backend',3),
  ('database',3),('ai-development',3),('security-infrastructure',0),('content-analytics',0),('deployment',3)
), ranked_programs as (
  select p.*, t.existing_count,
    row_number() over (partition by p.category_id order by p.display_number::integer, p.id) as category_row
  from public.edu_programs p
  join lesson_targets t on t.category_id = p.category_id
), selected_programs as (
  select * from ranked_programs where category_row <= 10 - existing_count
)
insert into public.edu_lessons (
  id, title, category_id, category, level, duration, description, explanation,
  goals, steps, code_language, code, prompt, checklist, next_lesson_id,
  related_program_id, is_featured, is_popular, published_at,
  slide_url, pdf_url, material_version, slide_pages
)
select
  'program-' || id || '-lesson', title || ' 핵심 실습', category_id, category, level,
  case when category_row % 3 = 1 then '15분' when category_row % 3 = 2 then '20분' else '30분' end,
  title || ' 과정에서 꼭 알아야 할 내용을 짧은 실습으로 익힙니다.',
  coalesce(curriculum->>0, title) || '은(는) ' || category || ' 작업을 완성하기 위한 핵심 단계입니다. 쉬운 예를 보고 같은 순서로 따라 하면 됩니다.',
  jsonb_build_array(coalesce(curriculum->>0, title) || '의 의미를 설명합니다.', '예제를 직접 실행하고 결과를 확인합니다.', '내 프로젝트에 맞게 한 부분을 수정합니다.'),
  jsonb_build_array(coalesce(curriculum->>0, title) || '에서 필요한 입력과 결과를 적습니다.', '예제 내용을 그대로 실행합니다.', '문구나 값을 한 가지 바꿉니다.', '변경 전후를 비교하고 기록합니다.'),
  case category_id
    when 'service-planning' then '문서 예시' when 'uiux-design' then 'CSS' when 'foundation' then 'HTML·JavaScript'
    when 'frontend' then 'React JSX' when 'backend' then 'JavaScript' when 'database' then 'SQL'
    when 'ai-development' then '요청문' when 'security-infrastructure' then '점검표'
    when 'content-analytics' then '분석 예시' else '터미널' end,
  case category_id
    when 'service-planning' then E'사용자: 처음 방문한 성인\n문제: 무엇부터 배울지 어렵다\n해결: 단계별 추천 과정을 보여준다'
    when 'uiux-design' then E'.card {\n  padding: 24px;\n  border-radius: 16px;\n}'
    when 'foundation' then E'<button id="start">학습 시작</button>\n<script>document.querySelector("#start").onclick = () => alert("시작합니다")</script>'
    when 'frontend' then E'function PracticeCard({ title }) {\n  return <article><h2>{title}</h2></article>\n}'
    when 'backend' then E'app.get("/api/practice", (req, res) => {\n  res.json({ ok: true })\n})'
    when 'database' then E'select category, count(*)\nfrom edu_lessons\ngroup by category;'
    when 'ai-development' then E'작업 위치와 목표를 확인해줘.\n기존 기능을 유지하고 완료 후 확인 방법을 알려줘.'
    when 'security-infrastructure' then E'1. 비밀 키 확인\n2. 입력 길이 제한 확인\n3. 관리자 권한 확인'
    when 'content-analytics' then E'목표: 학습 시작률 높이기\n지표: 상세 보기 대비 시작 클릭률'
    else E'git status\nnpm run build' end,
  title || ' 실습을 코딩 초보자도 따라 할 수 있게 한 단계씩 안내하고 완료 후 확인 방법도 알려줘.',
  jsonb_build_array('예제를 직접 실행했나요?', '한 가지 이상 내 상황에 맞게 수정했나요?', '결과를 말로 설명할 수 있나요?'),
  null, id, (existing_count = 0 and category_row = 1), (category_row = 2),
  date '2026-09-02' + (((category_row - 1) % 9)::integer), '', '', '1.0', 0
from selected_programs
on conflict (id) do update set
  title=excluded.title, category_id=excluded.category_id, category=excluded.category,
  level=excluded.level, duration=excluded.duration, description=excluded.description,
  explanation=excluded.explanation, goals=excluded.goals, steps=excluded.steps,
  code_language=excluded.code_language, code=excluded.code, prompt=excluded.prompt,
  checklist=excluded.checklist, next_lesson_id=excluded.next_lesson_id,
  related_program_id=excluded.related_program_id, is_featured=excluded.is_featured,
  is_popular=excluded.is_popular, published_at=excluded.published_at,
  slide_url=excluded.slide_url, pdf_url=excluded.pdf_url,
  material_version=excluded.material_version, slide_pages=excluded.slide_pages;

-- 기존 7개 자료에도 관련 프로그램과 홈 추천 정보를 연결합니다.
update public.edu_lessons set related_program_id='web-foundation', is_popular=(id='html-first-page'), is_featured=(id='css-first-style') where id in ('html-first-page','css-first-style','javascript-basics');
update public.edu_lessons set related_program_id='react-website', is_popular=true where id='react-components';
update public.edu_lessons set related_program_id='codex-first-service', is_popular=true where id='codex-request';
update public.edu_lessons set related_program_id='github-vercel', is_popular=(id='github-first-push'), is_featured=(id='github-pages-publish') where id in ('github-first-push','github-pages-publish');

-- 실제 PPT와 PDF 파일이 준비된 기존 18개 교육자료에만 다운로드 주소를 연결합니다.
update public.edu_lessons
set slide_url = '/edu/materials/' || category_id || '/' || id || '.pptx',
    pdf_url = '/edu/materials/' || category_id || '/' || id || '.pdf',
    material_version = '1.0',
    slide_pages = 8
where id not like 'program-%-lesson';

update public.edu_lessons
set material_version = '2.0', slide_pages = 15
where id in ('html-first-page', 'react-components', 'node-json-api', 'supabase-crud', 'codex-request', 'github-first-push');

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

-- 별도 프로그램으로 추가했던 이전 12주 과정이 남아 있다면 제거합니다.
delete from public.edu_programs where id = 'vibe-coding-fullstack';

-- 실무 JavaScript 과정으로 교체한 이전 프로그램 ID를 제거합니다.
delete from public.edu_programs where id = 'foundation-js';

-- 10일차 가격 표시 확인용 기본값입니다. 실제 판매 전 운영자가 가격을 다시 검토하세요.
update public.edu_programs set regular_price = 0, sale_price = 0, is_free = true, sale_status = 'on_sale'
where id = 'web-foundation';
update public.edu_programs set regular_price = 390000, sale_price = 290000, is_free = false, sale_status = 'on_sale'
where id = 'react-website';
update public.edu_programs set regular_price = 420000, sale_price = 320000, is_free = false, sale_status = 'on_sale'
where id = 'node-backend';

-- 기존 프로그램의 학습 단계 기본값을 채우고 시니어 대표 과정 3개를 추가합니다.
update public.edu_programs set learning_track = case when level in ('중급', '실전', '프로젝트', '고급') then '실무' else '입문' end where learning_track is null or learning_track <> '시니어';

insert into public.edu_programs (
  id,title,category_id,category,level,learning_track,duration,description,introduction,audience,goals,curriculum,preparations,related_lesson_ids,status,color,display_number,image_url,image_alt
) values
('senior-react-refactoring','React 리팩터링 실무','frontend','프런트엔드','고급','시니어','6주 · 주 1회','복잡해진 React 화면을 측정하고 안전하게 분리·최적화·검증합니다.','운영 중인 React 코드를 단계적으로 개선하고 테스트 가능한 구조로 만듭니다.','["React 운영 개발자","코드 리뷰 역량을 강화하려는 개발자"]','["문제를 측정합니다.","상태 경계를 설계합니다.","회귀 테스트로 동작을 보존합니다."]','["거대 컴포넌트 분리","파생 상태 제거","요청 경쟁 조건","성능 측정","오류 복구","PR 회귀 검증"]','["React 프로젝트","Node.js 22 LTS","Chrome 개발자 도구"]','[]','모집 예정','violet','101','/edu/images/program-react.webp','React 운영 코드를 검토하고 개선하는 개발자'),
('senior-supabase-rls','Supabase 인증·RLS 보안','database','데이터베이스','고급','시니어','6주 · 주 1회','인증과 데이터 권한을 공격자 관점에서 설계하고 검증합니다.','PostgreSQL RLS로 사용자·관리자·서버 권한을 분리하고 우회 접근을 시험합니다.','["Supabase 운영 개발자","RLS 정책을 검증하려는 개발자"]','["위협 모델을 작성합니다.","최소 권한 RLS를 설계합니다.","권한 우회를 검증합니다."]','["UI 권한 우회","사용자 행 격리","관리자 상승 차단","Definer 함수","서비스 키 대응","RLS 회귀 테스트"]','["Supabase 테스트 프로젝트","역할별 계정","SQL Editor"]','[]','모집 예정','mint','102','/edu/images/program-database.webp','사용자별 RLS 데이터 접근을 검증하는 개발자'),
('senior-payment-reliability','결제 시스템 안정화','backend','백엔드','고급','시니어','6주 · 주 1회','주문·승인·웹훅을 중복과 부분 실패에 견디도록 설계합니다.','서버 가격 검증, 멱등성, 상태 전이, 웹훅과 장애 복구를 실습합니다.','["결제 연동 개발자","분산 실패와 복구를 설계하려는 개발자"]','["서버 가격을 검증합니다.","중복 승인을 방지합니다.","복구 절차를 만듭니다."]','["금액 변조 차단","중복 주문 제어","승인 멱등성","부분 실패","웹훅 검증","대사와 복구"]','["Vercel 테스트 환경","토스 테스트 키","Supabase 프로젝트"]','[]','모집 예정','coral','103','/edu/images/program-backend.webp','주문과 결제 승인 상태를 검증하는 개발자')
on conflict (id) do update set title=excluded.title,category_id=excluded.category_id,category=excluded.category,level=excluded.level,learning_track=excluded.learning_track,duration=excluded.duration,description=excluded.description,introduction=excluded.introduction,audience=excluded.audience,goals=excluded.goals,curriculum=excluded.curriculum,preparations=excluded.preparations,status=excluded.status,color=excluded.color,display_number=excluded.display_number,image_url=excluded.image_url,image_alt=excluded.image_alt;

update public.edu_programs set duration='12주 · 주 1회', curriculum='["거대 컴포넌트 분리","파생 상태 제거","요청 경쟁 조건","성능 측정","오류 복구","PR 회귀 검증","접근성 컴포넌트 API","Context 결합도","서버 데이터 캐시","번들 경계","테스트 전략","아키텍처 최종 리뷰"]'::jsonb where id='senior-react-refactoring';
update public.edu_programs set duration='12주 · 주 1회', curriculum='["UI 권한 우회","사용자 행 격리","관리자 상승 차단","Definer 함수","서비스 키 대응","RLS 회귀 테스트","세션과 토큰","다중 테넌트","Storage 정책","Auth 리디렉션","정책 성능","보안 사고 대응"]'::jsonb where id='senior-supabase-rls';
update public.edu_programs set duration='12주 · 주 1회', curriculum='["금액 변조 차단","중복 주문 제어","승인 멱등성","부분 실패","웹훅 검증","대사와 복구","취소와 수강권","동시성 제어","타임아웃과 재시도","로그 최소화","부하와 요청 제한","운영 장애 훈련"]'::jsonb where id='senior-payment-reliability';

-- 실행 결과 확인: 교육 프로그램 103개, 교육자료 100개, 공지사항 3개가 정상입니다.
select '교육 프로그램' as item, count(*) as saved_count from public.edu_programs
union all
select '교육자료', count(*) from public.edu_lessons
union all
select '공지사항', count(*) from public.edu_notices;

-- 분야별 교육자료가 각각 10개인지 확인합니다.
select category, count(*) as lesson_count
from public.edu_lessons
group by category
order by category;


# EDU 웹개발 교육 플랫폼

코딩 경험이 거의 없는 성인 학습자가 교육 프로그램과 학습 자료를 살펴보고, 직접 실행하고 확인하며 웹개발을 배울 수 있는 교육용 홈페이지입니다.

## 공개 홈페이지

- 홈페이지: https://cursaman.github.io/edu/
- 교육자료: https://cursaman.github.io/edu/#/lessons
- 관리자 화면: https://cursaman.github.io/edu/#/admin
- GitHub 저장소: https://github.com/cursaman/edu

## 사용 기술

- React: 화면을 메뉴, 카드처럼 다시 사용할 수 있는 작은 부품으로 나눕니다.
- Vite: 개발 화면을 실행하고 배포용 파일을 만듭니다.
- JavaScript: 메뉴 이동, 검색, 필터와 버튼 동작을 작성합니다.
- Node.js 22와 npm: 프로젝트에 필요한 도구를 설치하고 실행합니다.
- Supabase: 교육 프로그램, 교육자료와 공지사항을 공동 저장하고 관리자 로그인을 확인합니다.
- localStorage: 학습 완료와 신청 체험 내용을 현재 브라우저에만 저장합니다.
- GitHub Actions: 소스 변경 시 빌드와 배포를 자동으로 실행합니다.
- GitHub Pages: 완성된 화면을 실제 인터넷 주소로 공개합니다.

## 프로젝트 위치

```text
C:\Users\sbs\Documents\Codex\2026-08-21\edu\app
```

## 로컬 실행 방법

```powershell
cd C:\Users\sbs\Documents\Codex\2026-08-21\edu\app
npm install
npm run dev
```

개발 서버가 실행되면 브라우저에서 다음 주소를 엽니다.

```text
http://localhost:5173/edu/
```

포트 번호는 컴퓨터 상태에 따라 달라질 수 있으므로 터미널에 표시된 실제 주소를 확인하세요. `index.html` 파일을 직접 열지 말고 반드시 `npm run dev`로 실행해야 합니다.

## 배포용 빌드

```powershell
npm run build
```

빌드(인터넷에 공개할 파일을 만드는 작업)가 성공하면 `dist` 폴더가 생성됩니다. `dist`, `node_modules`, 환경변수 파일은 Git에 저장하지 않습니다. `main` 브랜치에 변경 내용을 올리면 GitHub Actions가 자동으로 빌드하고 GitHub Pages에 배포합니다.

## 폴더 구조

```text
app/
├─ .github/workflows/deploy-pages.yml   GitHub Pages 자동 배포
├─ .env.example                        필요한 공개 환경변수 이름 안내
├─ .env.local                          내 컴퓨터의 연결 정보: Git 업로드 금지
├─ index.html                          화면이 시작되는 HTML
├─ package.json                        프로젝트 실행 명령과 도구 목록
├─ public/images/                      메인·교육 프로그램 WebP 이미지
├─ supabase/schema.sql                 테이블과 관리자 권한 정책 생성
├─ supabase/seed.sql                   프로그램 3개, 교육자료 7개, 공지 3개 등록
├─ vite.config.js                      GitHub Pages /edu/ 경로 설정
└─ src/
   ├─ App.jsx                          화면 주소와 페이지 연결
   ├─ main.jsx                         React 화면 실행과 오류 안내
   ├─ components/
   │  ├─ Header.jsx                    PC·모바일 상단 메뉴
   │  ├─ CategoryCard.jsx              교육 분야 카드
   │  ├─ ProgramCard.jsx               교육 프로그램 카드
   │  └─ LessonCard.jsx                교육자료 카드
   ├─ data/
   │  ├─ catalog.js                    교육 분야와 프로그램 정보
   │  ├─ lessons.js                    초보자용 교육자료
   │  ├─ learningProgress.js           학습 완료 저장
   │  ├─ notices.js                    공지사항 예시
   │  ├─ contentStorage.js             프로그램·교육자료·공지사항 공동 저장 연결
   │  └─ applicationStorage.js         수강 신청 체험 저장
   ├─ lib/supabase.js                  Supabase 공개 키 연결과 관리자 확인
   ├─ pages/AdminLoginPage.jsx         관리자 이메일·비밀번호 로그인
   ├─ pages/                           홈, 목록, 상세, 신청 화면
   └─ styles/global.css                PC·모바일 디자인
```

## 구현 기능

- 홈페이지 소개, 프로그램 수, 교육자료 수, 학습 진행 현황
- PC 메뉴와 모바일 열기·닫기 메뉴
- 교육 분야 10개와 교육 프로그램 10개
- 프로그램 분야별 필터와 상세 화면
- 교육자료 7개, 검색, 분야별 필터와 상세 학습 내용
- 학습 완료 기록 저장 및 취소
- 공지사항 3개와 상세 화면
- 수강 신청 입력 검증, 브라우저 저장과 삭제 체험
- 잘못된 주소에 대한 페이지 찾을 수 없음 안내
- GitHub Actions 자동 빌드와 GitHub Pages 배포
- Supabase 관리자 로그인과 관리자 권한 확인
- 프로그램·교육자료·공지 등록·수정·삭제·기본값 복원 및 다른 브라우저와 공유
- 프로그램별 학습 대상, 목표, 회차별 과정, 준비물, 관련 교육자료 직접 관리
- 메인 대표 이미지와 프로그램별 대표 이미지·대체 설명
- 모든 공개 테이블의 행 수준 보안(RLS: 자료마다 접근 권한을 검사하는 정책)

## Supabase 가입과 프로젝트 연결

1. https://supabase.com/ 에서 계정을 만들고 로그인합니다.
2. `New project`를 선택해 프로젝트를 생성합니다.
3. 프로젝트의 `Settings` 또는 `Connect` 화면에서 프로젝트 주소와 `publishable key`를 확인합니다.
4. 프로젝트 폴더의 `.env.example`을 참고해 `.env.local`을 준비합니다.

```text
VITE_SUPABASE_URL=여기에_프로젝트_주소
VITE_SUPABASE_PUBLISHABLE_KEY=여기에_브라우저용_공개_키
```

5. 개발 서버가 실행 중이었다면 중지한 다음 `npm run dev`를 다시 실행합니다.

`VITE_`로 시작하는 값은 완성된 브라우저 화면에 포함됩니다. 따라서 프로젝트 주소와 `publishable key`만 넣어야 합니다. `service_role` 키, 비밀 키, 관리자 비밀번호는 절대 넣지 않습니다. `.env.local`은 `.gitignore`에 등록되어 GitHub에 올라가지 않습니다.

## 테이블 생성과 기본 자료 등록

1. Supabase 프로젝트 화면에서 `SQL Editor`를 엽니다.
2. `supabase/schema.sql`의 전체 내용을 복사해 새 쿼리에 붙여 넣고 `Run`을 누릅니다.
3. 실행에 성공하면 `supabase/seed.sql`도 같은 방법으로 실행합니다.
4. `Table Editor`에서 `edu_programs` 3개, `edu_lessons` 7개와 `edu_notices` 3개를 확인합니다.
5. 기존 프로젝트라면 최신 `schema.sql`과 `seed.sql`을 다시 실행해 프로그램 테이블만 추가할 수 있습니다. 기존 자료는 덮어쓰지 않습니다.
6. `admin_profiles` 테이블은 관리자 권한을 지정하는 곳이며 처음에는 비어 있습니다.

RLS(Row Level Security: 데이터 한 줄마다 읽기·쓰기 권한을 검사하는 장치)는 네 테이블 모두에 적용됩니다. 프로그램, 교육자료와 공지사항은 누구나 읽을 수 있지만 등록, 수정, 삭제는 관리자만 가능합니다. 일반 사용자는 관리자 권한을 스스로 추가하거나 변경할 수 없습니다.

## 관리자 계정과 권한 등록

1. Supabase의 `Authentication` → `Users`에서 `Add user`를 선택합니다.
2. 운영 담당자가 관리자 이메일과 비밀번호를 직접 입력해 계정을 만듭니다.
3. 생성된 사용자의 `User UID`를 복사합니다.
4. `SQL Editor`에서 아래 예시의 UUID만 실제 사용자 UUID로 바꾸어 실행합니다.

```sql
insert into public.admin_profiles (user_id, is_admin)
values ('여기에-관리자-사용자-UUID-입력', true)
on conflict (user_id) do update set is_admin = excluded.is_admin;
```

5. `#/admin` 주소에서 관리자 이메일과 비밀번호로 로그인합니다.
6. 로그인에 성공해도 `admin_profiles`에 관리자 권한이 없다면 관리자 화면에 들어갈 수 없습니다.
7. 작업이 끝나면 관리자 화면의 `로그아웃`을 누릅니다.

관리자 이메일과 비밀번호는 코드, SQL 파일, GitHub 저장소, localStorage에 직접 작성하지 않습니다. 로그인은 Supabase Auth가 처리합니다.

## GitHub Pages에서 Supabase 연결하기

GitHub 저장소의 `Settings` → `Secrets and variables` → `Actions` → `Variables`에서 다음 저장소 변수를 추가합니다.

- `VITE_SUPABASE_URL`: Supabase 프로젝트 주소
- `VITE_SUPABASE_PUBLISHABLE_KEY`: 브라우저에서 사용 가능한 publishable key

GitHub Actions는 배포용 화면을 만들 때 이 두 변수를 사용합니다. 공개용 키는 브라우저에서 사용할 수 있도록 만들어진 값이지만, 실제 접근 권한은 반드시 RLS로 제한해야 합니다. `service_role` 키와 관리자 비밀번호는 저장소 변수나 브라우저 코드에 입력하면 안 됩니다.

GitHub 변수가 준비되지 않았다면 공개 홈페이지는 기존 기본 자료와 브라우저 체험 화면으로 동작하므로 백지 화면이 되지 않습니다. 공동 저장과 실제 관리자 로그인은 연결 변수를 설정하고 다시 배포한 후 사용할 수 있습니다.

## 관리자 화면과 보안 주의사항

관리자 화면 주소는 `#/admin`입니다. Supabase가 연결되면 로그인한 사용자 중 관리자 권한이 등록된 계정만 접근할 수 있습니다.

- Supabase 연결 시 프로그램, 교육자료와 공지사항 변경이 다른 브라우저와 컴퓨터에도 공유됩니다.
- 공동 저장 상태에서 기본 자료로 복원하면 모든 사용자에게 변경 내용이 반영됩니다.
- 학습 완료와 수강 신청 체험은 현재 브라우저의 localStorage에만 저장됩니다.
- Supabase 연결 정보가 없는 경우에는 기존 브라우저 전용 관리자 체험 화면이 표시됩니다.
- 체험 신청에는 실제 이름, 실제 전화번호, 비밀번호를 입력하면 안 됩니다.
- 브라우저 코드와 GitHub에는 `service_role` 키, 비밀 키, 관리자 계정 정보를 저장하지 않습니다.

## 교육 프로그램 관리 방법

1. `#/admin`에서 관리자 계정으로 로그인합니다.
2. `교육 프로그램 관리`를 선택합니다.
3. `새로 등록`을 누르거나 기존 프로그램의 `수정`을 선택합니다.
4. 프로그램명, 교육 분야, 난이도, 기간, 모집 상태, 소개를 입력합니다.
5. 학습 대상, 학습 목표, 회차별 교육 과정, 준비물은 한 줄에 하나씩 적습니다.
6. 함께 보여줄 교육자료를 선택합니다. 선택하지 않으면 같은 분야의 자료가 연결됩니다.
7. `프로그램 저장하기`를 누르면 홈페이지 첫 화면, 프로그램 목록·상세, 분야별 개수와 수강 신청 체험 목록에 함께 반영됩니다.
8. 이미지 주소와 이미지 대체 설명을 입력하면 프로그램 카드와 상세 화면에 함께 반영됩니다. 이미지가 없거나 주소가 잘못되면 기본 대표 이미지가 표시됩니다.

`edu_programs` 테이블이 없다는 안내가 나오면 `SQL Editor`에서 최신 `supabase/schema.sql`과 `supabase/seed.sql`을 순서대로 실행하세요. 프로그램 수정은 관리자만 할 수 있으며 실제 개인정보나 비밀번호는 입력하지 않습니다.

기본 이미지는 `public/images`에 WebP 형식으로 저장되어 있습니다. 외부 이미지 주소를 사용할 때는 저작권과 HTTPS 주소 여부를 확인하고, 화면을 보지 못하는 사용자를 위해 대체 설명을 함께 작성하세요.

## localStorage의 의미와 한계

localStorage는 웹브라우저 안에 간단한 내용을 보관하는 작은 메모장입니다. 학습 완료 표시와 수강 신청 체험 내용은 서버가 아니라 현재 컴퓨터의 현재 브라우저에만 남습니다.

- 다른 컴퓨터나 다른 브라우저에는 자동으로 전달되지 않습니다.
- 브라우저 저장 데이터를 지우면 기록도 함께 삭제됩니다.
- 로그인, 암호화, 백업 또는 실제 접수 기능을 대신할 수 없습니다.
- 실제 이름, 실제 전화번호, 비밀번호, API 키 등 개인정보나 비밀 정보를 입력하면 안 됩니다.
- 수강 신청 화면은 교육용 체험일 뿐이며 외부 전송이나 실제 접수는 이루어지지 않습니다.

## 구현하지 않은 기능

- 일반 사용자 회원가입과 로그인
- 학습 완료 기록의 서버 저장
- 실제 수강 신청 접수와 개인정보 수집
- 결제, 이메일 발송, 문자 발송
- 외부 API와 교육자료 API
- AI 자동 글 작성

## 최종 확인 순서

1. 홈페이지와 모든 상단 메뉴가 열리는지 확인합니다.
2. 프로그램 필터와 교육자료 검색을 확인합니다.
3. 학습 완료 후 새로고침해 표시가 유지되는지 확인합니다.
4. 가짜 이름과 가짜 번호로 신청 저장과 삭제를 확인합니다.
5. 공지사항 목록과 상세 화면을 확인합니다.
6. 휴대전화 크기에서 메뉴를 열고 닫아 봅니다.
7. `npm run build` 성공 후 GitHub Pages 주소를 확인합니다.


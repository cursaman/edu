# EDU 웹개발 교육 플랫폼

코딩 경험이 거의 없는 성인 학습자가 교육 프로그램과 학습 자료를 살펴보고, 직접 실행하고 확인하며 웹개발을 배울 수 있는 교육용 홈페이지입니다.

## 공개 홈페이지

- 홈페이지: https://cursaman.github.io/edu/
- 교육자료: https://cursaman.github.io/edu/#/lessons
- 관리자 체험: https://cursaman.github.io/edu/#/admin
- GitHub 저장소: https://github.com/cursaman/edu

## 사용 기술

- React: 화면을 메뉴, 카드처럼 다시 사용할 수 있는 작은 부품으로 나눕니다.
- Vite: 개발 화면을 실행하고 배포용 파일을 만듭니다.
- JavaScript: 메뉴 이동, 검색, 필터와 버튼 동작을 작성합니다.
- Node.js 22와 npm: 프로젝트에 필요한 도구를 설치하고 실행합니다.
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
├─ index.html                          화면이 시작되는 HTML
├─ package.json                        프로젝트 실행 명령과 도구 목록
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
   │  ├─ contentStorage.js             교육자료·공지사항 브라우저 관리
   │  └─ applicationStorage.js         수강 신청 체험 저장
   ├─ pages/                           홈, 목록, 상세, 신청 화면
   └─ styles/global.css                PC·모바일 디자인
```

## 구현 기능

- 홈페이지 소개, 프로그램 수, 교육자료 수, 학습 진행 현황
- PC 메뉴와 모바일 열기·닫기 메뉴
- 교육 분야 6개와 교육 프로그램 3개
- 프로그램 분야별 필터와 상세 화면
- 교육자료 7개, 검색, 분야별 필터와 상세 학습 내용
- 학습 완료 기록 저장 및 취소
- 공지사항 3개와 상세 화면
- 수강 신청 입력 검증, 브라우저 저장과 삭제 체험
- 잘못된 주소에 대한 페이지 찾을 수 없음 안내
- GitHub Actions 자동 빌드와 GitHub Pages 배포
- 관리자 체험 화면, 교육자료·공지 등록·수정·삭제·기본값 복원

## 관리자 체험 화면과 보안 주의사항

관리자 화면 주소는 `#/admin`입니다. 이 화면은 운영 기능을 이해하기 위한 체험용이며 실제 관리자 인증이나 접근 제한 기능이 아닙니다.

- 누구나 관리자 체험 주소에 접속할 수 있습니다.
- 교육자료와 공지사항 변경은 현재 사용 중인 브라우저에만 저장됩니다.
- 다른 사용자나 다른 컴퓨터에 변경 사항이 공유되지 않습니다.
- 기본 자료로 복원하면 해당 브라우저의 변경 기록만 삭제됩니다.
- 체험 신청에는 실제 이름, 실제 전화번호, 비밀번호를 입력하면 안 됩니다.
- 실제 서비스 운영에는 별도의 관리자 인증, 서버, 권한 관리, 데이터베이스가 필요합니다.

## localStorage의 의미와 한계

localStorage는 웹브라우저 안에 간단한 내용을 보관하는 작은 메모장입니다. 학습 완료 표시와 수강 신청 체험 내용은 서버가 아니라 현재 컴퓨터의 현재 브라우저에만 남습니다.

- 다른 컴퓨터나 다른 브라우저에는 자동으로 전달되지 않습니다.
- 브라우저 저장 데이터를 지우면 기록도 함께 삭제됩니다.
- 로그인, 암호화, 백업 또는 실제 접수 기능을 대신할 수 없습니다.
- 실제 이름, 실제 전화번호, 비밀번호, API 키 등 개인정보나 비밀 정보를 입력하면 안 됩니다.
- 수강 신청 화면은 교육용 체험일 뿐이며 외부 전송이나 실제 접수는 이루어지지 않습니다.

## 구현하지 않은 기능

- 실제 데이터베이스와 서버, 백엔드
- 관리자 로그인, 회원가입, 사용자 인증
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

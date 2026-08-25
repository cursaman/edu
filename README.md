# EDU 웹개발 교육 플랫폼

코딩을 처음 시작하는 학습자를 위한 웹개발 교육 플랫폼의 1일차 기본 화면입니다.

## 사용 기술

- React: 화면을 작은 부품으로 나누어 구성합니다.
- Vite: 개발 화면을 빠르게 실행하고 배포용 파일을 만듭니다.
- JavaScript: 화면에 표시할 정보와 동작을 작성합니다.
- Node.js와 npm: 필요한 도구를 설치하고 실행합니다.

## 프로젝트 위치

```text
C:\Users\sbs\Documents\Codex\2026-08-21\edu\app
```

## 실행 방법

1. 터미널에서 프로젝트 폴더로 이동합니다.

```powershell
cd C:\Users\sbs\Documents\Codex\2026-08-21\edu\app
```

2. 프로젝트에 필요한 패키지를 설치합니다.

```powershell
npm install
```

3. 개발 화면을 실행합니다.

```powershell
npm run dev
```

4. 터미널에 표시된 주소를 브라우저에서 엽니다.

```text
http://localhost:5173
```

포트 번호는 컴퓨터 상태에 따라 달라질 수 있습니다. 터미널에 표시된 실제 주소를 사용하세요.

## 배포용 빌드 확인

```powershell
npm run build
```

빌드가 성공하면 `dist` 폴더에 배포용 파일이 만들어집니다. `dist`와 `node_modules`는 Git에 저장하지 않습니다.

## 1일차에 포함된 화면

- 홈, 교육 분야, 교육 프로그램, 공지사항, 수강 신청 메뉴
- EDU 웹개발 교육 플랫폼 소개
- 여섯 개의 교육 분야 카드
- 세 개의 교육 프로그램 예시 카드
- PC와 모바일 반응형 화면
- 공지사항과 수강 신청의 준비 안내

## 아직 구현하지 않은 기능

- Supabase 연결
- 데이터베이스 저장
- 관리자 로그인
- 실제 수강 신청
- 교육자료 API
- GitHub 업로드
- Vercel 배포
- AI 자동 글 작성

## 주요 파일

```text
src/App.jsx                    화면 전체 조립
src/components/Header.jsx      상단 메뉴
src/components/CategoryCard.jsx 교육 분야 카드
src/components/ProgramCard.jsx  교육 프로그램 카드
src/data/catalog.js            임시 교육 데이터
src/styles/global.css          PC와 모바일 화면 디자인
```

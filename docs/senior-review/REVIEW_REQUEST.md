# EDU 시니어 트랙 코드 리뷰 요청

## 검토 목적

EDU 웹개발 교육 플랫폼의 시니어 과정이 실제 운영 경험이 있는 개발자에게도 학습 가치가 있는지 확인합니다. 단순 문장 교정보다 코드 실행 가능성, 설계 근거, 테스트 신뢰도와 현업 적용 가능성을 검토해 주세요.

## 리뷰 대상

1. React 리팩터링 실무 12회차
2. Supabase 인증·RLS 보안 12회차
3. 결제 시스템 안정화 12회차
4. React 시작·완성 프로젝트와 자동 테스트
5. 성능 측정 스크립트와 측정 결과 보고서

프로젝트 위치: `C:\Users\sbs\Documents\Codex\2026-08-21\edu\app`

## 권장 리뷰어 구성

- 리뷰어 1: React 프런트엔드 운영 경험 5년 이상
- 리뷰어 2: PostgreSQL·Supabase·인증 보안 경험자
- 리뷰어 3: 주문·결제·웹훅 운영 경험이 있는 백엔드 개발자

한 사람이 모든 분야를 평가하지 않아도 됩니다. 전문 분야는 깊게 검토하고, 다른 분야는 교육 구조와 이해 가능성만 평가해 주세요.

## 실행 순서

```powershell
cd C:\Users\sbs\Documents\Codex\2026-08-21\edu\app
npm install
npm run build

cd public\practice\senior-react-refactoring\starter
npm install
npm test
npm run build
npm run perf

cd ..\complete
npm install
npm test
npm run build
npm run perf
```

## 요청 결과

- 반드시 수정해야 하는 문제
- 운영 환경에서 위험한 설명 또는 코드
- 빠진 실패·경계 테스트
- 설계 대안과 선택 기준
- 실제 수업에서 토론할 질문
- 공개 가능 여부: 공개 가능 / 수정 후 재검토 / 공개 보류

리뷰 결과는 담당 리뷰어 기록지에 작성해 주세요. 비밀번호, API 키, 실제 고객정보와 운영 로그 원문은 기록하지 않습니다.

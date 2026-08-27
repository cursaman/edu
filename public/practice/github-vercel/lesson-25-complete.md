# 25회차 완성 — 환경별 설정표

| 환경 | 용도 | 값 저장 위치 | 확인 방법 |
|---|---|---|---|
| Local | 개발자 PC | `.env.local` | `npm run dev` |
| Preview | PR 검토 | Vercel Preview 변수 | Preview URL |
| Production | 실제 서비스 | Vercel Production 변수 | 대표 URL |

공개 키도 환경별 프로젝트를 나누는 것이 안전합니다. 변수 변경 후 해당 환경을 재배포하고 실제 값은 문서·화면 캡처·Git에 남기지 않습니다.

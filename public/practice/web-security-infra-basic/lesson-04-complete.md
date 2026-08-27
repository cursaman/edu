# 4회차 완성 — 공개 키와 비밀 키

| 변수 | 위치 | 규칙 |
|---|---|---|
| `VITE_SUPABASE_URL` | 브라우저 가능 | 프로젝트 주소 |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | 브라우저 가능 | 반드시 RLS와 함께 사용 |
| Supabase secret/service role | 서버만 | 브라우저·Git·문서 금지 |
| 관리자 비밀번호 | 코드에 없음 | Supabase Auth가 처리 |

`.env.local`은 Git에서 제외하고 `.env.example`에는 변수 이름과 가짜 값만 둡니다.

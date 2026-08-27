# 10회차 완성 — HTTPS와 연결 흐름

```text
사용자 브라우저
  └ HTTPS → 정적 홈페이지(Vercel 또는 GitHub Pages)
                 └ HTTPS API → Supabase
                                  ├ Auth
                                  └ PostgreSQL + RLS
```

HTTPS 자물쇠, 올바른 도메인, 인증서 오류 없음과 API 요청 주소를 확인합니다. HTTPS는 통신 구간을 보호하지만 잘못된 권한이나 노출된 비밀 키를 대신 해결하지 않습니다.

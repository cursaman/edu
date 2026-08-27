# 8회차 완성 — 환경변수와 보안

```text
브라우저 공개 가능: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
브라우저 공개 금지: service role key, 비밀번호, 개인 토큰
로컬 저장: .env.local (Git 제외)
배포 저장: Vercel → Project → Settings → Environment Variables
```

변수를 추가하거나 변경하면 새로 배포해야 합니다. `git check-ignore .env.local`로 제외 상태를 확인합니다.

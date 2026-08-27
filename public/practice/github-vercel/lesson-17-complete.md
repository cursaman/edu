# 17회차 완성 — SPA 새로고침과 리디렉션

History Router를 사용할 때의 `vercel.json` 예시입니다.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Hash Router라면 `/#/programs`처럼 `#` 뒤에서 이동하므로 이 rewrite가 보통 필요하지 않습니다. 프로젝트 라우팅 방식부터 확인하고 적용합니다.

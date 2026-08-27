# 18회차 완성 — 보안 헤더 점검

`vercel.json`의 기초 예시입니다.

```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "X-Frame-Options", "value": "DENY" }
    ]
  }]
}
```

CSP는 사용하는 외부 이미지·API 출처를 조사한 뒤 단계적으로 적용합니다.

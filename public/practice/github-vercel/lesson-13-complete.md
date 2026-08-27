# 13회차 완성 — GitHub Actions 빌드 검사

`.github/workflows/ci.yml` 예시입니다.

```yaml
name: Build check
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
```

Actions에서 초록색 체크와 실행 커밋을 확인합니다.

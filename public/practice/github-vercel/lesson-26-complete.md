# 26회차 완성 — 의존성 보안 점검

```powershell
git status --short
npm audit
npm outdated
npm run build
```

경고를 읽지 않고 `npm audit fix --force`를 실행하지 않습니다. 별도 브랜치에서 한 패키지씩 변경하고 빌드·핵심 기능·Preview를 확인한 뒤 PR로 병합합니다. 사용하지 않는 패키지는 제거 후보로 기록합니다.

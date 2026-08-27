# 5회차 완성 — Git 비밀정보 점검

```powershell
git status --short
git ls-files | Select-String -Pattern '(^|/)\.env($|\.)'
git diff --cached --check
git check-ignore .env.local
```

비밀이 커밋되었다면 파일 삭제만으로 끝내지 않습니다. 노출된 키를 즉시 교체하고 기록에서 제거할 절차를 관리자와 진행한 뒤 서비스 로그를 확인합니다.

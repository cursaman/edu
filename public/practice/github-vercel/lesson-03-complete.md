# 3회차 완성 — 브랜치와 병합

```powershell
git branch --show-current
git switch -c practice/header
# 작은 수정 후 필요한 파일만 add와 commit
git switch main
git merge --no-ff practice/header
git log --oneline --graph -5
```

병합 전 작업 폴더가 깨끗한지 확인합니다. 다른 사람의 변경을 지우는 `reset --hard`는 사용하지 않습니다.

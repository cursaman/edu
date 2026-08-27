# 5회차 완성 — 충돌과 안전한 복구

```powershell
git status
git fetch origin
git pull --rebase origin main
# 충돌 파일의 <<<<<<<, =======, >>>>>>> 구간을 직접 정리
git add -- 충돌한파일
git rebase --continue
git status
```

중단하려면 `git rebase --abort`를 사용합니다. `git reset --hard`나 강제 푸시는 강사 확인 없이 사용하지 않습니다.

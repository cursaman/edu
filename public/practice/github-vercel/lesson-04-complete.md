# 4회차 완성 — GitHub 원격 연결

```powershell
git remote -v
git remote add origin https://github.com/USER/REPOSITORY.git
git fetch origin
git branch -M main
git push -u origin main
```

`origin already exists`가 나오면 새로 추가하지 말고 `git remote -v`로 기존 주소를 확인합니다. 비밀번호나 토큰은 파일에 적지 않습니다.

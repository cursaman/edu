# 27회차 완성 — 버전과 변경 기록

```powershell
git status
git log -5 --oneline
git tag -a v1.0.0 -m "First public release"
git push origin v1.0.0
```

변경 기록에는 날짜, 버전, 새 기능, 오류 수정, 보안·설정 변경과 알려진 문제를 적습니다. 태그 전에 빌드와 Production 점검을 완료하고 태그를 비밀값 저장 용도로 사용하지 않습니다.

# 19회차 완성 — 성능과 용량 점검

```powershell
npm run build
Get-ChildItem dist/assets | Sort-Object Length -Descending | Select-Object -First 10 Name,Length
```

- 큰 화면 코드는 `import()`로 필요한 때 불러옵니다.
- 이미지는 WebP와 알맞은 표시 크기를 사용합니다.
- 사용하지 않는 패키지와 코드를 확인합니다.
- 수정 전후 Lighthouse와 빌드 용량을 같은 조건에서 비교합니다.

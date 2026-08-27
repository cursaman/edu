# 27회차 완성 — 배포 오류 진단 요청

```text
로컬은 정상이고 공개 홈페이지가 백지인 원인을 진단해줘. 먼저 읽기 검사만 하고 실제 재배포는 별도 승인 전 하지 마.

공개 주소: https://example.github.io/edu/
로컬: npm run dev와 npm run build 성공
공개: 홈부터 백지, 콘솔에 자산 404
배포 커밋: GitHub main 최신 커밋과 비교 필요

확인:
- vite.config.js base
- 배포 workflow의 Node·npm ci·build·dist 경로
- Actions 로그 첫 오류
- 공개 index.html의 자산 주소
- 브라우저 캐시와 실제 배포 커밋

원인과 최소 수정안을 먼저 보고해줘.
```

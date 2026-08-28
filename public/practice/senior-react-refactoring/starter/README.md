# 시작 프로젝트

조회·검색·등록·목록 책임과 파생 상태가 `App.jsx` 한 파일에 모여 있습니다.

```bash
npm install
npm run dev
npm test
npm run perf
```

1회차에서는 현재 동작을 먼저 확인하고 컴포넌트 경계와 상태 소유권을 설계합니다.

`npm test`는 검색·등록 로직 4개를 검사하고, `npm run perf`는 개선 전후 검색 성능을 같은 조건으로 비교합니다.

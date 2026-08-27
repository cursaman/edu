# 23회차 완성 — 비밀정보 검사 요청

```text
커밋 전 비밀정보 노출을 검사해줘. 발견한 실제 값은 출력하지 말고 파일과 종류만 보고해줘.

- 추적 중인 .env와 설정 파일
- API secret, service role, private key, 비밀번호, 개인 토큰 패턴
- React 브라우저 코드에 들어간 서버 비밀
- 문서·SQL·예제·로그의 실제 계정 정보
- .env.local이 .gitignore로 제외되는지
- .env.example에는 변수 이름과 가짜 값만 있는지

공개 가능한 publishable key도 RLS가 적용됐는지 별도 확인 항목으로 남겨줘.
```

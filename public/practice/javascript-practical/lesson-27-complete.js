// 27회차 완성 예제: 비동기와 API · 내 프로젝트 적용
Promise.resolve('자료 준비')
  .then(message => console.log(message))
  .catch(error => console.error(error))
  .finally(() => console.log('요청 종료'))

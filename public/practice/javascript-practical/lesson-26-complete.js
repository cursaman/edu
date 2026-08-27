// 26회차 완성 예제: 비동기와 API · 따라 하기
function readIds() {
  try { return JSON.parse(localStorage.getItem('favoriteIds') ?? '[]') }
  catch { return [] }
}
localStorage.setItem('favoriteIds', JSON.stringify(['js-01']))
console.log(readIds())

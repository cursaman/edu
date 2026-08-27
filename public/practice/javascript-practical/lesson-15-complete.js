// 15회차 완성 예제: 배열 실무 처리 · 내 프로젝트 적용
const lessons = [{ id: 1, title: '변수' }, { id: 2, title: '조건' }]
const labels = lessons.map(item => `${item.id}. ${item.title}`)
console.log(labels)

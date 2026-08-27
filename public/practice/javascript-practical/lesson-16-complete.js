// 16회차 완성 예제: 객체와 불변성 · 개념 이해
const lessons = [{ id: 1, done: true }, { id: 2, done: false }]
const pending = lessons.filter(item => !item.done)
console.log(pending)

// 17회차 완성 예제: 객체와 불변성 · 따라 하기
const lessons = [{ id: 'a', done: false }, { id: 'b', done: true }]
console.log(lessons.find(item => item.id === 'b'))
console.log(lessons.some(item => item.done))

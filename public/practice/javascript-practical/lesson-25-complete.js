// 25회차 완성 예제: 비동기와 API · 개념 이해
const lesson = { id: 1, title: 'JSON' }
const text = JSON.stringify(lesson)
const restored = JSON.parse(text)
console.log(text, restored.title)

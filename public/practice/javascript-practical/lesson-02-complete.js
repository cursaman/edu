// 2회차 완성 예제: 값과 변수 · 따라 하기
const values = ['교육', 30, true, undefined]
console.table(values.map(value => ({ value, type: typeof value })))

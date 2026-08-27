// 30회차 완성 예제: 통합 도구와 품질 점검 · 내 프로젝트 적용
const normalize = value => value.trim().toLowerCase()
const search = (items, query) => items.filter(item => normalize(item.title).includes(normalize(query)))
console.log(search([{ id: 1, title: 'JavaScript 실무' }], 'script'))

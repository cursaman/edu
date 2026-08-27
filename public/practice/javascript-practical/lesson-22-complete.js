// 22회차 완성 예제: 폼과 브라우저 저장 · 개념 이해
let count = 0
const button = document.querySelector('#count-button')
button?.addEventListener('click', () => { count += 1; button.textContent = `${count}회 클릭` })

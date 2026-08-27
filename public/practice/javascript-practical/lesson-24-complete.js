// 24회차 완성 예제: 폼과 브라우저 저장 · 내 프로젝트 적용
const list = document.querySelector('#lesson-list')
list?.addEventListener('click', event => {
  const button = event.target.closest('[data-remove]')
  if (button) button.closest('li')?.remove()
})

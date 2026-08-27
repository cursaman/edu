// 23회차 완성 예제: 폼과 브라우저 저장 · 따라 하기
const form = document.querySelector('#apply-form')
form?.addEventListener('submit', event => {
  event.preventDefault()
  const name = new FormData(form).get('name')?.trim()
  console.log(name ? '입력 완료' : '이름은 필수입니다.')
})

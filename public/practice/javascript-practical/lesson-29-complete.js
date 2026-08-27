// 29회차 완성 예제: 통합 도구와 품질 점검 · 따라 하기
const controller = new AbortController()
fetch('/api/lessons', { signal: controller.signal }).catch(error => {
  if (error.name !== 'AbortError') console.error(error)
})
controller.abort()

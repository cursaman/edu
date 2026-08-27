// 28회차 완성 예제: 통합 도구와 품질 점검 · 개념 이해
async function load(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`요청 실패: ${response.status}`)
  return response.json()
}
load('/api/lessons').then(console.log).catch(console.error)

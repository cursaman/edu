const routes = [
  { method: 'GET', path: '/api/lessons', purpose: '목록 조회' },
  { method: 'POST', path: '/api/lessons', purpose: '등록' },
  { method: 'PATCH', path: '/api/lessons/:id', purpose: '일부 수정' },
  { method: 'DELETE', path: '/api/lessons/:id', purpose: '삭제' },
]
console.table(routes)

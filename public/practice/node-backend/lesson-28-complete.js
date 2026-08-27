import assert from 'node:assert/strict'
const response=await fetch('http://localhost:3000/api/lessons')
assert.equal(response.status,200)
const body=await response.json()
assert.ok(Array.isArray(body.items),'items는 배열이어야 합니다.')
assert.equal(body.total,body.items.length)
console.log('목록 API 테스트 통과')

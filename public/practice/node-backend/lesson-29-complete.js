import assert from 'node:assert/strict'
const invalid=await fetch('http://localhost:3000/api/lessons',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:'',category:''})})
assert.equal(invalid.status,400)
const missing=await fetch('http://localhost:3000/api/lessons/missing')
assert.equal(missing.status,404)
console.log('오류 API 테스트 통과')

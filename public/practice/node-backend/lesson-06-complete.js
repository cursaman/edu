import express from 'express'
const app = express()
app.use((request, response, next) => { console.log(new Date().toISOString(), request.method, request.path); next() })
app.get('/health', (request, response) => response.json({ ok: true }))
app.listen(3000, () => console.log('3000번 포트에서 요청을 기다립니다.'))

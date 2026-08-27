import express from 'express'
const app = express()
const port = Number(process.env.PORT) || 3000
app.get('/health', (request, response) => response.status(200).json({ ok: true, service: 'edu-api' }))
app.use((request, response) => response.status(404).json({ message: '주소를 찾을 수 없습니다.' }))
app.listen(port, () => console.log(`서버 실행: http://localhost:${port}`))

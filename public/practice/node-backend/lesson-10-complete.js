import express from 'express'
const app = express()
app.get('/api/lessons/1', (request, response) => response.status(200).json({ id: 1, title: 'HTML 첫 화면', category: '웹 기초', durationMinutes: 30 }))
app.use((request, response) => response.status(404).json({ message: '교육자료를 찾을 수 없습니다.' }))
app.listen(3000)

import express from 'express'
const app = express()
app.get('/', (request, response) => response.send('EDU Express 서버'))
app.listen(3000, () => console.log('서버 실행: http://localhost:3000'))

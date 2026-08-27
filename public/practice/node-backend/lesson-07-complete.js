import express from 'express'
const app = express()
app.use(express.json())
app.get('/api/lessons', (request, response) => response.json([]))
app.post('/api/lessons', (request, response) => response.status(201).json({ id: 1, ...request.body }))
app.listen(3000)

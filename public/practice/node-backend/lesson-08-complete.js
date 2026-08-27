import express from 'express'
const app = express()
app.get('/api/lessons/:id', (request, response) => response.json({ id: request.params.id }))
app.patch('/api/lessons/:id', (request, response) => response.json({ id: request.params.id, ...request.body }))
app.delete('/api/lessons/:id', (request, response) => response.status(204).end())
app.listen(3000)

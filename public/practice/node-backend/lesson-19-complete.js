import express from 'express'
import crypto from 'node:crypto'
const app=express();const lessons=[]
app.use(express.json({limit:'20kb'}))
app.post('/api/lessons',(request,response)=>{const item={id:crypto.randomUUID(),title:String(request.body.title||'').trim(),category:String(request.body.category||'').trim(),createdAt:new Date().toISOString()};lessons.push(item);response.status(201).json(item)})
app.listen(3000)

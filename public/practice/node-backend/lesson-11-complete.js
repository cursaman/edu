import express from 'express'
const app=express()
const lessons=[{id:1,title:'HTML 시작'},{id:2,title:'CSS 카드'}]
app.get('/api/lessons',(request,response)=>response.status(200).json({items:lessons,total:lessons.length}))
app.listen(3000)

import express from 'express'
const app=express()
const lessons=[{id:'html',title:'HTML 시작',category:'웹 기초'},{id:'react',title:'React 화면',category:'프런트엔드'}]
app.get('/api/lessons',(request,response)=>response.json({items:lessons,total:lessons.length}))
app.listen(3000)

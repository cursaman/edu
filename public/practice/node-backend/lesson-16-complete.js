import express from 'express'
const app=express()
const lessons=[{id:'html',title:'HTML 시작'},{id:'react',title:'React 화면'}]
app.get('/api/lessons/:id',(request,response)=>{const lesson=lessons.find(item=>item.id===request.params.id);if(!lesson)return response.status(404).json({message:'교육자료를 찾을 수 없습니다.'});return response.json(lesson)})
app.listen(3000)

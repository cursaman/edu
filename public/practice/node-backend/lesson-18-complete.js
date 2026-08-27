import express from 'express'
const app=express()
const lessons=[{id:1,title:'HTML 시작'}]
app.get('/api/lessons/:id',(request,response)=>{const id=Number(request.params.id);if(!Number.isInteger(id)||id<1)return response.status(400).json({message:'올바른 교육자료 번호를 입력해 주세요.'});const lesson=lessons.find(item=>item.id===id);return lesson?response.json(lesson):response.status(404).json({message:'교육자료를 찾을 수 없습니다.'})})
app.listen(3000)

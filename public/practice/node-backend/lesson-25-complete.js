import express from 'express'
const app=express()
app.get('/api/error',(req,res,next)=>next(new Error('연습 오류')))
app.use((req,res)=>res.status(404).json({code:'ROUTE_NOT_FOUND',message:'주소를 찾을 수 없습니다.'}))
app.use((error,req,res,next)=>{console.error(error);res.status(500).json({code:'INTERNAL_ERROR',message:'서버 오류가 발생했습니다.'})})
app.listen(3000)

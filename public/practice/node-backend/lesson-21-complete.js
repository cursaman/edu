import express from 'express';import crypto from 'node:crypto'
const app=express();const lessons=[];app.use(express.json({limit:'20kb'}))
const validate=input=>{const title=String(input.title||'').trim();const category=String(input.category||'').trim();const errors={};if(!title||title.length>100)errors.title='제목은 1~100자입니다.';if(!category)errors.category='분야는 필수입니다.';return{title,category,errors}}
app.post('/api/lessons',(req,res)=>{const checked=validate(req.body);if(Object.keys(checked.errors).length)return res.status(400).json({message:'입력값을 확인해 주세요.',errors:checked.errors});const item={id:crypto.randomUUID(),title:checked.title,category:checked.category};lessons.push(item);res.status(201).json(item)})
app.listen(3000)

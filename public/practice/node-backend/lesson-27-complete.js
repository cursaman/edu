import express from 'express'
const app=express();const requests=new Map();app.use(express.json({limit:'20kb'}))
app.use((req,res,next)=>{const now=Date.now();const recent=(requests.get(req.ip)||[]).filter(time=>now-time<60_000);if(recent.length>=30)return res.status(429).json({message:'잠시 후 다시 시도해 주세요.'});recent.push(now);requests.set(req.ip,recent);next()})
app.post('/api/lessons',(req,res)=>res.status(201).json(req.body));app.listen(3000)

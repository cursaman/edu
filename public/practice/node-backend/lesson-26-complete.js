import express from 'express';import crypto from 'node:crypto'
const app=express()
app.use((req,res,next)=>{const started=Date.now();req.requestId=crypto.randomUUID();res.on('finish',()=>console.info({requestId:req.requestId,time:new Date().toISOString(),method:req.method,path:req.path,status:res.statusCode,durationMs:Date.now()-started}));next()})
app.get('/health',(req,res)=>res.json({ok:true,requestId:req.requestId}));app.listen(3000)

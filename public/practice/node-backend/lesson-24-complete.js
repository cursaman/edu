import express from 'express'
const app=express();const lessons=[{id:'html',title:'HTML'}];app.use(express.json())
app.patch('/api/lessons/:id',(req,res)=>{const item=lessons.find(v=>v.id===req.params.id);if(!item)return res.status(404).json({message:'자료가 없습니다.'});if(req.body.title!==undefined)item.title=String(req.body.title).trim();res.json(item)})
app.delete('/api/lessons/:id',(req,res)=>{const index=lessons.findIndex(v=>v.id===req.params.id);if(index<0)return res.status(404).json({message:'자료가 없습니다.'});lessons.splice(index,1);res.status(204).end()})
app.listen(3000)

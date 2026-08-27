import { useState } from 'react'
const lessons = [{id:1,title:'HTML',category:'웹 기초'},{id:2,title:'React',category:'프런트엔드'}]
export default function Filter(){const [category,setCategory]=useState('전체');const result=category==='전체'?lessons:lessons.filter((x)=>x.category===category);return <><label>분야 <select value={category} onChange={(e)=>setCategory(e.target.value)}><option>전체</option><option>웹 기초</option><option>프런트엔드</option></select></label><ul>{result.map((x)=><li key={x.id}>{x.title}</li>)}</ul></>}

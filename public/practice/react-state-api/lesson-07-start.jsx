import { useState } from 'react'
const lessons = [{id:1,title:'HTML',category:'웹 기초'},{id:2,title:'React',category:'프런트엔드'}]
export default function Filter(){const [category,setCategory]=useState('전체');return <button onClick={()=>setCategory('웹 기초')}>{category}</button>}

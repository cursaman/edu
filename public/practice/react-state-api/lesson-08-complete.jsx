import { useState } from 'react'
const lessons=[{id:1,title:'CSS',minutes:30},{id:2,title:'HTML',minutes:20}]
export default function SortList(){const [sort,setSort]=useState('title');const result=[...lessons].sort((a,b)=>sort==='minutes'?a.minutes-b.minutes:a.title.localeCompare(b.title,'ko'));return <><select value={sort} onChange={(e)=>setSort(e.target.value)} aria-label="정렬"><option value="title">이름순</option><option value="minutes">시간 짧은순</option></select><ul>{result.map((x)=><li key={x.id}>{x.title} · {x.minutes}분</li>)}</ul></>}

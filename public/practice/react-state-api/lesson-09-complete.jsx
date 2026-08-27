import { useState } from 'react'
const items=Array.from({length:23},(_,i)=>({id:i+1,title:`자료 ${i+1}`}))
export default function Pages(){const [page,setPage]=useState(1);const size=10,total=Math.ceil(items.length/size),visible=items.slice((page-1)*size,page*size);return <><ul>{visible.map((x)=><li key={x.id}>{x.title}</li>)}</ul><button disabled={page===1} onClick={()=>setPage((p)=>p-1)}>이전</button><span aria-current="page">{page} / {total}</span><button disabled={page===total} onClick={()=>setPage((p)=>p+1)}>다음</button></>}

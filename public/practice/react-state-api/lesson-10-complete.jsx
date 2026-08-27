import { useState } from 'react'
export default function Reset(){const [query,setQuery]=useState('React');const [page,setPage]=useState(3);const reset=()=>{setQuery('');setPage(1)};return <><label>검색 <input value={query} onChange={(e)=>{setQuery(e.target.value);setPage(1)}} /></label><p>현재 {page}페이지</p><button onClick={reset}>전체 초기화</button></>}

import { useEffect,useState } from 'react'
export default function PersistQuery(){const [query,setQuery]=useState(()=>localStorage.getItem('edu-query')??'React');useEffect(()=>{localStorage.setItem('edu-query',query)},[query]);return <input aria-label="검색어" value={query} onChange={(e)=>setQuery(e.target.value)} />}

import { useEffect,useState } from 'react'
export default function PersistQuery(){const [query,setQuery]=useState('React');useEffect(()=>{/* TODO: query가 바뀌면 localStorage에 저장하세요. */},[query]);return <input aria-label="검색어" value={query} onChange={(e)=>setQuery(e.target.value)} />}

import { useMemo,useState } from 'react'
export default function DerivedList({items=[]}){const [query,setQuery]=useState('');const visible=useMemo(()=>{const word=query.trim().toLowerCase();return items.filter((item)=>item.title.toLowerCase().includes(word))},[items,query]);return <><input aria-label="검색" value={query} onChange={(e)=>setQuery(e.target.value)} /><p>{visible.length}개</p></>}

import { useEffect,useState } from 'react'
export default function DebouncedSearch(){const [query,setQuery]=useState('');useEffect(()=>{/* TODO: 400ms 후 검색하고 정리 함수에서 타이머를 취소하세요. */},[query]);return <input aria-label="검색" value={query} onChange={(e)=>setQuery(e.target.value)} />}

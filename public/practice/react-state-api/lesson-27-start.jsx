import { useMemo,useState } from 'react'
export default function DerivedList({items=[]}){const [query,setQuery]=useState('');const visible=items;/* TODO: useMemo로 검색 결과 계산을 필요한 때만 실행하세요. */return <><input aria-label="검색" value={query} onChange={(e)=>setQuery(e.target.value)} /><p>{visible.length}개</p></>}

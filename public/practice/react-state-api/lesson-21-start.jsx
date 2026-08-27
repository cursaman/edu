import { useState } from 'react'
export default function SavedQuery(){const [query,setQuery]=useState('');/* TODO: 처음 한 번 localStorage 값을 읽으세요. */return <label>검색어 <input value={query} onChange={(e)=>setQuery(e.target.value)} /></label>}

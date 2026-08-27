import { useState } from 'react'
export default function SavedQuery(){const [query,setQuery]=useState(()=>localStorage.getItem('edu-query')??'');return <label>검색어 <input value={query} onChange={(e)=>setQuery(e.target.value)} /></label>}

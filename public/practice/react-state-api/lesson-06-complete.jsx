import { useState } from 'react'
const lessons = ['HTML 기초', 'CSS 카드', 'React 상태']
export default function Search() { const [query, setQuery] = useState(''); const keyword = query.trim().toLowerCase(); const result = lessons.filter((x) => x.toLowerCase().includes(keyword)); return <><label>검색 <input value={query} onChange={(e) => setQuery(e.target.value)} /></label><p>{result.length}개 결과</p>{result.length ? <ul>{result.map((x) => <li key={x}>{x}</li>)}</ul> : <p>검색 결과가 없습니다.</p>}</> }

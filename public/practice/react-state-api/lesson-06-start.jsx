import { useState } from 'react'
const lessons = ['HTML 기초', 'CSS 카드', 'React 상태']
export default function Search() { const [query, setQuery] = useState(''); return <><input value={query} onChange={(e) => setQuery(e.target.value)} /><ul>{lessons.map((x) => <li key={x}>{x}</li>)}</ul></> }

import { useEffect, useState } from 'react'
import { appendProgram, filterPrograms } from './domain/programs.js'

const initialPrograms = [
  { id: 1, title: 'React 리팩터링', track: '시니어' },
  { id: 2, title: 'React 웹사이트', track: '입문' },
  { id: 3, title: 'Supabase 보안', track: '시니어' },
]

// 의도적으로 조회·필터·폼·목록을 한 컴포넌트에 모은 개선 전 코드입니다.
export default function App() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(initialPrograms)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setFiltered(filterPrograms(programs, query))
  }, [programs, query])

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) return
    setPrograms(appendProgram(programs, { id: Date.now(), title, track: '실무' }))
    setTitle('')
  }

  return <main><h1>교육 프로그램 관리</h1><input aria-label="검색" onChange={(event) => setQuery(event.target.value)} placeholder="프로그램 검색" value={query} /><form onSubmit={submit}><input aria-label="프로그램명" onChange={(event) => setTitle(event.target.value)} placeholder="새 프로그램" value={title} /><button>추가</button></form><p>{filtered.length}개</p><ul>{filtered.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.track}</span></li>)}</ul></main>
}

import { useMemo, useState } from 'react'
import ProgramForm from './components/ProgramForm.jsx'
import ProgramList from './components/ProgramList.jsx'
import { appendProgram, filterPrograms } from './domain/programs.js'

const initialPrograms = [{ id: 1, title: 'React 리팩터링', track: '시니어' },{ id: 2, title: 'React 웹사이트', track: '입문' },{ id: 3, title: 'Supabase 보안', track: '시니어' }]

export default function App() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [query, setQuery] = useState('')
  const visiblePrograms = useMemo(() => filterPrograms(programs, query), [programs, query])
  const addProgram = (title) => setPrograms((current) => appendProgram(current, { id: crypto.randomUUID(), title, track: '실무' }))
  return <main><h1>교육 프로그램 관리</h1><label><span>프로그램 검색</span><input onChange={(event) => setQuery(event.target.value)} value={query} /></label><ProgramForm onAdd={addProgram} /><p>{visiblePrograms.length}개</p><ProgramList programs={visiblePrograms} /></main>
}

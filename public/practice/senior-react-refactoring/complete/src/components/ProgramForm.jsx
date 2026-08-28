import { useState } from 'react'

export default function ProgramForm({ onAdd }) {
  const [title, setTitle] = useState('')
  function submit(event) { event.preventDefault(); const value = title.trim(); if (!value) return; onAdd(value); setTitle('') }
  return <form onSubmit={submit}><label><span>새 프로그램명</span><input onChange={(event) => setTitle(event.target.value)} value={title} /></label><button type="submit">추가</button></form>
}

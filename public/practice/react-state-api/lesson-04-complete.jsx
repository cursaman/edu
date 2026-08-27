import { useState } from 'react'
export default function SearchInput() {
  const [query, setQuery] = useState('')
  return <div><label htmlFor="lesson-search">교육자료 검색</label><input id="lesson-search" value={query} onChange={(event) => setQuery(event.target.value)} maxLength={50} /><p>{query.length} / 50자</p></div>
}

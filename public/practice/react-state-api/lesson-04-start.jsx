import { useState } from 'react'
export default function SearchInput() {
  const [query] = useState('')
  return <input value={query} />
}

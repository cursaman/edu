import { useState } from 'react'
export default function Counter() {
  const [count] = useState(0)
  return <button>완료 {count}회</button>
}

import { useState } from 'react'
export default function Counter() {
  const [count, setCount] = useState(0)
  return <section><p aria-live="polite">완료 {count}회</p><button onClick={() => setCount((value) => value + 1)}>완료 추가</button></section>
}

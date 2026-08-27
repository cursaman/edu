import { useState } from 'react'
export default function ApplyForm() { const [name, setName] = useState(''); return <form><label htmlFor="name">이름</label><input id="name" value={name} onChange={event => setName(event.target.value)} /><button>확인</button></form> }

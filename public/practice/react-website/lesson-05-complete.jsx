import { useState } from 'react'
const programs = [{ id: 1, title: 'HTML', category: '기초' }, { id: 2, title: 'React', category: '프런트엔드' }]
export default function App() { const [category, setCategory] = useState('all'); const visible = programs.filter(item => category === 'all' || item.category === category); return <main><button onClick={() => setCategory('all')}>전체</button><button onClick={() => setCategory('프런트엔드')}>프런트엔드</button><p>{visible.length}개 결과</p>{visible.map(item => <article key={item.id}>{item.title}</article>)}</main> }

import { useState } from 'react'
const programs = [{ id: 1, title: 'HTML', category: '기초' }, { id: 2, title: 'React', category: '프런트엔드' }]
export default function App() { const [category, setCategory] = useState('all'); return <main>{/* 필터 버튼과 목록 */}</main> }

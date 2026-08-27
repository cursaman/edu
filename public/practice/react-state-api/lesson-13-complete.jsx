import { useState } from 'react'
export default function Loading(){const [loading,setLoading]=useState(false);async function load(){setLoading(true);try{await fetch('/api/lessons')}finally{setLoading(false)}}return <button onClick={load} disabled={loading}>{loading?'불러오는 중…':'불러오기'}</button>}

import { useState } from 'react'
export default function Loading(){const [loading,setLoading]=useState(false);async function load(){setLoading(true);/* TODO: 요청이 끝나면 loading을 false로 바꾸세요. */}return <button onClick={load} disabled={loading}>{loading?'불러오는 중…':'불러오기'}</button>}

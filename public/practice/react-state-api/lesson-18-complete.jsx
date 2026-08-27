import { useState } from 'react'
export default function Retry(){const [error,setError]=useState('');async function load(){setError('');try{const response=await fetch('/api/lessons');if(!response.ok)throw new Error('자료를 불러오지 못했습니다.')}catch(error){setError(error.message)}}return <>{error&&<p role="alert">{error}</p>}<button onClick={load}>{error?'다시 시도':'불러오기'}</button></>}

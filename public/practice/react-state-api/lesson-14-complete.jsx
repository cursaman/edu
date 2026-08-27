import { useState } from 'react'
export default function HttpError(){const [error,setError]=useState('');async function load(){setError('');try{const response=await fetch('/api/lessons');if(!response.ok)throw new Error(`요청 실패 (${response.status})`)}catch(error){setError(error.message)}}return <><button onClick={load}>요청</button>{error&&<p role="alert">{error}</p>}</>}

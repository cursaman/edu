import { useState } from 'react'
export default function HttpError(){const [error,setError]=useState('');async function load(){/* TODO: response.ok와 catch로 오류 문구를 저장하세요. */}return <><button onClick={load}>요청</button>{error&&<p role="alert">{error}</p>}</>}

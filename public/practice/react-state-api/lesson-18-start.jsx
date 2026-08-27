import { useState } from 'react'
export default function Retry(){const [error,setError]=useState('');async function load(){/* TODO: 실패 시 재시도할 수 있도록 같은 함수를 연결하세요. */}return <>{error?<button onClick={load}>다시 시도</button>:<button onClick={load}>불러오기</button>}</>}

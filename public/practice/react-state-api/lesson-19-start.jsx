import { useState } from 'react'
export default function Parallel(){const [summary,setSummary]=useState(null);async function load(){/* TODO: Promise.all로 자료와 공지를 함께 요청하세요. */}return <><button onClick={load}>현황 불러오기</button>{summary&&<p>{summary.lessons}개 · 공지 {summary.notices}개</p>}</>}

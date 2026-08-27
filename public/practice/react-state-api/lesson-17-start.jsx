import { useEffect,useState } from 'react'
export default function SearchRequest({query}){const [result,setResult]=useState([]);useEffect(()=>{/* TODO: AbortController로 이전 요청을 취소하세요. */},[query]);return <p>결과 {result.length}개</p>}

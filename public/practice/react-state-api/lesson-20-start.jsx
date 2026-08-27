import { useEffect,useState } from 'react'
export default function ApiPanel(){const [state,setState]=useState({status:'idle',data:[],error:''});useEffect(()=>{/* TODO: loading, success, empty, error 상태를 완성하세요. */},[]);return <p>현재 상태: {state.status}</p>}

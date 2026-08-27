import { useEffect,useState } from 'react'
function useLocalStorage(key,initialValue){const [value,setValue]=useState(()=>JSON.parse(localStorage.getItem(key)??JSON.stringify(initialValue)));useEffect(()=>localStorage.setItem(key,JSON.stringify(value)),[key,value]);return[value,setValue]}
export default function FontSize(){const [size,setSize]=useLocalStorage('edu-font-size',16);return <button onClick={()=>setSize((value)=>Math.min(value+1,24))}>글자 {size}px</button>}

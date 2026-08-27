import { useState } from 'react'
function useLocalStorage(key,initialValue){const [value,setValue]=useState(initialValue);/* TODO: 읽기와 저장을 Hook 안으로 옮기세요. */return[value,setValue]}
export default function FontSize(){const [size,setSize]=useLocalStorage('edu-font-size',16);return <button onClick={()=>setSize(size+1)}>글자 {size}px</button>}

import { useState } from 'react'
export default function Favorite({id='react-01'}){const [ids,setIds]=useState([]);function toggle(){/* TODO: 같은 ID를 추가하거나 제거하세요. */}return <button onClick={toggle} aria-pressed={ids.includes(id)}>찜하기</button>}

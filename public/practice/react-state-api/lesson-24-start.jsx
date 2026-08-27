import { useState } from 'react'
export default function Recent(){const [recent,setRecent]=useState([]);function visit(item){/* TODO: 중복을 제거하고 최근 5개만 남기세요. */}return <><button onClick={()=>visit({id:'1',title:'React 기초'})}>자료 보기</button><p>최근 {recent.length}개</p></>}

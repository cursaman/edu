import { useEffect,useState } from 'react'
export default function LessonList(){const [lessons,setLessons]=useState([]);useEffect(()=>{fetch('/api/lessons').then((r)=>r.json()).then(setLessons)},[]);return <p>자료 {lessons.length}개</p>}

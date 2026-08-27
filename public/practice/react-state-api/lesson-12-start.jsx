import { useEffect,useState } from 'react'
export default function LessonList(){const [lessons,setLessons]=useState([]);useEffect(()=>{/* TODO: 첫 화면에서 한 번만 자료를 불러오세요. */},[]);return <p>자료 {lessons.length}개</p>}

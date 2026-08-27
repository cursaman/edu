export function filterLessons(items=[],query=''){const word=query.trim().toLowerCase();return items.filter((item)=>item.title.toLowerCase().includes(word))}
export const filterLessonsCases=[{name:'빈 검색어',input:[[ {id:'1',title:'React'} ],''],expected:1},{name:'대소문자',input:[[ {id:'1',title:'React'} ],'react'],expected:1}]
export default function TestableList({items=[]}){return <p>{filterLessons(items,'React').length}개</p>}

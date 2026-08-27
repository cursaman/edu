export function normalizeLesson(item={}){return{id:String(item.id??crypto.randomUUID()),title:item.title?.trim()||'제목 없음',category:item.category||'미분류',minutes:Number(item.minutes)||0}}
export default function NormalizedCard({item}){const lesson=normalizeLesson(item);return <article><h2>{lesson.title}</h2><p>{lesson.category} · {lesson.minutes}분</p></article>}

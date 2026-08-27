export function normalizeLesson(item){/* TODO: API 필드가 없을 때 사용할 기본값을 정하세요. */return item}
export default function NormalizedCard({item}){const lesson=normalizeLesson(item);return <article><h2>{lesson.title}</h2><p>{lesson.category}</p></article>}

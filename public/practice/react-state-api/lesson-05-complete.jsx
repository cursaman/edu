const lessons = [{ id: 'html', title: 'HTML' }, { id: 'css', title: 'CSS' }]
export default function LessonList() { return <ul>{lessons.map((lesson) => <li key={lesson.id}>{lesson.title}</li>)}</ul> }

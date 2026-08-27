function LessonCard({ title, description }) { return <article><h2>{title}</h2><p>{description}</p></article> }
export default function App() { return <LessonCard title="React props" description="부모가 자식에게 전달하는 읽기 전용 값입니다." /> }

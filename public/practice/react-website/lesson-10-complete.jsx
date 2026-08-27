function ProgramCard({ title, level, duration }) { return <article><span>{level}</span><h2>{title}</h2><p>{duration}</p></article> }
export default function App() { return <main><ProgramCard title="React 입문" level="기초" duration="4주" /><ProgramCard title="API 활용" level="실전" duration="6주" /></main> }

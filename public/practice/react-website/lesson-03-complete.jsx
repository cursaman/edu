const programs = [{ id: 'html', title: 'HTML 시작', level: '입문' }, { id: 'css', title: 'CSS 카드', level: '기초' }, { id: 'react', title: 'React 화면', level: '기초' }]
function ProgramCard({ program }) { return <article><span>{program.level}</span><h2>{program.title}</h2></article> }
export default function App() { return <main><h1>교육 프로그램</h1><section>{programs.map(program => <ProgramCard key={program.id} program={program} />)}</section></main> }

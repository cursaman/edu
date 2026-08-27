const programs = [{ id: 'react', title: 'React 시작', description: '컴포넌트로 교육 화면을 만듭니다.' }]
export default function ProgramDetail({ programId }) { const program = programs.find(item => item.id === programId); if (!program) return <main><h1>프로그램을 찾을 수 없습니다.</h1><a href="#/programs">목록으로</a></main>; return <main><h1>{program.title}</h1><p>{program.description}</p></main> }

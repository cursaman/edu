const checks = ['npm run dev', 'npm run build', 'src 화면 구조', '데이터 위치', '모바일 화면']
export default function ProjectCheck() {
  return <main><h1>React 프로젝트 점검</h1><ul>{checks.map((item) => <li key={item}>{item}</li>)}</ul></main>
}

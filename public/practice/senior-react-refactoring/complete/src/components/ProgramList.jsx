export default function ProgramList({ programs }) {
  if (!programs.length) return <p role="status">조건에 맞는 프로그램이 없습니다.</p>
  return <ul>{programs.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.track}</span></li>)}</ul>
}

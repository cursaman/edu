export default function EmptyState({lessons=[]}){/* TODO: 자료가 없을 때 안내와 초기화 버튼을 표시하세요. */return <ul>{lessons.map((item)=><li key={item.id}>{item.title}</li>)}</ul>}

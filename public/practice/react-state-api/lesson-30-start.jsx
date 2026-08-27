export default function ReleaseCheck(){const checks=['검색','필터','API 오류','모바일','새로고침 저장'];/* TODO: 완료 여부를 체크할 수 있게 만드세요. */return <ul>{checks.map((item)=><li key={item}>{item}</li>)}</ul>}

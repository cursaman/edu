const cache=new Map()
export async function getLessons(url){/* TODO: 같은 주소의 데이터가 있으면 캐시 값을 반환하세요. */const response=await fetch(url);return response.json()}
export default function CacheInfo(){return <p>같은 요청을 잠시 재사용합니다.</p>}

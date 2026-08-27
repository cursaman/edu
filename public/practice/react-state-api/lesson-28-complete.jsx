const cache=new Map()
export async function getLessons(url){if(cache.has(url))return cache.get(url);const request=fetch(url).then((response)=>{if(!response.ok)throw new Error('요청 실패');return response.json()}).catch((error)=>{cache.delete(url);throw error});cache.set(url,request);return request}
export default function CacheInfo(){return <p>같은 주소의 진행 중이거나 완료된 요청을 재사용합니다.</p>}

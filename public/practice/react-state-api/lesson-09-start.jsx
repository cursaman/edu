const items=Array.from({length:23},(_,i)=>({id:i+1,title:`자료 ${i+1}`}))
export default function Pages(){return <p>{items.length}개</p>}

const lessons=[{id:1,title:'CSS',minutes:30},{id:2,title:'HTML',minutes:20}]
export default function SortList(){return <ul>{lessons.map((x)=><li key={x.id}>{x.title}</li>)}</ul>}

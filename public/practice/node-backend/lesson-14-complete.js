const lessons=[{title:'HTML 시작',category:'웹 기초'},{title:'React 화면',category:'프런트엔드'}]
export function filterLessons(items,{q='',category='all'}){const keyword=String(q).trim().toLowerCase();return items.filter(item=>(!keyword||item.title.toLowerCase().includes(keyword))&&(category==='all'||item.category===category))}
console.log(filterLessons(lessons,{q:'react',category:'프런트엔드'}))

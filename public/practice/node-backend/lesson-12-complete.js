const lesson={id:1,title:'HTML 시작',category:'웹 기초'}
const json=JSON.stringify(lesson,null,2)
const restored=JSON.parse(json)
console.log(json)
console.log(restored.title,restored.category)

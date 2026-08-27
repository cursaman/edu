export function findLesson(lessons,id){const lesson=lessons.find(item=>item.id===id);return lesson?{status:200,data:lesson}:{status:404,error:{code:'LESSON_NOT_FOUND',message:'교육자료를 찾을 수 없습니다.'}}}
console.log(findLesson([{id:'html',title:'HTML 시작'}],'missing'))

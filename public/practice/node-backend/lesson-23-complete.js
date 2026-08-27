export function removeLesson(lessons,id){const index=lessons.findIndex(item=>item.id===id);if(index<0)return{status:404,error:'교육자료를 찾을 수 없습니다.'};const [removed]=lessons.splice(index,1);return{status:200,data:removed}}
const sample=[{id:'html',title:'HTML'},{id:'css',title:'CSS'}];console.log(removeLesson(sample,'html'),sample)

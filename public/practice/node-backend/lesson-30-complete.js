export const apiDocs=[
  {method:'GET',path:'/api/lessons',success:'200 목록',errors:'없음'},
  {method:'GET',path:'/api/lessons/:id',success:'200 한 건',errors:'400 ID 형식, 404 없음'},
  {method:'POST',path:'/api/lessons',success:'201 등록',errors:'400 입력값, 413 본문 크기, 429 요청 제한'},
  {method:'PATCH',path:'/api/lessons/:id',success:'200 수정',errors:'400 입력값, 404 없음'},
  {method:'DELETE',path:'/api/lessons/:id',success:'204 빈 응답',errors:'404 없음'},
]
console.table(apiDocs)

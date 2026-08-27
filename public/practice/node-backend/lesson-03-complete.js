import http from 'node:http'
http.createServer((request, response) => {
  console.log(request.method, request.url)
  if (request.url === '/health') { response.writeHead(200, { 'Content-Type': 'application/json' }); return response.end(JSON.stringify({ ok: true })) }
  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ message: '주소를 찾을 수 없습니다.' }))
}).listen(3000)

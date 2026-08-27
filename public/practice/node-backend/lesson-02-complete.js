import http from 'node:http'
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end('EDU 서버가 응답했습니다.')
})
server.listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000'))

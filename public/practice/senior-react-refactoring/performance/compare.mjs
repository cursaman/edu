import { performance } from 'node:perf_hooks'
import { filterPrograms as filterBefore } from '../starter/src/domain/programs.js'
import { filterPrograms as filterAfter } from '../complete/src/domain/programs.js'

const size = 20000
const iterations = 300
const programs = Array.from({ length: size }, (_, index) => ({ id: index, title: index % 3 === 0 ? `React 리팩터링 ${index}` : `교육 프로그램 ${index}` }))

function measure(label, filter) {
  for (let warmup = 0; warmup < 30; warmup += 1) filter(programs, ' react ')
  const started = performance.now()
  let matches = 0
  for (let iteration = 0; iteration < iterations; iteration += 1) matches = filter(programs, ' react ').length
  return { label, milliseconds: performance.now() - started, matches }
}

const before = measure('개선 전', filterBefore)
const after = measure('개선 후', filterAfter)
const improvement = ((before.milliseconds - after.milliseconds) / before.milliseconds) * 100
console.table([before, after].map((item) => ({ 구분: item.label, '총 시간(ms)': item.milliseconds.toFixed(2), '1회 평균(ms)': (item.milliseconds / iterations).toFixed(3), '검색 결과': item.matches })))
console.log(`현재 실행 기준 변화율: ${improvement.toFixed(1)}% (양수이면 개선 후가 빠름)`)
console.log(`조건: Node ${process.version}, ${size.toLocaleString()}개 자료 × ${iterations}회. 최소 3번 실행해 중앙값을 비교하세요.`)

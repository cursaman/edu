import { performance } from 'node:perf_hooks'
import { filterPrograms as currentFilter } from '../src/domain/programs.js'

const baseline = (programs, query) => programs.filter((program) => program.title.toLowerCase().includes(query.trim().toLowerCase()))
const programs = Array.from({ length: 20000 }, (_, id) => ({ id, title: id % 3 === 0 ? `React 리팩터링 ${id}` : `교육 프로그램 ${id}` }))
function measure(filter) { for(let i=0;i<30;i+=1) filter(programs,' react '); const start=performance.now(); let count=0; for(let i=0;i<300;i+=1) count=filter(programs,' react ').length; return { ms:performance.now()-start,count } }
const base=measure(baseline); const current=measure(currentFilter)
console.table([{구분:'기준 함수','총 시간(ms)':base.ms.toFixed(2),결과:base.count},{구분:'현재 프로젝트','총 시간(ms)':current.ms.toFixed(2),결과:current.count}])
console.log('측정값은 환경에 따라 달라지므로 3회 이상 실행해 중앙값을 비교하세요.')

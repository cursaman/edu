import assert from 'node:assert/strict'
import test from 'node:test'
import { appendProgram, filterPrograms } from '../src/domain/programs.js'

const programs = [{ id: 1, title: 'React 리팩터링', track: '시니어' }, { id: 2, title: 'Supabase 보안', track: '시니어' }]

test('검색어의 대소문자와 앞뒤 공백을 무시한다', () => assert.deepEqual(filterPrograms(programs, '  react '), [programs[0]]))
test('빈 검색어는 전체 프로그램을 그대로 반환한다', () => assert.equal(filterPrograms(programs, ''), programs))
test('프로그램 추가 시 원본 배열을 변경하지 않는다', () => { const next = appendProgram(programs, { id: 3, title: ' 결제 안정화 ', track: '실무' }); assert.equal(programs.length, 2); assert.equal(next[2].title, '결제 안정화') })
test('빈 제목은 추가하지 않는다', () => assert.equal(appendProgram(programs, { id: 3, title: '   ' }), programs))

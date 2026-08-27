export const featuredLearningPrograms = [
  {
    programId: 'web-foundation',
    shortTitle: '웹 기초',
    promise: '코딩을 처음 접해도 글·색상·버튼이 있는 반응형 홈페이지를 완성합니다.',
    resultTitle: '나를 소개하는 첫 홈페이지',
    resultDescription: 'HTML로 내용을 구성하고 CSS와 JavaScript를 더해 PC·모바일에서 동작하는 한 페이지를 만듭니다.',
    image: 'images/programs/web-foundation.webp',
    imageAlt: '소개 문구와 카드, 버튼으로 구성된 첫 홈페이지 결과 화면',
    freeSessions: 3,
    fit: ['처음 시작', '화면 만들기', '천천히 따라 하기'],
    quality: {
      status: '무료 체험 콘텐츠 검증 완료',
      checked: ['1~3회차 강사용 대본과 활동지 점검', 'HTML 실습 파일 실행 확인', '초보자용 설치·저장·실행 순서 보완'],
      next: '실제 수강생 시범수업 후 소요 시간과 반복 질문을 추가 반영할 예정입니다.',
    },
  },
  {
    programId: 'javascript-practical',
    shortTitle: '실무 JavaScript',
    promise: '문법을 외우는 데 그치지 않고 입력·버튼·목록·저장이 동작하는 기능을 만듭니다.',
    resultTitle: '저장되는 할 일 관리 화면',
    resultDescription: '사용자 입력을 검사하고 목록을 추가·삭제하며 브라우저에 내용을 저장하는 작은 서비스를 완성합니다.',
    image: 'images/programs/foundation-js.webp',
    imageAlt: '할 일을 입력하고 완료 상태를 관리하는 JavaScript 웹서비스 결과 화면',
    freeSessions: 3,
    fit: ['기초 경험', '기능 만들기', '반복 실습'],
    quality: {
      status: '무료 체험 콘텐츠 검증 완료',
      checked: ['1~3회차 예제 코드를 Node.js에서 실행', '예상 출력과 실제 출력 비교', '자료형·문자열 설명과 오류 복구 순서 보완'],
      next: '실제 수강생 시범수업 후 막히는 문법과 실습 시간을 추가 조정할 예정입니다.',
    },
  },
  {
    programId: 'react-website',
    shortTitle: 'React 웹사이트',
    promise: '화면을 재사용 가능한 부품으로 나누고 데이터로 반복되는 반응형 사이트를 완성합니다.',
    resultTitle: '교육 프로그램 소개 사이트',
    resultDescription: '헤더·프로그램 카드·필터·상세 화면이 연결된 React 사이트를 만들고 빌드 결과까지 확인합니다.',
    image: 'images/programs/react-website.webp',
    imageAlt: '여러 교육 프로그램 카드가 반응형으로 배치된 React 사이트 결과 화면',
    freeSessions: 3,
    fit: ['기초 경험', '화면 만들기', '결과물 중심'],
    quality: {
      status: '무료 체험 콘텐츠 검증 완료',
      checked: ['1~3회차 JSX 문법과 빌드 변환 확인', '강사용 대본·활동지·완성 파일 연결 확인', '컴포넌트·props·map 설명 보완'],
      next: '실제 수강생 시범수업 후 개발 환경 차이와 반복 질문을 추가 반영할 예정입니다.',
    },
  },
]

export function findFeaturedLearning(programId) {
  return featuredLearningPrograms.find((item) => item.programId === programId) || null
}

export function recommendFeaturedProgram(answers) {
  const scores = Object.fromEntries(featuredLearningPrograms.map((item) => [item.programId, 0]))
  if (answers.experience === 'none') scores['web-foundation'] += 5
  if (answers.experience === 'basic') { scores['javascript-practical'] += 3; scores['react-website'] += 2 }
  if (answers.goal === 'page') { scores['web-foundation'] += 3; scores['react-website'] += 2 }
  if (answers.goal === 'feature') scores['javascript-practical'] += 5
  if (answers.goal === 'portfolio') scores['react-website'] += 5
  if (answers.style === 'slow') scores['web-foundation'] += 2
  if (answers.style === 'repeat') scores['javascript-practical'] += 2
  if (answers.style === 'project') scores['react-website'] += 2
  if (answers.time === '10') scores['web-foundation'] += 1
  if (answers.time === '30') scores['javascript-practical'] += 1
  if (answers.time === '50') scores['react-website'] += 1
  return [...featuredLearningPrograms].sort((a, b) => scores[b.programId] - scores[a.programId])[0]
}

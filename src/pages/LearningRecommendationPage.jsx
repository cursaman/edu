import { useState } from 'react'
import { findDetailedCourse } from '../data/courseLessons.js'
import { recommendFeaturedProgram } from '../data/featuredLearning.js'

const questions = [
  { key: 'experience', title: '웹개발 경험이 어느 정도인가요?', options: [['none', '처음입니다'], ['basic', '조금 따라 해봤습니다']] },
  { key: 'goal', title: '가장 먼저 만들고 싶은 것은 무엇인가요?', options: [['page', '나를 소개하는 홈페이지'], ['feature', '버튼과 저장이 되는 기능'], ['portfolio', 'React 포트폴리오 사이트']] },
  { key: 'style', title: '어떤 방식이 가장 편한가요?', options: [['slow', '천천히 화면부터'], ['repeat', '작은 코드를 반복'], ['project', '결과물을 만들면서']] },
  { key: 'time', title: '한 번에 가능한 학습 시간은 얼마인가요?', options: [['10', '약 10분'], ['30', '약 30분'], ['50', '약 50분']] },
]

export default function LearningRecommendationPage() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const complete = questions.every((question) => answers[question.key])
  const course = result ? findDetailedCourse(result.programId) : null

  function submit(event) {
    event.preventDefault()
    if (complete) setResult(recommendFeaturedProgram(answers))
  }

  return <section className="content-page page-shell recommendation-page" aria-labelledby="recommendation-title">
    <header className="recommendation-hero"><span className="section-eyebrow">60-SECOND COURSE FINDER</span><h1 id="recommendation-title">나에게 맞는 첫 과정을 찾아보세요</h1><p>코딩 용어를 몰라도 괜찮습니다. 네 가지 질문에 답하면 무료로 시작할 대표 과정을 골라드립니다.</p></header>
    <form className="recommendation-form" onSubmit={submit}>
      {questions.map((question, index) => <fieldset key={question.key}><legend><span>{String(index + 1).padStart(2, '0')}</span>{question.title}</legend><div>{question.options.map(([value, label]) => <label className={answers[question.key] === value ? 'recommendation-option-active' : ''} key={value}><input checked={answers[question.key] === value} name={question.key} onChange={() => { setAnswers((current) => ({ ...current, [question.key]: value })); setResult(null) }} type="radio" value={value} />{label}</label>)}</div></fieldset>)}
      <button className="button button-primary" disabled={!complete} type="submit">추천 결과 확인하기 →</button>
    </form>
    {result && course && <article className="recommendation-result" aria-live="polite"><div><span className="section-eyebrow">YOUR FIRST COURSE</span><h2>{result.shortTitle}</h2><p>{result.promise}</p><ul><li>첫 3회차 무료 체험</li><li>회차별 실습 파일과 확인 문제</li><li>완성 결과: {result.resultTitle}</li></ul><div className="recommendation-result-actions"><a className="button button-primary" href={`#/classroom/${result.programId}/${course.sessions[0].id}`}>무료 체험 시작하기 →</a><a className="button button-secondary" href={`#/programs/${result.programId}`}>과정 자세히 보기</a></div></div><img alt={result.imageAlt} src={`${import.meta.env.BASE_URL}${result.image}`} /></article>}
  </section>
}

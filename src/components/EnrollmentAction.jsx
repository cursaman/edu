import { useEffect, useState } from 'react'
import { allowedCourseStatuses, cancelPendingEnrollment, enrollmentStatuses, getEnrollment, requestEnrollment } from '../data/enrollmentStorage.js'
import { canPurchase, formatPrice, effectivePrice } from '../data/pricing.js'

export default function EnrollmentAction({ course, priceProgram, programId, session }) {
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(Boolean(session?.user))
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!session?.user?.id) { setLoading(false); return }
    let active = true
    getEnrollment(session.user.id, programId).then((data) => { if (active) setEnrollment(data) }).catch(() => { if (active) setMessage('수강 신청 상태를 불러오지 못했습니다.') }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [programId, session?.user?.id])

  async function apply() {
    setLoading(true); setMessage('')
    try { setEnrollment(await requestEnrollment(session.user.id, programId)); setMessage('수강 신청이 접수되었습니다. 관리자 승인을 기다려 주세요.') }
    catch (error) { setMessage(error.message === '이미 신청한 과정입니다.' ? error.message : '신청을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.') }
    finally { setLoading(false) }
  }

  async function cancel() {
    if (!window.confirm('승인 대기 중인 신청을 취소할까요?')) return
    setLoading(true); setMessage('')
    try { await cancelPendingEnrollment(session.user.id, programId); setEnrollment(null); setMessage('신청을 취소했습니다.') }
    catch (error) { setMessage(error.message || '신청을 취소하지 못했습니다.') }
    finally { setLoading(false) }
  }

  if (!course) return null
  if (!session?.user) return <div className="enrollment-action"><strong>전체 과정 수강 신청</strong><p>첫 3회차는 로그인 없이 무료입니다. 4회차부터는 로그인과 수강권이 필요합니다.</p><a className="button button-primary" href={`#/login?next=/programs/${programId}`}>로그인하고 신청하기</a></div>
  if (loading) return <div className="enrollment-action"><p role="status">수강 상태를 확인하고 있습니다...</p></div>
  if (!enrollment) return <div className="enrollment-action"><strong>전체 {course.sessions.length}회차 수강 신청</strong><p>이메일 계정만 사용하며 추가 개인정보는 받지 않습니다.</p>{canPurchase(priceProgram) ? <a className="button button-primary" href={`#/checkout/${programId}`}>{formatPrice(effectivePrice(priceProgram))} 결제하고 수강하기</a> : <button className="button button-primary" onClick={apply} type="button">수강 신청하기</button>}{message && <small role="status">{message}</small>}</div>

  const canLearn = allowedCourseStatuses.includes(enrollment.status)
  return <div className="enrollment-action"><span className={`enrollment-status enrollment-status-${enrollment.status}`}>{enrollmentStatuses[enrollment.status] || enrollment.status}</span><strong>{canLearn ? '전체 회차를 학습할 수 있습니다.' : '수강 신청 처리 상태'}</strong>{!canLearn && canPurchase(priceProgram) && <a className="button button-primary" href={`#/checkout/${programId}`}>{formatPrice(effectivePrice(priceProgram))} 결제하고 수강하기</a>}{enrollment.status === 'pending' && <button className="button button-secondary" onClick={cancel} type="button">대기 신청 취소</button>}{canLearn && <a className="button button-primary" href={`#/classroom/${programId}/${course.sessions[0].id}`}>강의실 입장하기</a>}{message && <small role="status">{message}</small>}</div>
}

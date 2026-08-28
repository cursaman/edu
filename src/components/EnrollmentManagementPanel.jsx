import { useEffect, useMemo, useState } from 'react'
import { enrollmentStatuses, loadAdminEnrollments, updateEnrollmentStatus } from '../data/enrollmentStorage.js'

export default function EnrollmentManagementPanel({ programs, session }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const titles = useMemo(() => new Map(programs.map((item) => [item.id, item.title])), [programs])

  async function load() {
    setLoading(true); setMessage('')
    try { setItems(await loadAdminEnrollments()) }
    catch { setMessage('신청 목록을 불러오지 못했습니다. 최신 schema.sql 실행과 관리자 권한을 확인해 주세요.') }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])

  async function change(item, status) {
    setMessage('')
    try { await updateEnrollmentStatus(item.user_id, item.program_id, status, session.user.id); await load(); setMessage('수강 상태를 변경했습니다.') }
    catch { setMessage('상태를 변경하지 못했습니다. 관리자 권한과 RLS 정책을 확인해 주세요.') }
  }

  return <div className="admin-content enrollment-management"><div className="admin-toolbar"><h2>수강 신청 관리 <span>{items.length}건</span></h2><button className="button button-secondary" onClick={load} type="button">새로고침</button></div>{message && <p className="form-message" role="status">{message}</p>}{loading ? <p role="status">신청 목록을 불러오고 있습니다...</p> : items.length === 0 ? <p>접수된 수강 신청이 없습니다.</p> : <div className="admin-item-list">{items.map((item) => <article className="admin-item enrollment-admin-item" key={`${item.user_id}-${item.program_id}`}><div><strong>{titles.get(item.program_id) || item.program_id}</strong><span>{item.user_email} · {new Date(item.requested_at || item.enrolled_at).toLocaleDateString('ko-KR')}</span></div><label>상태<span className="sr-only"> 변경</span><select value={item.status} onChange={(event) => change(item, event.target.value)}>{Object.entries(enrollmentStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></article>)}</div>}</div>
}

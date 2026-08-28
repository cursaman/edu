import { supabase } from '../lib/supabase.js'

export const enrollmentStatuses = {
  pending: '승인 대기',
  approved: '승인됨',
  rejected: '거절됨',
  active: '수강 중',
  completed: '완료',
  cancelled: '취소',
}

export const allowedCourseStatuses = ['approved', 'active', 'completed']

function requireConnection() {
  if (!supabase) throw new Error('Supabase 연결 정보를 확인해 주세요.')
}

export async function getEnrollment(userId, programId) {
  requireConnection()
  if (!userId) return null
  const { data, error } = await supabase.from('course_enrollments').select('*').eq('user_id', userId).eq('program_id', programId).maybeSingle()
  if (error) throw error
  return data
}

export async function requestEnrollment(userId, programId) {
  requireConnection()
  const { data, error } = await supabase.from('course_enrollments').insert({ user_id: userId, program_id: programId, status: 'pending' }).select().single()
  if (error) {
    if (error.code === '23505') throw new Error('이미 신청한 과정입니다.')
    throw error
  }
  return data
}

export async function cancelPendingEnrollment(userId, programId) {
  requireConnection()
  const { error, count } = await supabase.from('course_enrollments').delete({ count: 'exact' }).eq('user_id', userId).eq('program_id', programId).eq('status', 'pending')
  if (error) throw error
  if (!count) throw new Error('승인 대기 중인 신청만 취소할 수 있습니다.')
}

export async function loadAdminEnrollments() {
  requireConnection()
  const { data, error } = await supabase.rpc('get_edu_enrollment_applications')
  if (error) throw error
  return data || []
}

export async function updateEnrollmentStatus(userId, programId, status, adminId) {
  requireConnection()
  const approved = ['approved', 'active', 'completed'].includes(status)
  const { error } = await supabase.from('course_enrollments').update({
    status,
    approved_at: approved ? new Date().toISOString() : null,
    approved_by: approved ? adminId : null,
    completed_at: status === 'completed' ? new Date().toISOString() : null,
  }).eq('user_id', userId).eq('program_id', programId)
  if (error) throw error
}

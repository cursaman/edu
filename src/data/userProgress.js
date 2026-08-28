import { supabase } from '../lib/supabase.js'
import { readCourseProgress } from './courseProgress.js'

const migrationKey = (userId) => `edu-course-progress-migrated:${userId}`

function requireUser(userId) {
  if (!supabase || !userId) throw new Error('로그인 또는 Supabase 연결을 확인해 주세요.')
}

export async function loadUserLearning(userId) {
  requireUser(userId)
  const [{ data: progress, error: progressError }, { data: enrollments, error: enrollmentError }] = await Promise.all([
    supabase.from('course_progress').select('program_id, session_id, completed, completed_at, updated_at').eq('user_id', userId),
    supabase.from('course_enrollments').select('program_id, status, requested_at, approved_at, approved_by, last_session_id, last_studied_at, enrolled_at, completed_at').eq('user_id', userId).order('requested_at', { ascending: false }),
  ])
  if (progressError) throw progressError
  if (enrollmentError) throw enrollmentError

  const completedByProgram = {}
  for (const row of progress || []) {
    if (!row.completed) continue
    if (!completedByProgram[row.program_id]) completedByProgram[row.program_id] = []
    completedByProgram[row.program_id].push(row.session_id)
  }
  return { completedByProgram, enrollments: enrollments || [] }
}

export async function recordLastSession(userId, programId, sessionId) {
  requireUser(userId)
  const { error } = await supabase.rpc('record_edu_course_session', { p_program_id: programId, p_session_id: sessionId })
  if (error) throw error
}

export async function saveUserSessionProgress(userId, programId, sessionId, completed) {
  requireUser(userId)
  const now = new Date().toISOString()
  const { error: progressError } = await supabase.from('course_progress').upsert({
    user_id: userId,
    program_id: programId,
    session_id: sessionId,
    completed,
    completed_at: completed ? now : null,
    updated_at: now,
  }, { onConflict: 'user_id,program_id,session_id' })
  if (progressError) throw progressError
  await recordLastSession(userId, programId, sessionId)
}

export async function migrateLocalProgress(userId) {
  requireUser(userId)
  if (window.localStorage.getItem(migrationKey(userId))) return { migrated: false, count: 0 }

  const localProgress = readCourseProgress()
  const rows = Object.entries(localProgress).flatMap(([programId, sessionIds]) => (
    sessionIds.map((sessionId) => ({
      user_id: userId,
      program_id: programId,
      session_id: sessionId,
      completed: true,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  ))
  if (rows.length > 0) {
    const { error } = await supabase.from('course_progress').upsert(rows, { onConflict: 'user_id,program_id,session_id' })
    if (error) throw error
  }
  window.localStorage.setItem(migrationKey(userId), new Date().toISOString())
  return { migrated: rows.length > 0, count: rows.length }
}

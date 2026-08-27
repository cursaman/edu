const STORAGE_KEY = 'edu-course-progress'

export function readCourseProgress() {
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}

export function completedCourseSessions(programId) {
  return readCourseProgress()[programId] || []
}

export function setCourseSessionCompleted(programId, sessionId, completed) {
  const progress = readCourseProgress()
  const current = new Set(progress[programId] || [])
  if (completed) current.add(sessionId); else current.delete(sessionId)
  progress[programId] = [...current]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  window.dispatchEvent(new CustomEvent('edu-course-progress-updated'))
  return progress[programId]
}

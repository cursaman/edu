const STORAGE_KEY = 'edu-completed-lessons'

export function readCompletedLessons() {
  try {
    const savedLessons = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(savedLessons) ? savedLessons : []
  } catch {
    return []
  }
}

export function updateLessonCompletion(lessonId, completed) {
  const completedLessons = readCompletedLessons()
  const nextCompletedLessons = completed
    ? [...new Set([...completedLessons, lessonId])]
    : completedLessons.filter((savedLessonId) => savedLessonId !== lessonId)

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompletedLessons))
    return nextCompletedLessons
  } catch {
    return completedLessons
  }
}

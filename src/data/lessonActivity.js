const keys = { favorites: 'edu-favorite-lessons', recent: 'edu-recent-lessons' }

function readList(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function saveList(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent('edu-lesson-activity-updated'))
  } catch {
    // 저장 공간을 사용할 수 없어도 교육자료 읽기는 계속할 수 있습니다.
  }
  return value
}

export const readFavoriteLessons = () => readList(keys.favorites)
export const readRecentLessons = () => readList(keys.recent)

export function toggleFavoriteLesson(lessonId) {
  const current = readFavoriteLessons()
  return saveList(keys.favorites, current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [lessonId, ...current])
}

export function recordRecentLesson(lessonId) {
  return saveList(keys.recent, [lessonId, ...readRecentLessons().filter((id) => id !== lessonId)].slice(0, 6))
}


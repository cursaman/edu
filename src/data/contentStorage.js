import { lessons as defaultLessons } from './lessons.js'
import { notices as defaultNotices } from './notices.js'

const storageKeys = { lessons: 'edu-managed-lessons', notices: 'edu-managed-notices' }
const defaults = { lessons: defaultLessons, notices: defaultNotices }

export function readManagedContent(type) {
  try {
    const saved = window.localStorage.getItem(storageKeys[type])
    if (!saved) return defaults[type]
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : defaults[type]
  } catch {
    return defaults[type]
  }
}

export function saveManagedContent(type, items) {
  try {
    window.localStorage.setItem(storageKeys[type], JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function restoreManagedContent(type) {
  try {
    window.localStorage.removeItem(storageKeys[type])
    return defaults[type]
  } catch {
    return readManagedContent(type)
  }
}

export function findManagedLesson(id) {
  return readManagedContent('lessons').find((item) => item.id === id)
}

export function findManagedNotice(id) {
  return readManagedContent('notices').find((item) => item.id === id)
}

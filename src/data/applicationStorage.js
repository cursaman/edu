const STORAGE_KEY = 'edu-trial-application'

export function readTrialApplication() {
  try {
    const savedApplication = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    return savedApplication && typeof savedApplication === 'object' ? savedApplication : null
  } catch {
    return null
  }
}

export function saveTrialApplication(application) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(application))
    return true
  } catch {
    return false
  }
}

export function removeTrialApplication() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

const STORAGE_KEY = 'edu-class-quality-records'

export const qualityStatuses = ['초안', '강사 검수', '파일럿 예정', '수정 필요', '재검증', '공개 가능']

export function readQualityRecords() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist(records) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    window.dispatchEvent(new CustomEvent('edu-quality-updated'))
    return true
  } catch {
    return false
  }
}

export function saveQualityRecord(record) {
  const records = readQualityRecords()
  const saved = {
    ...record,
    id: record.id || `quality-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    updatedAt: new Date().toISOString(),
  }
  const next = records.some((item) => item.id === saved.id)
    ? records.map((item) => item.id === saved.id ? saved : item)
    : [saved, ...records]
  return persist(next) ? next : null
}

export function removeQualityRecord(recordId) {
  const next = readQualityRecords().filter((item) => item.id !== recordId)
  return persist(next) ? next : null
}

export function makeQualityExport(records, courses) {
  return JSON.stringify({
    project: 'EDU 웹개발 교육 플랫폼',
    exportedAt: new Date().toISOString(),
    notice: '수업 품질 검증용 데이터입니다. 실제 개인정보를 포함하지 마세요.',
    courses: courses.map((course) => ({ programId: course.programId, title: course.title, totalSessions: course.sessions.length })),
    records,
  }, null, 2)
}

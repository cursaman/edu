const checklistKey = 'edu-web-foundation-trial-checklists-v1'
const certificateKey = 'edu-web-foundation-certificate-v1'

export const trialSessionIds = ['web-foundation-01', 'web-foundation-02', 'web-foundation-03']

export const trialChecklists = {
  'web-foundation-01': ['시작 HTML 파일을 다운로드했습니다.', '파일을 Chrome에서 열었습니다.', '제목과 설명 문구를 직접 바꿨습니다.', '저장 후 새로고침하여 결과를 확인했습니다.'],
  'web-foundation-02': ['2회차 시작 파일을 다운로드했습니다.', 'header·main·목록 구조를 작성했습니다.', '한글과 목록이 정상 표시되는지 확인했습니다.', '완성 파일과 내 코드를 비교했습니다.'],
  'web-foundation-03': ['3회차 시작 파일을 다운로드했습니다.', '내 서비스명·대상·제공 내용을 입력했습니다.', 'PC와 모바일 미리보기를 확인했습니다.', '내 홈페이지 HTML 결과물을 다운로드해 열었습니다.'],
}

export function readTrialChecks(sessionId) {
  try { return JSON.parse(localStorage.getItem(checklistKey) || '{}')[sessionId] || [] } catch { return [] }
}

export function saveTrialChecks(sessionId, checkedIndexes) {
  let all = {}
  try { all = JSON.parse(localStorage.getItem(checklistKey) || '{}') } catch { /* 빈 상태로 복구 */ }
  all[sessionId] = checkedIndexes
  localStorage.setItem(checklistKey, JSON.stringify(all))
  window.dispatchEvent(new CustomEvent('edu-free-trial-updated'))
  return checkedIndexes
}

export function getTrialResume(completed) {
  const count = trialSessionIds.filter((id) => completed.includes(id)).length
  return { count, nextSessionId: trialSessionIds.find((id) => !completed.includes(id)) || null, complete: count === trialSessionIds.length }
}

export function readCertificate() {
  try { return JSON.parse(localStorage.getItem(certificateKey) || '{}') } catch { return {} }
}

export function saveCertificate(value) {
  const next = { ...readCertificate(), ...value }
  localStorage.setItem(certificateKey, JSON.stringify(next))
  return next
}

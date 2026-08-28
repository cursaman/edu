import { useState } from 'react'
import { readTrialChecks, saveTrialChecks, trialChecklists } from '../data/freeTrialProgress.js'

export default function TrialStepChecklist({ sessionId, onReadyChange }) {
  const items = trialChecklists[sessionId] || []
  const [checked, setChecked] = useState(() => readTrialChecks(sessionId))
  const ready = items.length > 0 && checked.length === items.length

  function toggle(index) {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index]
    setChecked(saveTrialChecks(sessionId, next))
    onReadyChange?.(next.length === items.length)
  }

  return <section className="trial-step-checklist"><div><span className="section-eyebrow">DO IT YOURSELF</span><h3>직접 확인한 단계</h3><p>실제로 수행한 항목만 체크하세요. 모든 단계를 확인해야 이 회차를 완료할 수 있습니다.</p></div><div className="trial-check-items">{items.map((item, index) => <label key={item}><input checked={checked.includes(index)} onChange={() => toggle(index)} type="checkbox" /><span>{item}</span></label>)}</div><strong className={ready ? 'trial-check-ready' : ''}>{checked.length}/{items.length}단계 확인 {ready ? '· 완료 준비됨' : ''}</strong></section>
}

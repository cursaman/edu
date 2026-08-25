import { useState } from 'react'
import { readTrialApplication, removeTrialApplication, saveTrialApplication } from '../data/applicationStorage.js'
import { programs } from '../data/catalog.js'

const emptyForm = { name: '', contact: '', programId: '', motivation: '', privacyAgreed: false }

function validateApplication(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.'
  if (!form.contact.trim()) errors.contact = '연락처를 입력해 주세요.'
  if (!form.programId) errors.programId = '관심 교육 프로그램을 선택해 주세요.'
  if (form.motivation.length > 300) errors.motivation = '신청 동기는 300자 이하로 입력해 주세요.'
  if (!form.privacyAgreed) errors.privacyAgreed = '개인정보 수집 체험 안내에 동의해 주세요.'
  return errors
}

export default function ApplicationPage() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [savedApplication, setSavedApplication] = useState(readTrialApplication)
  const [message, setMessage] = useState('')

  function updateField(event) {
    const { checked, name, type, value } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateApplication(form)
    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length > 0) return

    const application = { ...form, savedAt: new Date().toLocaleString('ko-KR') }
    if (saveTrialApplication(application)) {
      setSavedApplication(application)
      setForm(emptyForm)
      setMessage('체험 신청이 저장되었습니다. 현재 브라우저에만 저장되며 실제 수강 신청은 아닙니다.')
    } else {
      setMessage('브라우저 저장 공간을 사용할 수 없어 저장하지 못했습니다.')
    }
  }

  function handleDelete() {
    if (removeTrialApplication()) {
      setSavedApplication(null)
      setMessage('저장된 체험 신청을 삭제했습니다.')
    }
  }

  const selectedProgram = savedApplication
    ? programs.find((program) => program.id === savedApplication.programId)
    : null

  return (
    <section className="content-page page-shell" aria-labelledby="application-title">
      <div className="page-introduction">
        <span className="section-eyebrow">TRIAL APPLICATION</span>
        <h1 id="application-title">수강 신청 체험하기</h1>
        <p>입력과 저장 과정을 연습하는 화면입니다. 실제 접수나 외부 전송은 이루어지지 않습니다.</p>
      </div>

      <div className="privacy-warning" role="note">
        <strong>꼭 확인해 주세요</strong>
        <p>현재 브라우저에만 저장되는 교육용 체험입니다. 실제 이름이나 실제 전화번호 등 개인정보를 입력하지 마세요.</p>
      </div>

      <div className="application-layout">
        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="application-name">이름 <span>필수</span></label>
            <input aria-describedby="name-help name-error" id="application-name" name="name" onChange={updateField} placeholder="예: 홍길동(연습용 이름)" value={form.name} />
            <small id="name-help">실제 이름 대신 연습용 이름을 사용하세요.</small>
            {errors.name && <strong className="form-error" id="name-error">{errors.name}</strong>}
          </div>
          <div className="form-field">
            <label htmlFor="application-contact">연락처 <span>필수</span></label>
            <input aria-describedby="contact-help contact-error" id="application-contact" name="contact" onChange={updateField} placeholder="예: 010-0000-0000" value={form.contact} />
            <small id="contact-help">실제 번호를 입력하지 마세요.</small>
            {errors.contact && <strong className="form-error" id="contact-error">{errors.contact}</strong>}
          </div>
          <div className="form-field">
            <label htmlFor="application-program">관심 교육 프로그램 <span>필수</span></label>
            <select aria-describedby="program-error" id="application-program" name="programId" onChange={updateField} value={form.programId}>
              <option value="">프로그램을 선택하세요</option>
              {programs.map((program) => <option key={program.id} value={program.id}>{program.title}</option>)}
            </select>
            {errors.programId && <strong className="form-error" id="program-error">{errors.programId}</strong>}
          </div>
          <div className="form-field">
            <label htmlFor="application-motivation">신청 동기 <span>선택</span></label>
            <textarea id="application-motivation" maxLength="300" name="motivation" onChange={updateField} placeholder="배우고 싶은 내용을 간단히 적어보세요." rows="5" value={form.motivation} />
            <small>{form.motivation.length} / 300자</small>
            {errors.motivation && <strong className="form-error">{errors.motivation}</strong>}
          </div>
          <div className="consent-field">
            <input aria-describedby="privacy-error" checked={form.privacyAgreed} id="privacy-agreed" name="privacyAgreed" onChange={updateField} type="checkbox" />
            <label htmlFor="privacy-agreed">입력 내용이 외부 전송 없이 현재 브라우저에만 저장되는 체험임을 확인했습니다.</label>
          </div>
          {errors.privacyAgreed && <strong className="form-error" id="privacy-error">{errors.privacyAgreed}</strong>}
          <button className="button button-primary" type="submit">체험 신청 저장하기</button>
          {message && <p className="form-message" role="status">{message}</p>}
        </form>

        <aside className="saved-application">
          <span className="section-eyebrow">SAVED IN THIS BROWSER</span>
          <h2>저장한 체험 신청</h2>
          {savedApplication ? (
            <>
              <dl>
                <div><dt>이름</dt><dd>{savedApplication.name}</dd></div>
                <div><dt>연락처</dt><dd>{savedApplication.contact}</dd></div>
                <div><dt>프로그램</dt><dd>{selectedProgram?.title || '선택한 프로그램'}</dd></div>
                <div><dt>저장 시각</dt><dd>{savedApplication.savedAt}</dd></div>
              </dl>
              {savedApplication.motivation && <p>{savedApplication.motivation}</p>}
              <button className="button button-danger" onClick={handleDelete} type="button">저장 내용 삭제하기</button>
            </>
          ) : <p>현재 브라우저에 저장된 체험 신청이 없습니다.</p>}
        </aside>
      </div>
    </section>
  )
}

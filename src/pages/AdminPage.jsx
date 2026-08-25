import { useEffect, useState } from 'react'
import { readTrialApplication, removeTrialApplication } from '../data/applicationStorage.js'
import { categories } from '../data/catalog.js'
import { deleteSharedItem, loadSharedContent, readManagedContent, restoreManagedContent, restoreSharedContent, saveManagedContent, saveSharedItem } from '../data/contentStorage.js'
import { readCompletedLessons } from '../data/learningProgress.js'

const emptyLesson = { title: '', categoryId: '', level: '입문', duration: '20분', description: '', explanation: '', steps: '', code: '', prompt: '' }
const emptyNotice = { title: '', date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').replace(/\.$/, ''), summary: '', content: '' }
const emptyProgram = { title: '', categoryId: '', level: '입문', duration: '4주 · 토요일', status: '모집 예정', description: '', introduction: '', audience: '', goals: '', curriculum: '', preparations: '', relatedLessonIds: [] }

function linesToList(value) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean)
}

function ProgramForm({ editing, lessons, onCancel, onSave }) {
  const initial = editing
    ? {
      ...editing,
      audience: editing.audience?.join('\n') || '',
      goals: editing.goals?.join('\n') || '',
      curriculum: editing.curriculum?.join('\n') || '',
      preparations: editing.preparations?.join('\n') || '',
      relatedLessonIds: editing.relatedLessonIds || [],
    }
    : emptyProgram
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function toggleLesson(lessonId) {
    const selected = form.relatedLessonIds.includes(lessonId)
    updateField('relatedLessonIds', selected
      ? form.relatedLessonIds.filter((item) => item !== lessonId)
      : [...form.relatedLessonIds, lessonId])
  }

  function submit(event) {
    event.preventDefault()
    const required = ['title', 'categoryId', 'duration', 'description', 'introduction', 'audience', 'goals', 'curriculum', 'preparations']
    if (required.some((field) => !form[field]?.trim())) {
      setError('프로그램명, 교육 분야, 기간, 소개, 대상, 목표, 교육 과정과 준비물을 모두 입력해 주세요.')
      return
    }

    const category = categories.find((item) => item.id === form.categoryId)
    const categoryColors = { foundation: 'violet', frontend: 'violet', backend: 'mint', database: 'mint', 'ai-development': 'coral', deployment: 'mint' }

    onSave({
      ...editing,
      ...form,
      id: editing?.id || `program-${Date.now()}`,
      category: category.title,
      audience: linesToList(form.audience),
      goals: linesToList(form.goals),
      curriculum: linesToList(form.curriculum),
      preparations: linesToList(form.preparations),
      color: editing?.color || categoryColors[category.id] || 'violet',
      number: editing?.number || String(readManagedContent('programs').length + 1).padStart(2, '0'),
    })
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>{editing ? '교육 프로그램 수정하기' : '새 교육 프로그램 등록'}</h3>
      <label>프로그램명 <input onChange={(event) => updateField('title', event.target.value)} required value={form.title} /></label>
      <label>교육 분야 <select onChange={(event) => updateField('categoryId', event.target.value)} required value={form.categoryId}><option value="">분야 선택</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
      <label>난이도 <select onChange={(event) => updateField('level', event.target.value)} value={form.level}><option>입문</option><option>기초</option><option>중급</option></select></label>
      <label>교육 기간 <input onChange={(event) => updateField('duration', event.target.value)} placeholder="예: 4주 · 토요일" required value={form.duration} /></label>
      <label>모집 상태 <select onChange={(event) => updateField('status', event.target.value)} value={form.status}><option>모집 예정</option><option>모집 중</option><option>모집 마감</option><option>운영 중</option></select></label>
      <label>카드에 표시할 짧은 소개 <textarea onChange={(event) => updateField('description', event.target.value)} required value={form.description} /></label>
      <label>프로그램 상세 소개 <textarea onChange={(event) => updateField('introduction', event.target.value)} required value={form.introduction} /></label>
      <label>학습 대상: 한 줄에 한 항목 <textarea onChange={(event) => updateField('audience', event.target.value)} placeholder="웹개발을 처음 시작하는 분" required value={form.audience} /></label>
      <label>학습 목표: 한 줄에 한 항목 <textarea onChange={(event) => updateField('goals', event.target.value)} placeholder="React 화면의 기본 구조를 이해합니다." required value={form.goals} /></label>
      <label>회차별 교육 과정: 한 줄에 한 회차 <textarea onChange={(event) => updateField('curriculum', event.target.value)} placeholder="1회차에 배울 내용을 작성하세요." required value={form.curriculum} /></label>
      <label>준비물: 한 줄에 한 항목 <textarea onChange={(event) => updateField('preparations', event.target.value)} placeholder="인터넷에 연결되는 노트북" required value={form.preparations} /></label>
      <fieldset>
        <legend>관련 교육자료 선택: 선택하지 않으면 같은 분야 자료를 보여줍니다.</legend>
        {lessons.map((lesson) => (
          <label key={lesson.id}>
            <input checked={form.relatedLessonIds.includes(lesson.id)} onChange={() => toggleLesson(lesson.id)} type="checkbox" />
            {' '}{lesson.title} · {lesson.category}
          </label>
        ))}
      </fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="admin-actions"><button className="button button-primary" type="submit">프로그램 저장하기</button><button className="button button-secondary" onClick={onCancel} type="button">취소</button></div>
    </form>
  )
}

function ContentForm({ type, editing, onCancel, onSave }) {
  const isLesson = type === 'lessons'
  const initial = editing ? { ...editing, steps: editing.steps?.join('\n') || '', content: editing.content?.join('\n') || '' } : isLesson ? emptyLesson : emptyNotice
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    const required = isLesson ? ['title', 'categoryId', 'duration', 'description', 'explanation'] : ['title', 'date', 'summary', 'content']
    if (required.some((key) => !form[key]?.trim())) return setError('필수 입력 항목을 모두 작성해 주세요.')
    const category = categories.find((item) => item.id === form.categoryId)
    const item = isLesson
      ? { ...editing, ...form, id: editing?.id || `lesson-${Date.now()}`, category: category.title, goals: editing?.goals || [form.title + '의 기본 내용을 이해합니다.'], steps: form.steps.split('\n').map((step) => step.trim()).filter(Boolean), codeLanguage: editing?.codeLanguage || 'JavaScript', checklist: editing?.checklist || ['예제를 직접 실행하고 결과를 확인했나요?'], nextLessonId: editing?.nextLessonId || null }
      : { ...editing, ...form, id: editing?.id || `notice-${Date.now()}`, content: form.content.split('\n').map((paragraph) => paragraph.trim()).filter(Boolean), checklist: editing?.checklist || ['안내 내용을 확인해 주세요.'] }
    onSave(item)
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>{editing ? '내용 수정하기' : isLesson ? '새 교육자료 등록' : '새 공지사항 등록'}</h3>
      <label>제목 <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
      {isLesson ? <>
        <label>교육 분야 <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required><option value="">분야 선택</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
        <label>난이도 <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}><option>입문</option><option>기초</option><option>중급</option></select></label>
        <label>학습 시간 <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required /></label>
        <label>간단한 설명 <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></label>
        <label>쉬운 개념 설명 <textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} required /></label>
        <label>실습 순서: 한 줄에 한 단계 <textarea value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} /></label>
        <label>예제 코드 <textarea value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></label>
        <label>Codex 요청 예시 <textarea value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} /></label>
      </> : <>
        <label>작성일 <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></label>
        <label>요약 <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required /></label>
        <label>본문: 한 줄에 한 문단 <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></label>
      </>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="admin-actions"><button className="button button-primary" type="submit">저장하기</button><button className="button button-secondary" onClick={onCancel} type="button">취소</button></div>
    </form>
  )
}

export default function AdminPage({ session = null, onLogout }) {
  const [section, setSection] = useState('overview')
  const [managedPrograms, setManagedPrograms] = useState(() => readManagedContent('programs'))
  const [managedLessons, setManagedLessons] = useState(() => readManagedContent('lessons'))
  const [managedNotices, setManagedNotices] = useState(() => readManagedContent('notices'))
  const [application, setApplication] = useState(readTrialApplication)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const connected = Boolean(session)
  const items = section === 'programs' ? managedPrograms : section === 'lessons' ? managedLessons : managedNotices
  const setters = { programs: setManagedPrograms, lessons: setManagedLessons, notices: setManagedNotices }

  useEffect(() => {
    if (!connected) return
    void loadSharedContent('programs').then(({ items: next, error }) => {
      setManagedPrograms(next)
      if (error) setMessage('교육 프로그램 공동 저장을 시작하려면 Supabase에서 최신 schema.sql과 seed.sql을 실행해 주세요.')
    })
    void loadSharedContent('lessons').then(({ items: next }) => setManagedLessons(next))
    void loadSharedContent('notices').then(({ items: next }) => setManagedNotices(next))
  }, [connected])

  function changeSection(next) { setSection(next); setEditing(null); setShowForm(false); setMessage('') }
  async function saveItem(item) {
    if (connected) {
      const result = await saveSharedItem(section, item)
      if (result.error) return setMessage('저장하지 못했습니다. 관리자 권한과 Supabase 테이블 설정을 확인해 주세요.')
      setters[section](result.items)
      setEditing(null); setShowForm(false); setMessage('변경 내용을 공동 저장소에 저장했습니다.')
      return
    }
    const next = editing ? items.map((existing) => existing.id === item.id ? item : existing) : [...items, item]
    if (saveManagedContent(section, next)) { setters[section](next); setEditing(null); setShowForm(false) }
  }
  async function deleteItem(item) {
    if (!window.confirm(`"${item.title}" 항목을 삭제할까요?`)) return
    if (connected) {
      const result = await deleteSharedItem(section, item.id)
      if (result.error) return setMessage('삭제하지 못했습니다. 관리자 권한을 확인해 주세요.')
      setters[section](result.items)
      setMessage('선택한 내용을 공동 저장소에서 삭제했습니다.')
      return
    }
    const next = items.filter((existing) => existing.id !== item.id)
    if (saveManagedContent(section, next)) setters[section](next)
  }
  async function restore(type) {
    const warning = connected ? '공동 저장소의 내용을 기본 자료로 복원할까요? 모든 사용자에게 반영됩니다.' : '브라우저에서 수정한 내용을 지우고 기본 자료로 복원할까요?'
    if (!window.confirm(warning)) return
    if (connected) {
      const result = await restoreSharedContent(type)
      if (result.error) return setMessage('기본 자료로 복원하지 못했습니다. 관리자 권한을 확인해 주세요.')
      setters[type](result.items)
      setShowForm(false); setEditing(null); setMessage('공동 저장소를 기본 자료로 복원했습니다.')
      return
    }
    const restored = restoreManagedContent(type)
    setters[type](restored)
    setShowForm(false); setEditing(null)
  }

  return (
    <section className="content-page page-shell admin-page" aria-labelledby="admin-title">
      <div className="page-introduction"><span className="section-eyebrow">{connected ? 'ADMIN DASHBOARD' : 'ADMIN EXPERIENCE'}</span><h1 id="admin-title">{connected ? '교육 플랫폼 관리자' : '관리자 기능 체험'}</h1><p>{connected ? '인증된 관리자만 교육 프로그램, 교육자료와 공지사항을 공동 저장소에서 관리합니다.' : '운영 화면의 흐름을 살펴보는 교육용 체험입니다.'}</p>{connected && <button className="button button-secondary" onClick={onLogout} type="button">로그아웃</button>}</div>
      <div className="privacy-warning"><strong>{connected ? '관리자 권한이 확인되었습니다.' : '관리자 기능 체험 화면입니다.'}</strong><p>{connected ? '교육 프로그램, 교육자료와 공지사항 변경은 다른 브라우저에도 반영됩니다. 수강 신청 체험은 현재 브라우저에만 저장됩니다. 실제 개인정보를 입력하지 마세요.' : 'Supabase 연결 정보가 없어 기존 체험 화면을 표시합니다. 실제 접근 제한 기능은 없으며 변경 내용은 현재 브라우저에만 저장됩니다. 실제 개인정보나 비밀번호를 입력하지 마세요.'}</p></div>
      {message && <p className="form-message" role="status">{message}</p>}
      <nav className="admin-navigation" aria-label="관리자 메뉴">{[['overview','운영 현황'],['programs','교육 프로그램 관리'],['lessons','교육자료 관리'],['notices','공지사항 관리'],['applications','체험 신청 확인']].map(([key,label]) => <button key={key} className={`filter-chip${section === key ? ' filter-chip-active' : ''}`} onClick={() => changeSection(key)} type="button">{label}</button>)}</nav>
      {section === 'overview' && <div className="admin-stats">{[['교육 분야', categories.length + '개'],['교육 프로그램', managedPrograms.length + '개'],['교육자료', managedLessons.length + '개'],['공지사항', managedNotices.length + '개'],['완료한 학습', readCompletedLessons().length + '개'],['체험 신청', application ? '저장됨' : '없음']].map(([title,value]) => <article key={title}><span>{title}</span><strong>{value}</strong></article>)}</div>}
      {['programs', 'lessons', 'notices'].includes(section) && <div className="admin-content"><div className="admin-toolbar"><h2>{section === 'programs' ? '교육 프로그램 관리' : section === 'lessons' ? '교육자료 관리' : '공지사항 관리'} <span>{items.length}개</span></h2><div className="admin-actions"><button className="button button-primary" onClick={() => { setEditing(null); setShowForm(true) }} type="button">새로 등록</button><button className="button button-secondary" onClick={() => restore(section)} type="button">기본 자료로 복원</button></div></div>{showForm && (section === 'programs' ? <ProgramForm key={`${section}-${editing?.id || 'new'}`} editing={editing} lessons={managedLessons} onCancel={() => { setEditing(null); setShowForm(false) }} onSave={saveItem} /> : <ContentForm key={`${section}-${editing?.id || 'new'}`} type={section} editing={editing} onCancel={() => { setEditing(null); setShowForm(false) }} onSave={saveItem} />)}<div className="admin-item-list">{items.map((item) => <article className="admin-item" key={item.id}><div><strong>{item.title}</strong><span>{section === 'notices' ? `${item.date} · ${item.summary}` : `${item.category} · ${item.level} · ${item.duration}`}</span></div><div className="admin-actions"><a className="button button-secondary" href={`#/${section === 'programs' ? 'programs' : section === 'lessons' ? 'lessons' : 'notice'}/${item.id}`}>보기</a><button className="button button-secondary" onClick={() => { setEditing(item); setShowForm(true) }} type="button">수정</button><button className="button button-danger" onClick={() => deleteItem(item)} type="button">삭제</button></div></article>)}</div></div>}
      {section === 'applications' && <div className="admin-application"><h2>브라우저에 저장된 체험 신청</h2>{application ? <><dl><div><dt>연습용 이름</dt><dd>{application.name}</dd></div><div><dt>연습용 연락처</dt><dd>{application.contact}</dd></div><div><dt>선택 프로그램</dt><dd>{managedPrograms.find((program) => program.id === application.programId)?.title || '선택한 프로그램'}</dd></div></dl><button className="button button-danger" onClick={() => { if(window.confirm('저장된 체험 신청을 삭제할까요?') && removeTrialApplication()) setApplication(null) }} type="button">체험 신청 삭제하기</button></> : <p>현재 브라우저에 저장된 체험 신청이 없습니다.</p>}</div>}
    </section>
  )
}

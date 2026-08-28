import { lessons as defaultLessons } from './lessons.js'
import { notices as defaultNotices } from './notices.js'
import { programs as defaultPrograms } from './catalog.js'
import { supabase } from '../lib/supabase.js'

const storageKeys = { programs: 'edu-managed-programs', lessons: 'edu-managed-lessons', notices: 'edu-managed-notices' }
const defaults = { programs: defaultPrograms, lessons: defaultLessons, notices: defaultNotices }
const tableNames = { programs: 'edu_programs', lessons: 'edu_lessons', notices: 'edu_notices' }

function fromDatabase(type, row) {
  if (type === 'programs') {
    return {
      id: row.id, title: row.title, categoryId: row.category_id, category: row.category,
      level: row.level, duration: row.duration, description: row.description,
      learningTrack: row.learning_track || '입문',
      introduction: row.introduction, audience: row.audience || [], goals: row.goals || [],
      curriculum: row.curriculum || [], preparations: row.preparations || [],
      relatedLessonIds: row.related_lesson_ids || [], status: row.status,
      color: row.color, number: row.display_number, image: row.image_url, imageAlt: row.image_alt,
      regularPrice: Number(row.regular_price) || 0, salePrice: Number(row.sale_price) || 0,
      isFree: Boolean(row.is_free), saleStatus: row.sale_status || 'draft',
    }
  }

  if (type === 'notices') {
    return { id: row.id, title: row.title, date: row.display_date, summary: row.summary, content: row.content, checklist: row.checklist }
  }

  return {
    id: row.id, title: row.title, categoryId: row.category_id, category: row.category,
    level: row.level, duration: row.duration, description: row.description,
    explanation: row.explanation, goals: row.goals, steps: row.steps,
    codeLanguage: row.code_language, code: row.code, prompt: row.prompt,
    checklist: row.checklist, nextLessonId: row.next_lesson_id,
    relatedProgramId: row.related_program_id, featured: row.is_featured,
    popular: row.is_popular, publishedAt: row.published_at,
    slideUrl: row.slide_url, pdfUrl: row.pdf_url,
    materialVersion: row.material_version, slidePages: row.slide_pages,
    extendedContent: defaultLessons.find((lesson) => lesson.id === row.id)?.extendedContent || null,
  }
}

function toDatabase(type, item) {
  if (type === 'programs') {
    return {
      id: item.id, title: item.title, category_id: item.categoryId, category: item.category,
      level: item.level, duration: item.duration, description: item.description,
      learning_track: item.learningTrack || '입문',
      introduction: item.introduction, audience: item.audience || [], goals: item.goals || [],
      curriculum: item.curriculum || [], preparations: item.preparations || [],
      related_lesson_ids: item.relatedLessonIds || [], status: item.status || '모집 예정',
      color: item.color || 'violet', display_number: item.number || '01',
      image_url: item.image || '', image_alt: item.imageAlt || '',
      regular_price: Math.max(0, Number(item.regularPrice) || 0),
      sale_price: Math.max(0, Number(item.salePrice) || 0),
      is_free: Boolean(item.isFree), sale_status: item.saleStatus || 'draft',
    }
  }

  if (type === 'notices') {
    return { id: item.id, title: item.title, display_date: item.date, summary: item.summary, content: item.content || [], checklist: item.checklist || [] }
  }

  return {
    id: item.id, title: item.title, category_id: item.categoryId, category: item.category,
    level: item.level, duration: item.duration, description: item.description,
    explanation: item.explanation, goals: item.goals || [], steps: item.steps || [],
    code_language: item.codeLanguage || 'JavaScript', code: item.code || '',
    prompt: item.prompt || '', checklist: item.checklist || [], next_lesson_id: item.nextLessonId || null,
    related_program_id: item.relatedProgramId || null, is_featured: Boolean(item.featured),
    is_popular: Boolean(item.popular), published_at: item.publishedAt || new Date().toISOString().slice(0, 10),
    slide_url: item.slideUrl || '', pdf_url: item.pdfUrl || '',
    material_version: item.materialVersion || '1.0', slide_pages: Number(item.slidePages) || 8,
  }
}

export function readManagedContent(type) {
  try {
    const saved = window.localStorage.getItem(storageKeys[type])
    if (!saved) return defaults[type]
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return defaults[type]
    if (type === 'programs') {
      const normalized = parsed.map((item) => ({ ...item, learningTrack: item.learningTrack || (['중급', '실전', '프로젝트', '고급'].includes(item.level) ? '실무' : '입문') }))
      const missingDefaults = defaultPrograms.filter((item) => !normalized.some((saved) => saved.id === item.id))
      return [...normalized, ...missingDefaults]
    }
    if (type !== 'lessons') return parsed

    return parsed.map((item) => {
      const original = defaultLessons.find((lesson) => lesson.id === item.id)
      return original ? { ...original, ...item, slideUrl: item.slideUrl || original.slideUrl, pdfUrl: item.pdfUrl || original.pdfUrl } : item
    })
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

export function findManagedProgram(id) {
  return readManagedContent('programs').find((item) => item.id === id)
}

export function findManagedNotice(id) {
  return readManagedContent('notices').find((item) => item.id === id)
}

export async function loadSharedContent(type) {
  if (!supabase) return { items: readManagedContent(type), error: null }

  const { data, error } = await supabase.from(tableNames[type]).select('*').order('created_at')
  if (error) return { items: readManagedContent(type), error }

  let items = data.map((row) => fromDatabase(type, row))
  if (type === 'programs') items = [...items, ...defaultPrograms.filter((item) => !items.some((saved) => saved.id === item.id))]
  saveManagedContent(type, items)
  window.dispatchEvent(new CustomEvent('edu-content-updated', { detail: { type } }))
  return { items, error: null }
}

export async function saveSharedItem(type, item) {
  if (!supabase) return { error: new Error('Supabase 연결 정보가 없습니다.') }

  const { error } = await supabase.from(tableNames[type]).upsert(toDatabase(type, item))
  if (error) return { error }
  return loadSharedContent(type)
}

export async function deleteSharedItem(type, id) {
  if (!supabase) return { error: new Error('Supabase 연결 정보가 없습니다.') }

  const { error } = await supabase.from(tableNames[type]).delete().eq('id', id)
  if (error) return { error }
  return loadSharedContent(type)
}

export async function restoreSharedContent(type) {
  if (!supabase) return { error: new Error('Supabase 연결 정보가 없습니다.') }

  const { error: deletionError } = await supabase.from(tableNames[type]).delete().neq('id', '')
  if (deletionError) return { error: deletionError }

  const { error } = await supabase.from(tableNames[type]).upsert(defaults[type].map((item) => toDatabase(type, item)))
  if (error) return { error }
  return loadSharedContent(type)
}


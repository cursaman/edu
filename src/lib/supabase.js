import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && publishableKey)

// 공개용 키만 브라우저에서 사용합니다. 관리자 권한은 데이터베이스 정책으로 검사합니다.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, publishableKey)
  : null

export async function checkAdminAccess(user) {
  if (!supabase || !user?.id) return false

  const { data, error } = await supabase
    .from('admin_profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle()

  return !error && data?.is_admin === true
}

import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import { loadSharedContent } from './data/contentStorage.js'
import { checkAdminAccess, isSupabaseConfigured, supabase } from './lib/supabase.js'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ApplicationPage from './pages/ApplicationPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import CourseClassroomPage from './pages/CourseClassroomPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LessonDetailPage from './pages/LessonDetailPage.jsx'
import LessonsPage from './pages/LessonsPage.jsx'
import MyClassroomPage from './pages/MyClassroomPage.jsx'
import NoticeDetailPage from './pages/NoticeDetailPage.jsx'
import NoticesPage from './pages/NoticesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProgramDetailPage from './pages/ProgramDetailPage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'

function readCurrentRoute() {
  const legacyRoutes = {
    home: '/',
    categories: '/categories',
    programs: '/programs',
    lessons: '/lessons',
    notice: '/notice',
    application: '/application',
  }
  const rawHash = window.location.hash.replace(/^#/, '')
  const hash = legacyRoutes[rawHash] || rawHash || '/'
  const [pathname, search = ''] = hash.split('?')

  return { pathname, searchParams: new URLSearchParams(search) }
}

export default function App() {
  const [route, setRoute] = useState(readCurrentRoute)
  const [session, setSession] = useState(null)
  const [adminAccess, setAdminAccess] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(isSupabaseConfigured)
  const [, setContentVersion] = useState(0)

  useEffect(() => {
    function handleHashChange() {
      setRoute(readCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    function refreshPages() {
      setContentVersion((current) => current + 1)
    }

    window.addEventListener('edu-content-updated', refreshPages)
    if (isSupabaseConfigured) {
      void loadSharedContent('programs')
      void loadSharedContent('lessons')
      void loadSharedContent('notices')
    }

    return () => window.removeEventListener('edu-content-updated', refreshPages)
  }, [])

  useEffect(() => {
    if (!supabase) return undefined

    let active = true

    async function updateSession(nextSession) {
      if (!active) return
      setSession(nextSession)
      setCheckingAccess(true)
      const allowed = await checkAdminAccess(nextSession?.user)
      if (!active) return
      setAdminAccess(allowed)
      setCheckingAccess(false)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // 권한 조회는 인증 상태 처리 직후 별도 순서에서 실행합니다.
      window.setTimeout(() => void updateSession(nextSession), 0)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  let page

  if (route.pathname === '/') {
    page = <HomePage />
  } else if (route.pathname === '/categories') {
    page = <CategoriesPage />
  } else if (route.pathname === '/programs') {
    page = <ProgramsPage
      selectedCategory={route.searchParams.get('category') || 'all'}
      selectedDuration={route.searchParams.get('duration') || 'all'}
      selectedLevel={route.searchParams.get('level') || 'all'}
      selectedPage={route.searchParams.get('page') || '1'}
      selectedSearch={route.searchParams.get('search') || ''}
      selectedSort={route.searchParams.get('sort') || 'recommended'}
    />
  } else if (route.pathname.startsWith('/programs/')) {
    page = <ProgramDetailPage programId={route.pathname.split('/')[2]} />
  } else if (route.pathname === '/lessons') {
    page = <LessonsPage
      selectedCategory={route.searchParams.get('category') || 'all'}
      selectedCollection={route.searchParams.get('collection') || 'all'}
      selectedDuration={route.searchParams.get('duration') || 'all'}
      selectedLevel={route.searchParams.get('level') || 'all'}
      selectedPage={route.searchParams.get('page') || '1'}
      selectedSearch={route.searchParams.get('search') || ''}
      selectedSort={route.searchParams.get('sort') || 'recommended'}
    />
  } else if (route.pathname.startsWith('/lessons/')) {
    page = <LessonDetailPage key={route.pathname} lessonId={route.pathname.split('/')[2]} />
  } else if (route.pathname === '/classroom') {
    page = <MyClassroomPage />
  } else if (route.pathname.startsWith('/classroom/')) {
    const [, , programId, sessionId] = route.pathname.split('/')
    page = <CourseClassroomPage key={route.pathname} programId={programId} sessionId={sessionId} />
  } else if (route.pathname === '/notice') {
    page = <NoticesPage />
  } else if (route.pathname.startsWith('/notice/')) {
    page = <NoticeDetailPage noticeId={route.pathname.split('/')[2]} />
  } else if (route.pathname === '/application') {
    page = <ApplicationPage />
  } else if (route.pathname === '/admin') {
    if (!isSupabaseConfigured) {
      page = <AdminPage />
    } else if (checkingAccess) {
      page = <section className="content-page page-shell"><p role="status">관리자 권한을 확인하고 있습니다...</p></section>
    } else if (!session || !adminAccess) {
      page = <AdminLoginPage denied={Boolean(session && !adminAccess)} />
    } else {
      page = <AdminPage session={session} onLogout={() => supabase.auth.signOut()} />
    }
  } else if (route.pathname === '/admin/login' && isSupabaseConfigured) {
    page = <AdminLoginPage denied={Boolean(session && !adminAccess)} />
  } else {
    page = <NotFoundPage />
  }

  return (
    <>
      <Header currentPath={route.pathname} />
      <main>{page}</main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <div>
            <strong>EDU</strong>
            <span>AI와 함께 배우는 실전 웹개발 교육</span>
          </div>
          <div className="footer-links"><span>한 번에 한 단계씩, 직접 만들고 확인합니다.</span><a href="#/admin">{isSupabaseConfigured ? '관리자 로그인' : '관리자 체험'}</a></div>
        </div>
      </footer>
    </>
  )
}

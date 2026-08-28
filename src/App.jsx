import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header.jsx'

const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL?.trim()
  && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim(),
)

const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'))
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'))
const ApplicationPage = lazy(() => import('./pages/ApplicationPage.jsx'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const CourseClassroomPage = lazy(() => import('./pages/CourseClassroomPage.jsx'))
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const LessonDetailPage = lazy(() => import('./pages/LessonDetailPage.jsx'))
const LearningRecommendationPage = lazy(() => import('./pages/LearningRecommendationPage.jsx'))
const LessonsPage = lazy(() => import('./pages/LessonsPage.jsx'))
const MyClassroomPage = lazy(() => import('./pages/MyClassroomPage.jsx'))
const NoticeDetailPage = lazy(() => import('./pages/NoticeDetailPage.jsx'))
const NoticesPage = lazy(() => import('./pages/NoticesPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage.jsx'))
const ProgramsPage = lazy(() => import('./pages/ProgramsPage.jsx'))
const UserAuthPage = lazy(() => import('./pages/UserAuthPage.jsx'))
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage.jsx'))
const PaymentFailPage = lazy(() => import('./pages/PaymentFailPage.jsx'))

function readCurrentRoute() {
  const browserSearch = new URLSearchParams(window.location.search)
  if (browserSearch.get('paymentResult') === 'success') return { pathname: '/payment/success', searchParams: browserSearch }
  if (browserSearch.get('paymentResult') === 'fail') return { pathname: '/payment/fail', searchParams: browserSearch }
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
  const [supabaseClient, setSupabaseClient] = useState(null)
  const [, setContentVersion] = useState(0)

  useEffect(() => {
    function handleHashChange() {
      setRoute(readCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.requestAnimationFrame(() => document.getElementById('main-content')?.focus())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!session?.user?.id || !isSupabaseConfigured) return
    void import('./data/userProgress.js').then(({ migrateLocalProgress }) => migrateLocalProgress(session.user.id))
      .then((result) => {
        if (result.migrated) window.dispatchEvent(new CustomEvent('edu-user-progress-updated'))
      })
      .catch((error) => console.error('기존 브라우저 진도를 계정으로 옮기지 못했습니다.', error))
  }, [session?.user?.id])

  useEffect(() => {
    function refreshPages() {
      setContentVersion((current) => current + 1)
    }

    window.addEventListener('edu-content-updated', refreshPages)
    if (isSupabaseConfigured) {
      void import('./data/contentStorage.js').then(({ loadSharedContent }) => Promise.all([
        loadSharedContent('programs'),
        loadSharedContent('lessons'),
        loadSharedContent('notices'),
      ])).catch((error) => console.error('공동 콘텐츠를 불러오지 못했습니다.', error))
    }

    return () => window.removeEventListener('edu-content-updated', refreshPages)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined

    let active = true
    let subscription

    void import('./lib/supabase.js').then(({ checkAdminAccess, supabase }) => {
      if (!active || !supabase) return
      setSupabaseClient(supabase)

      async function updateSession(nextSession) {
        if (!active) return
        setSession(nextSession)
        setCheckingAccess(true)
        const allowed = await checkAdminAccess(nextSession?.user)
        if (!active) return
        setAdminAccess(allowed)
        setCheckingAccess(false)
      }

      const authListener = supabase.auth.onAuthStateChange((_event, nextSession) => {
        // 권한 조회는 인증 상태 처리 직후 별도 순서에서 실행합니다.
        window.setTimeout(() => void updateSession(nextSession), 0)
      })
      subscription = authListener.data.subscription
    }).catch((error) => {
      if (!active) return
      console.error('관리자 인증 연결을 시작하지 못했습니다.', error)
      setCheckingAccess(false)
    })

    return () => {
      active = false
      subscription?.unsubscribe()
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
      page = <ProgramDetailPage programId={route.pathname.split('/')[2]} session={session} />
  } else if (route.pathname.startsWith('/checkout/')) {
    page = <CheckoutPage programId={route.pathname.split('/')[2]} session={session} />
  } else if (route.pathname === '/payment/success') {
    page = <PaymentSuccessPage searchParams={route.searchParams} session={session} />
  } else if (route.pathname === '/payment/fail') {
    page = <PaymentFailPage searchParams={route.searchParams} />
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
  } else if (route.pathname === '/recommend') {
    page = <LearningRecommendationPage />
  } else if (route.pathname === '/classroom') {
    page = isSupabaseConfigured && checkingAccess
      ? <section className="content-page page-shell"><p role="status">로그인 상태와 학습 기록을 확인하고 있습니다...</p></section>
      : <MyClassroomPage session={session} supabaseConfigured={isSupabaseConfigured} />
  } else if (route.pathname.startsWith('/classroom/')) {
    const [, , programId, sessionId] = route.pathname.split('/')
    page = isSupabaseConfigured && checkingAccess
      ? <section className="content-page page-shell"><p role="status">로그인 상태와 학습 기록을 확인하고 있습니다...</p></section>
      : <CourseClassroomPage key={route.pathname} programId={programId} session={session} sessionId={sessionId} />
  } else if (route.pathname === '/login' || route.pathname === '/signup') {
    const nextPath = route.searchParams.get('next')?.startsWith('/') ? route.searchParams.get('next') : '/classroom'
    page = <UserAuthPage mode={route.pathname === '/signup' ? 'signup' : 'login'} nextPath={nextPath} session={session} />
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
      page = <AdminPage session={session} onLogout={() => supabaseClient?.auth.signOut()} />
    }
  } else if (route.pathname === '/admin/login' && isSupabaseConfigured) {
    page = <AdminLoginPage denied={Boolean(session && !adminAccess)} />
  } else {
    page = <NotFoundPage />
  }

  return (
    <>
      <Header currentPath={route.pathname} onLogout={() => supabaseClient?.auth.signOut()} session={session} supabaseConfigured={isSupabaseConfigured} />
      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<section className="content-page page-shell"><p role="status">화면을 불러오고 있습니다...</p></section>}>
          {page}
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <div>
            <img className="footer-brand-logo" src={`${import.meta.env.BASE_URL}images/cursamanworks-logo.png`} alt="cursamanworks" />
            <span>AI와 함께 배우는 실전 웹개발 교육</span>
          </div>
          <div className="footer-links"><span>한 번에 한 단계씩, 직접 만들고 확인합니다.</span><a href="#/admin">{isSupabaseConfigured ? '관리자 로그인' : '관리자 체험'}</a></div>
        </div>
      </footer>
    </>
  )
}

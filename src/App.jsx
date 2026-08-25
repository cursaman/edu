import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import InformationPage from './pages/InformationPage.jsx'
import ProgramDetailPage from './pages/ProgramDetailPage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'

function readCurrentRoute() {
  const legacyRoutes = {
    home: '/',
    categories: '/categories',
    programs: '/programs',
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

  useEffect(() => {
    function handleHashChange() {
      setRoute(readCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  let page

  if (route.pathname === '/categories') {
    page = <CategoriesPage />
  } else if (route.pathname === '/programs') {
    page = <ProgramsPage selectedCategory={route.searchParams.get('category') || 'all'} />
  } else if (route.pathname.startsWith('/programs/')) {
    page = <ProgramDetailPage programId={route.pathname.split('/')[2]} />
  } else if (route.pathname === '/notice' || route.pathname === '/application') {
    page = <InformationPage kind={route.pathname.slice(1)} />
  } else {
    page = <HomePage />
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
          <span>한 번에 한 단계씩, 직접 만들고 확인합니다.</span>
        </div>
      </footer>
    </>
  )
}

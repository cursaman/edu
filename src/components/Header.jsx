import { useEffect, useState } from 'react'

const navigationItems = [
  { label: '홈', href: '#/', path: '/' },
  { label: '교육 분야', href: '#/categories', path: '/categories' },
  { label: '교육 프로그램', href: '#/programs', path: '/programs' },
  { label: '교육자료', href: '#/lessons', path: '/lessons' },
  { label: '내 강의실', href: '#/classroom', path: '/classroom' },
  { label: '공지사항', href: '#/notice', path: '/notice' },
  { label: '수강 안내', href: '#/application', path: '/application' },
]

export default function Header({ currentPath, onLogout, session, supabaseConfigured }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function closeMenu(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeMenu)
    return () => document.removeEventListener('keydown', closeMenu)
  }, [])

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        본문 바로가기
      </a>
      <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href="#/" aria-label="cursamanworks EDU 웹개발 교육 플랫폼 홈">
          <img className="brand-logo" src={`${import.meta.env.BASE_URL}images/cursamanworks-logo.png`} alt="cursamanworks" />
        </a>

        <button
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          {menuOpen ? '닫기 ×' : '메뉴 ☰'}
        </button>

        <nav className={`main-navigation${menuOpen ? ' main-navigation-open' : ''}`} id="main-navigation" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <a
              aria-current={currentPath === item.path || (item.path !== '/' && currentPath.startsWith(`${item.path}/`)) ? 'page' : undefined}
              className={item.label === '수강 안내' ? 'nav-link nav-link-accent' : 'nav-link'}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {supabaseConfigured && (session?.user
            ? <button className="nav-account-button" onClick={() => { setMenuOpen(false); onLogout?.() }} type="button">로그아웃</button>
            : <a aria-current={currentPath === '/login' || currentPath === '/signup' ? 'page' : undefined} className="nav-account-link" href="#/login" onClick={() => setMenuOpen(false)}>로그인</a>)}
        </nav>
      </div>
      </header>
    </>
  )
}

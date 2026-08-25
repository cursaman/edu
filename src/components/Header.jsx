const navigationItems = [
  { label: '홈', href: '#/', path: '/' },
  { label: '교육 분야', href: '#/categories', path: '/categories' },
  { label: '교육 프로그램', href: '#/programs', path: '/programs' },
  { label: '교육자료', href: '#/lessons', path: '/lessons' },
  { label: '공지사항', href: '#/notice', path: '/notice' },
  { label: '수강 신청', href: '#/application', path: '/application' },
]

export default function Header({ currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href="#/" aria-label="EDU 웹개발 교육 플랫폼 홈">
          <span className="brand-mark" aria-hidden="true">
            E
          </span>
          <span className="brand-name">EDU</span>
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
              className={item.label === '수강 신청' ? 'nav-link nav-link-accent' : 'nav-link'}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
import { useState } from 'react'

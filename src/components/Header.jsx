const navigationItems = [
  { label: '홈', href: '#/', path: '/' },
  { label: '교육 분야', href: '#/categories', path: '/categories' },
  { label: '교육 프로그램', href: '#/programs', path: '/programs' },
  { label: '교육자료', href: '#/lessons', path: '/lessons' },
  { label: '공지사항', href: '#/notice', path: '/notice' },
  { label: '수강 신청', href: '#/application', path: '/application' },
]

export default function Header({ currentPath }) {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href="#/" aria-label="EDU 웹개발 교육 플랫폼 홈">
          <span className="brand-mark" aria-hidden="true">
            E
          </span>
          <span className="brand-name">EDU</span>
        </a>

        <nav className="main-navigation" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <a
              aria-current={currentPath === item.path || (item.path !== '/' && currentPath.startsWith(`${item.path}/`)) ? 'page' : undefined}
              className={item.label === '수강 신청' ? 'nav-link nav-link-accent' : 'nav-link'}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

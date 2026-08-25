const navigationItems = [
  { label: '홈', href: '#home' },
  { label: '교육 분야', href: '#categories' },
  { label: '교육 프로그램', href: '#programs' },
  { label: '공지사항', href: '#notice' },
  { label: '수강 신청', href: '#application' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand" href="#home" aria-label="EDU 웹개발 교육 플랫폼 홈">
          <span className="brand-mark" aria-hidden="true">
            E
          </span>
          <span className="brand-name">EDU</span>
        </a>

        <nav className="main-navigation" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <a
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

const CHUNK_RECOVERY_KEY = 'edu-chunk-recovery-attempted'

function isStaleChunkError(error) {
  return /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk .* failed/i.test(String(error?.message || ''))
}

function reloadWithoutCachedIndex() {
  const url = new URL(window.location.href)
  url.searchParams.set('edu-reload', Date.now().toString())
  window.location.replace(url.toString())
}

class ScreenErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInformation) {
    console.error('EDU 화면 표시 오류:', error, errorInformation)
    if (!isStaleChunkError(error)) return
    try {
      if (window.sessionStorage.getItem(CHUNK_RECOVERY_KEY)) return
      window.sessionStorage.setItem(CHUNK_RECOVERY_KEY, new Date().toISOString())
      reloadWithoutCachedIndex()
    } catch {
      // 브라우저 저장소를 사용할 수 없어도 아래 수동 복구 버튼은 계속 제공합니다.
    }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="startup-error page-shell" role="alert">
          <span className="section-eyebrow">SCREEN RECOVERY</span>
          <h1>화면을 불러오는 중 문제가 발생했습니다.</h1>
          <p>새 배포 파일을 다시 확인해 주세요. 저장된 학습 진도는 삭제되지 않습니다.</p>
          <p className="startup-error-detail">오류 내용: {this.state.error.message}</p>
          <button className="button button-primary" onClick={reloadWithoutCachedIndex} type="button">
            최신 화면 다시 불러오기
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('EDU 화면을 표시할 root 영역을 찾지 못했습니다.')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ScreenErrorBoundary>
      <App />
    </ScreenErrorBoundary>
  </React.StrictMode>,
)

// 새 화면이 안정적으로 열린 뒤 다음 배포에서도 자동 복구를 사용할 수 있게 초기화합니다.
window.setTimeout(() => {
  try { window.sessionStorage.removeItem(CHUNK_RECOVERY_KEY) } catch { /* 저장소 사용 불가 */ }
}, 8000)

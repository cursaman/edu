import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

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
  }

  render() {
    if (this.state.error) {
      return (
        <main className="startup-error page-shell" role="alert">
          <span className="section-eyebrow">SCREEN RECOVERY</span>
          <h1>화면을 불러오는 중 문제가 발생했습니다.</h1>
          <p>브라우저를 새로고침하거나 개발 서버를 다시 실행해 주세요.</p>
          <p className="startup-error-detail">오류 내용: {this.state.error.message}</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>
            화면 다시 불러오기
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

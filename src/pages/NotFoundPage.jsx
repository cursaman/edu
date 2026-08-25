export default function NotFoundPage() {
  return (
    <section className="content-page page-shell not-found" aria-labelledby="not-found-title">
      <span className="not-found-code">404</span>
      <span className="section-eyebrow">PAGE NOT FOUND</span>
      <h1 id="not-found-title">페이지를 찾을 수 없습니다</h1>
      <p>주소가 잘못되었거나 화면이 이동되었을 수 있습니다. 아래 버튼으로 홈페이지에 돌아가세요.</p>
      <a className="button button-primary" href="#/">홈으로 돌아가기</a>
    </section>
  )
}

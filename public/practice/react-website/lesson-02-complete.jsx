function Header() { return <header><h1>EDU</h1><nav aria-label="주요 메뉴"><a href="#programs">교육 프로그램</a></nav></header> }
function MainContent() { return <main><h2>React를 시작합니다</h2><p>화면을 작은 부품으로 나눕니다.</p></main> }
export default function App() { return <><Header /><MainContent /></> }

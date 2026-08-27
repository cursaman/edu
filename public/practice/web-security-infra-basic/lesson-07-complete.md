# 7회차 완성 — 안전한 화면 출력

```jsx
// React는 문자열을 기본적으로 글자로 처리합니다.
<p>{lesson.description}</p>

// 검증되지 않은 HTML 직접 삽입은 사용하지 않습니다.
// dangerouslySetInnerHTML={{ __html: lesson.description }}
```

링크는 허용한 `https:` 주소인지 확인하고 새 창에는 `rel="noopener noreferrer"`를 사용합니다. 입력 검증만으로 XSS 방어가 끝난다고 보지 않습니다.

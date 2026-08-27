# 15회차 완성 — 학습 이벤트 설계

| 이벤트 | 최소 속성 |
|---|---|
| `lesson_view` | lesson_id, category |
| `practice_start` | lesson_id |
| `practice_complete` | lesson_id, elapsed_group |
| `next_lesson_click` | from_id, to_id |
| `search_no_result` | category, query_length_group |

이름·연락처·검색 원문·전체 URL·비밀번호는 이벤트에 넣지 않습니다.

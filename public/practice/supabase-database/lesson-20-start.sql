-- 교육자료는 누구나 읽고 로그인 사용자만 등록하도록 RLS 정책을 작성하세요.
alter table public.practice_lessons enable row level security;

alter table public.practice_lessons enable row level security;

drop policy if exists "practice lessons public read" on public.practice_lessons;
create policy "practice lessons public read"
on public.practice_lessons for select
to anon, authenticated
using (is_published = true);

drop policy if exists "practice lessons authenticated insert" on public.practice_lessons;
create policy "practice lessons authenticated insert"
on public.practice_lessons for insert
to authenticated
with check ((select auth.uid()) is not null);

-- 수업 후 SQL Editor에서 비로그인 조회와 로그인 등록을 각각 시험합니다.

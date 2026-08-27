drop policy if exists "practice lessons authenticated insert" on public.practice_lessons;
drop policy if exists "practice lessons admin insert" on public.practice_lessons;
create policy "practice lessons admin insert"
on public.practice_lessons for insert
to authenticated
with check ((select public.practice_is_admin()));

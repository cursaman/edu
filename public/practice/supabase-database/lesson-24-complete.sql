drop policy if exists "practice lessons admin update" on public.practice_lessons;
create policy "practice lessons admin update"
on public.practice_lessons for update
to authenticated
using ((select public.practice_is_admin()))
with check ((select public.practice_is_admin()));

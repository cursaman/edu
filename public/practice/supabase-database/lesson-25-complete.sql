drop policy if exists "practice lessons admin delete" on public.practice_lessons;
create policy "practice lessons admin delete"
on public.practice_lessons for delete
to authenticated
using ((select public.practice_is_admin()));

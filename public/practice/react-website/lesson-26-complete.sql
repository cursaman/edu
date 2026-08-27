alter table public.edu_programs enable row level security;
create policy "public read programs" on public.edu_programs for select using (true);
create policy "admin insert programs" on public.edu_programs for insert to authenticated with check (public.is_admin());
create policy "admin update programs" on public.edu_programs for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete programs" on public.edu_programs for delete to authenticated using (public.is_admin());

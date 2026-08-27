create table if not exists public.practice_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 50),
  created_at timestamptz not null default now()
);

alter table public.practice_profiles enable row level security;
drop policy if exists "practice profile owner read" on public.practice_profiles;
create policy "practice profile owner read"
on public.practice_profiles for select
to authenticated
using ((select auth.uid()) = user_id);

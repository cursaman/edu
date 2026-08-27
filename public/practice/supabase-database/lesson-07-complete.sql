drop table if exists public.practice_programs cascade;
create table public.practice_programs (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  created_at timestamptz not null default now()
);

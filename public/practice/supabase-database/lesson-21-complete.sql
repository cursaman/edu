create table if not exists public.practice_admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.practice_admin_profiles enable row level security;
-- 관리자 지정은 Dashboard SQL Editor에서 운영자가 직접 수행합니다.

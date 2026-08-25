-- Supabase 대시보드 → SQL Editor에서 이 파일 전체를 먼저 실행합니다.
-- 로그인 계정 생성과 최초 관리자 등록은 대시보드 운영자가 직접 진행합니다.

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.edu_lessons (
  id text primary key,
  title text not null,
  category_id text not null,
  category text not null,
  level text not null,
  duration text not null,
  description text not null,
  explanation text not null,
  goals jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  code_language text not null default 'JavaScript',
  code text not null default '',
  prompt text not null default '',
  checklist jsonb not null default '[]'::jsonb,
  next_lesson_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.edu_notices (
  id text primary key,
  title text not null,
  display_date text not null,
  summary text not null,
  content jsonb not null default '[]'::jsonb,
  checklist jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_edu_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_edu_lessons_updated_at on public.edu_lessons;
create trigger set_edu_lessons_updated_at
before update on public.edu_lessons
for each row execute function public.set_edu_updated_at();

drop trigger if exists set_edu_notices_updated_at on public.edu_notices;
create trigger set_edu_notices_updated_at
before update on public.edu_notices
for each row execute function public.set_edu_updated_at();

-- security definer 함수는 관리자 여부만 확인하며 검색 경로를 고정합니다.
create or replace function public.is_edu_admin()
returns boolean
language sql
security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1 from public.admin_profiles
    where user_id = auth.uid() and is_admin = true
  );
$$;

revoke all on function public.is_edu_admin() from public;
grant execute on function public.is_edu_admin() to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.edu_lessons enable row level security;
alter table public.edu_notices enable row level security;

drop policy if exists "edu_admin_read_own_profile" on public.admin_profiles;
create policy "edu_admin_read_own_profile"
on public.admin_profiles for select to authenticated
using (auth.uid() = user_id);

-- 관리자 권한 테이블에는 INSERT·UPDATE·DELETE 정책을 만들지 않습니다.
-- 따라서 브라우저 사용자는 자신에게 관리자 권한을 추가하거나 변경할 수 없습니다.

drop policy if exists "edu_lessons_public_read" on public.edu_lessons;
create policy "edu_lessons_public_read"
on public.edu_lessons for select to anon, authenticated using (true);

drop policy if exists "edu_lessons_admin_insert" on public.edu_lessons;
create policy "edu_lessons_admin_insert"
on public.edu_lessons for insert to authenticated
with check (public.is_edu_admin());

drop policy if exists "edu_lessons_admin_update" on public.edu_lessons;
create policy "edu_lessons_admin_update"
on public.edu_lessons for update to authenticated
using (public.is_edu_admin()) with check (public.is_edu_admin());

drop policy if exists "edu_lessons_admin_delete" on public.edu_lessons;
create policy "edu_lessons_admin_delete"
on public.edu_lessons for delete to authenticated
using (public.is_edu_admin());

drop policy if exists "edu_notices_public_read" on public.edu_notices;
create policy "edu_notices_public_read"
on public.edu_notices for select to anon, authenticated using (true);

drop policy if exists "edu_notices_admin_insert" on public.edu_notices;
create policy "edu_notices_admin_insert"
on public.edu_notices for insert to authenticated
with check (public.is_edu_admin());

drop policy if exists "edu_notices_admin_update" on public.edu_notices;
create policy "edu_notices_admin_update"
on public.edu_notices for update to authenticated
using (public.is_edu_admin()) with check (public.is_edu_admin());

drop policy if exists "edu_notices_admin_delete" on public.edu_notices;
create policy "edu_notices_admin_delete"
on public.edu_notices for delete to authenticated
using (public.is_edu_admin());

-- Authentication → Users에서 만든 관리자 계정의 UUID를 복사한 뒤
-- 다음 예시의 UUID를 바꿔 SQL Editor에서 별도로 실행하세요.
-- insert into public.admin_profiles (user_id, is_admin)
-- values ('여기에-관리자-사용자-UUID-입력', true)
-- on conflict (user_id) do update set is_admin = excluded.is_admin;

-- EDU 웹개발 교육 플랫폼 최신 데이터베이스 구조 (2026-08-26)
-- Supabase 대시보드 → SQL Editor에서 이 파일 전체를 먼저 실행합니다.
-- 로그인 계정 생성과 최초 관리자 등록은 대시보드 운영자가 직접 진행합니다.

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- 일반 학습자는 이메일 인증 정보 외에 불필요한 개인정보를 저장하지 않습니다.
create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  program_id text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'active', 'completed', 'cancelled')),
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by uuid references auth.users (id) on delete set null,
  expires_at timestamptz,
  admin_note text not null default '',
  last_session_id text,
  enrolled_at timestamptz not null default now(),
  last_studied_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (user_id, program_id)
);

-- 8일차 스키마가 이미 적용된 프로젝트도 데이터를 지우지 않고 확장합니다.
alter table public.course_enrollments add column if not exists status text;
alter table public.course_enrollments add column if not exists requested_at timestamptz not null default now();
alter table public.course_enrollments add column if not exists approved_at timestamptz;
alter table public.course_enrollments add column if not exists approved_by uuid references auth.users (id) on delete set null;
alter table public.course_enrollments add column if not exists expires_at timestamptz;
alter table public.course_enrollments add column if not exists admin_note text not null default '';
-- 이전 버전에서 학습 시작과 동시에 만들어진 행은 기존 이용권을 보존합니다.
update public.course_enrollments set status = 'active' where status is null;
alter table public.course_enrollments alter column status set default 'pending';
alter table public.course_enrollments alter column status set not null;
do $$ begin
  alter table public.course_enrollments add constraint course_enrollments_status_check
    check (status in ('pending', 'approved', 'rejected', 'active', 'completed', 'cancelled'));
exception when duplicate_object then null;
end $$;

create table if not exists public.course_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  program_id text not null,
  session_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, program_id, session_id)
);

create index if not exists course_enrollments_user_recent_idx on public.course_enrollments (user_id, last_studied_at desc);
create index if not exists course_progress_user_program_idx on public.course_progress (user_id, program_id);

create table if not exists public.edu_programs (
  id text primary key,
  title text not null,
  category_id text not null,
  category text not null,
  level text not null,
  duration text not null,
  description text not null,
  introduction text not null,
  audience jsonb not null default '[]'::jsonb,
  goals jsonb not null default '[]'::jsonb,
  curriculum jsonb not null default '[]'::jsonb,
  preparations jsonb not null default '[]'::jsonb,
  related_lesson_ids jsonb not null default '[]'::jsonb,
  status text not null default '모집 예정',
  color text not null default 'violet',
  display_number text not null default '01',
  image_url text not null default '',
  image_alt text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.edu_programs add column if not exists image_url text not null default '';
alter table public.edu_programs add column if not exists image_alt text not null default '';

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
  related_program_id text,
  is_featured boolean not null default false,
  is_popular boolean not null default false,
  published_at date not null default current_date,
  slide_url text not null default '',
  pdf_url text not null default '',
  material_version text not null default '1.0',
  slide_pages integer not null default 8,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.edu_lessons add column if not exists related_program_id text;
alter table public.edu_lessons add column if not exists is_featured boolean not null default false;
alter table public.edu_lessons add column if not exists is_popular boolean not null default false;
alter table public.edu_lessons add column if not exists published_at date not null default current_date;
alter table public.edu_lessons add column if not exists slide_url text not null default '';
alter table public.edu_lessons add column if not exists pdf_url text not null default '';
alter table public.edu_lessons add column if not exists material_version text not null default '1.0';
alter table public.edu_lessons add column if not exists slide_pages integer not null default 8;

-- 교육자료 목록과 홈 추천 영역에서 자주 사용하는 조회를 빠르게 합니다.
create index if not exists edu_programs_category_id_idx on public.edu_programs (category_id);
create index if not exists edu_lessons_category_id_idx on public.edu_lessons (category_id);
create index if not exists edu_lessons_published_at_idx on public.edu_lessons (published_at desc);
create index if not exists edu_lessons_featured_idx on public.edu_lessons (is_featured) where is_featured = true;
create index if not exists edu_lessons_popular_idx on public.edu_lessons (is_popular) where is_popular = true;

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

drop trigger if exists set_edu_programs_updated_at on public.edu_programs;
create trigger set_edu_programs_updated_at
before update on public.edu_programs
for each row execute function public.set_edu_updated_at();

drop trigger if exists set_edu_lessons_updated_at on public.edu_lessons;
create trigger set_edu_lessons_updated_at
before update on public.edu_lessons
for each row execute function public.set_edu_updated_at();

drop trigger if exists set_edu_notices_updated_at on public.edu_notices;
create trigger set_edu_notices_updated_at
before update on public.edu_notices
for each row execute function public.set_edu_updated_at();

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;
create trigger set_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.set_edu_updated_at();

drop trigger if exists set_course_progress_updated_at on public.course_progress;
create trigger set_course_progress_updated_at
before update on public.course_progress
for each row execute function public.set_edu_updated_at();

-- 새 Auth 사용자의 최소 프로필 행을 자동 생성합니다.
create or replace function public.handle_new_edu_user()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.user_profiles (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_edu_profile on auth.users;
create trigger on_auth_user_created_edu_profile
after insert on auth.users
for each row execute function public.handle_new_edu_user();

-- 스키마 적용 전에 이미 존재하던 관리자·테스트 사용자도 최소 프로필을 만듭니다.
insert into public.user_profiles (user_id)
select id from auth.users
on conflict (user_id) do nothing;

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

-- 학습자는 상태를 바꾸지 않고 자신의 마지막 학습 위치만 기록합니다.
create or replace function public.record_edu_course_session(p_program_id text, p_session_id text)
returns void language plpgsql security definer set search_path = pg_catalog, public as $$
begin
  update public.course_enrollments
  set last_session_id = p_session_id, last_studied_at = now(),
      status = case when status = 'approved' then 'active' else status end
  where user_id = auth.uid() and program_id = p_program_id
    and status in ('approved', 'active', 'completed');
end;
$$;
revoke all on function public.record_edu_course_session(text, text) from public;
grant execute on function public.record_edu_course_session(text, text) to authenticated;

-- 관리자 화면에 필요한 이메일만 반환합니다. 일반 사용자는 실행할 수 없습니다.
create or replace function public.get_edu_enrollment_applications()
returns table (user_id uuid, user_email text, program_id text, status text, requested_at timestamptz, enrolled_at timestamptz, approved_at timestamptz, approved_by uuid, last_studied_at timestamptz, completed_at timestamptz)
language plpgsql security definer set search_path = pg_catalog, public, auth as $$
begin
  if not public.is_edu_admin() then raise exception '관리자 권한이 필요합니다.'; end if;
  return query select e.user_id, u.email::text, e.program_id, e.status, e.requested_at,
    e.enrolled_at, e.approved_at, e.approved_by, e.last_studied_at, e.completed_at
  from public.course_enrollments e join auth.users u on u.id = e.user_id
  order by e.requested_at desc;
end;
$$;
revoke all on function public.get_edu_enrollment_applications() from public;
grant execute on function public.get_edu_enrollment_applications() to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.user_profiles enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.course_progress enable row level security;
alter table public.edu_programs enable row level security;
alter table public.edu_lessons enable row level security;
alter table public.edu_notices enable row level security;

drop policy if exists "edu_admin_read_own_profile" on public.admin_profiles;
create policy "edu_admin_read_own_profile"
on public.admin_profiles for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "user_profiles_read_own" on public.user_profiles;
create policy "user_profiles_read_own" on public.user_profiles
for select to authenticated using (auth.uid() = user_id);
drop policy if exists "user_profiles_insert_own" on public.user_profiles;
create policy "user_profiles_insert_own" on public.user_profiles
for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "user_profiles_update_own" on public.user_profiles;
create policy "user_profiles_update_own" on public.user_profiles
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "user_profiles_delete_own" on public.user_profiles;
create policy "user_profiles_delete_own" on public.user_profiles
for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "course_enrollments_read_own" on public.course_enrollments;
create policy "course_enrollments_read_own" on public.course_enrollments
for select to authenticated using (auth.uid() = user_id);
drop policy if exists "course_enrollments_insert_own" on public.course_enrollments;
create policy "course_enrollments_insert_own" on public.course_enrollments
for insert to authenticated with check (
  auth.uid() = user_id and status = 'pending'
  and approved_at is null and approved_by is null and completed_at is null
);
drop policy if exists "course_enrollments_update_own" on public.course_enrollments;
drop policy if exists "course_enrollments_delete_own" on public.course_enrollments;
create policy "course_enrollments_delete_own" on public.course_enrollments
for delete to authenticated using (auth.uid() = user_id and status = 'pending');
drop policy if exists "course_enrollments_admin_read_all" on public.course_enrollments;
create policy "course_enrollments_admin_read_all" on public.course_enrollments
for select to authenticated using (public.is_edu_admin());
drop policy if exists "course_enrollments_admin_update_all" on public.course_enrollments;
create policy "course_enrollments_admin_update_all" on public.course_enrollments
for update to authenticated using (public.is_edu_admin()) with check (public.is_edu_admin());

drop policy if exists "course_progress_read_own" on public.course_progress;
create policy "course_progress_read_own" on public.course_progress
for select to authenticated using (auth.uid() = user_id);
drop policy if exists "course_progress_insert_own" on public.course_progress;
create policy "course_progress_insert_own" on public.course_progress
for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "course_progress_update_own" on public.course_progress;
create policy "course_progress_update_own" on public.course_progress
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "course_progress_delete_own" on public.course_progress;
create policy "course_progress_delete_own" on public.course_progress
for delete to authenticated using (auth.uid() = user_id);

-- 관리자 권한 테이블에는 INSERT·UPDATE·DELETE 정책을 만들지 않습니다.
-- 따라서 브라우저 사용자는 자신에게 관리자 권한을 추가하거나 변경할 수 없습니다.

drop policy if exists "edu_programs_public_read" on public.edu_programs;
create policy "edu_programs_public_read"
on public.edu_programs for select to anon, authenticated using (true);

drop policy if exists "edu_programs_admin_insert" on public.edu_programs;
create policy "edu_programs_admin_insert"
on public.edu_programs for insert to authenticated
with check (public.is_edu_admin());

drop policy if exists "edu_programs_admin_update" on public.edu_programs;
create policy "edu_programs_admin_update"
on public.edu_programs for update to authenticated
using (public.is_edu_admin()) with check (public.is_edu_admin());

drop policy if exists "edu_programs_admin_delete" on public.edu_programs;
create policy "edu_programs_admin_delete"
on public.edu_programs for delete to authenticated
using (public.is_edu_admin());

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


create table if not exists public.practice_audit_logs (
  id bigint generated always as identity primary key,
  user_id uuid,
  action text not null check (action in ('INSERT','UPDATE','DELETE')),
  lesson_id bigint,
  changed_at timestamptz not null default now()
);

alter table public.practice_audit_logs enable row level security;
drop policy if exists "practice audit admin read" on public.practice_audit_logs;
create policy "practice audit admin read" on public.practice_audit_logs
for select to authenticated using ((select public.practice_is_admin()));

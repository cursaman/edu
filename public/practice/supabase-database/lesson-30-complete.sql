select tablename, rowsecurity
from pg_tables
where schemaname = 'public' and tablename like 'practice_%'
order by tablename;

select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename like 'practice_%'
order by tablename, policyname;

select 'programs' as item, count(*) as total from public.practice_programs
union all
select 'lessons', count(*) from public.practice_lessons
union all
select 'audit_logs', count(*) from public.practice_audit_logs;

-- Supabase Dashboard의 Table Editor에서 필요한 표만 CSV로 내보내 백업합니다.

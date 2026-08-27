begin;
insert into public.practice_programs (title)
values ('Supabase 데이터베이스 입문')
on conflict (title) do nothing;

insert into public.practice_lessons (title, category, duration_minutes, is_published, program_id)
select 'RLS로 자료 보호하기', '데이터베이스', 50, true, id
from public.practice_programs
where title = 'Supabase 데이터베이스 입문'
  and not exists (
    select 1 from public.practice_lessons where title = 'RLS로 자료 보호하기'
  );
commit;

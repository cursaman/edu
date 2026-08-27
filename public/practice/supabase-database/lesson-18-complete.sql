create or replace view public.practice_published_lessons
with (security_invoker = true) as
select id, title, category, duration_minutes, program_id, created_at
from public.practice_lessons
where is_published = true;

select * from public.practice_published_lessons order by created_at desc;

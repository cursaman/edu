with new_program as (
  insert into public.practice_programs (title) values ('웹 기초 30회차') returning id
)
insert into public.practice_lessons (title,category,duration_minutes,program_id)
select 'HTML 문서 구조','웹 기초',50,id from new_program
returning id,title,program_id;

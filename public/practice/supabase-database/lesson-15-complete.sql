update public.practice_lessons
set duration_minutes = 60
where id = (select min(id) from public.practice_lessons)
returning id, title, duration_minutes;

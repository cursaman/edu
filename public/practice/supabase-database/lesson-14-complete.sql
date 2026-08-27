select p.title as program_title,
       l.title as lesson_title,
       l.duration_minutes
from public.practice_programs as p
left join public.practice_lessons as l on l.program_id = p.id
order by p.title, l.id;

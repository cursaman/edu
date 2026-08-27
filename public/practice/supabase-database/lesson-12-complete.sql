select id, title, category
from public.practice_lessons
where title ilike '%React%'
order by title;

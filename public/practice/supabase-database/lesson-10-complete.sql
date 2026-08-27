select id, title, category, duration_minutes, is_published, created_at
from public.practice_lessons
order by created_at desc
limit 10;

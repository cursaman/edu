select id, title, category, duration_minutes
from public.practice_lessons
where is_published = true and duration_minutes >= 30
order by created_at desc;

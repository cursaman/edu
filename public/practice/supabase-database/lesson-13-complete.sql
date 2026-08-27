select category,
       count(*) as lesson_count,
       round(avg(duration_minutes), 1) as average_minutes
from public.practice_lessons
group by category
order by lesson_count desc, category;

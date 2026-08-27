-- 교육자료 표에 program_id 외래키를 추가하세요.
alter table public.practice_lessons add column program_id uuid;

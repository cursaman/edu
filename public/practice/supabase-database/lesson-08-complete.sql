alter table public.practice_lessons
  add column if not exists program_id uuid references public.practice_programs(id) on delete cascade;
create index if not exists practice_lessons_program_id_idx on public.practice_lessons(program_id);

alter table public.practice_lessons
  add column category text not null default '웹 기초',
  add column duration_minutes integer not null default 30 check (duration_minutes > 0),
  add column is_published boolean not null default false,
  add column created_at timestamptz not null default now();

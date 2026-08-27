drop table if exists public.practice_lessons;
create table public.practice_lessons (
  id bigint generated always as identity primary key,
  title text not null
);

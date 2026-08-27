alter table public.practice_lessons
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.practice_set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists practice_lessons_set_updated_at on public.practice_lessons;
create trigger practice_lessons_set_updated_at
before update on public.practice_lessons
for each row execute function public.practice_set_updated_at();

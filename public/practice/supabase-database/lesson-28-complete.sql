create or replace function public.practice_log_lesson_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.practice_audit_logs (user_id, action, lesson_id)
  values ((select auth.uid()), tg_op, coalesce(new.id, old.id));
  return coalesce(new, old);
end;
$$;

drop trigger if exists practice_lessons_audit on public.practice_lessons;
create trigger practice_lessons_audit
after insert or update or delete on public.practice_lessons
for each row execute function public.practice_log_lesson_change();

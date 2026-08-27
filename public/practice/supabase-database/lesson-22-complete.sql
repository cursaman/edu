create or replace function public.practice_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.practice_admin_profiles
    where user_id = (select auth.uid()) and is_admin = true
  );
$$;

revoke all on function public.practice_is_admin() from public;
grant execute on function public.practice_is_admin() to authenticated;

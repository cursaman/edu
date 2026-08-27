insert into public.practice_programs (title)
values ('React 웹사이트 30회차')
on conflict (title)
do update set title = excluded.title
returning id, title;

insert into public.practice_lessons (title, category, duration_minutes, is_published)
values ('HTML 시작','웹 기초',30,true)
returning id,title,created_at;
-- 아래 값은 check 제약조건 때문에 실패해야 정상입니다.
-- insert into public.practice_lessons (title,duration_minutes) values ('잘못된 자료',0);

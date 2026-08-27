begin;
delete from public.practice_lessons
where id = (select max(id) from public.practice_lessons)
returning id, title;
-- 연습 결과를 확인한 뒤 원래 자료를 되돌립니다.
rollback;

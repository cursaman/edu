-- 교육자료 변경 내용을 감사 테이블에 자동 기록하세요.
select * from public.practice_audit_logs order by changed_at desc;

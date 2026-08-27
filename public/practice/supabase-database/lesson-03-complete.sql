-- 프로그램 제목을 교육자료마다 반복하지 않고 program_id로 연결합니다.
select 'edu_programs' as parent_table, 'edu_lessons' as child_table, 'program_id' as relation_column;

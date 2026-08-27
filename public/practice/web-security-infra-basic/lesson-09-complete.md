# 9회차 완성 — Supabase RLS 점검

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;

select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
```

공개 테이블마다 RLS와 필요한 최소 정책을 확인합니다. 비로그인·일반 사용자·관리자 계정으로 실제 허용과 차단을 각각 시험합니다.

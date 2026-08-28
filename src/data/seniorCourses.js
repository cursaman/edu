const commonMaterials = ['실행 가능한 EDU React 프로젝트', 'Node.js 22 LTS와 npm', 'Chrome 개발자 도구', '검토 결과를 기록할 문서']

function seniorSession(courseKey, order, title, problem, badCode, improvedCode, decision, expectedResult, tests, reviewQuestions) {
  return {
    id: `${courseKey}-${String(order).padStart(2, '0')}`, week: order, order, title, duration: '90분',
    goal: `${problem} 문제를 재현하고 근거가 있는 개선안을 적용합니다.`, concept: decision,
    practice: ['문제 상황과 재현 조건을 기록합니다.', '잘못된 코드를 실행해 증상을 확인합니다.', '개선 코드를 적용하고 변경 이유를 기록합니다.', '정상·경계·실패 조건을 테스트합니다.', '리뷰 질문으로 다른 설계 가능성을 토론합니다.'],
    code: `// 개선 전\n${badCode}\n\n// 개선 후\n${improvedCode}`,
    prompt: `다음 문제를 시니어 코드 리뷰 방식으로 분석해줘. 문제: ${problem}. 재현 방법, 위험도, 최소 수정, 테스트와 롤백 방법을 구분해줘.`,
    quiz: reviewQuestions, quizAnswers: reviewQuestions.map((question) => `${question}에 대해 성능·보안·유지보수성과 운영 비용의 근거를 들어 설명합니다.`),
    result: expectedResult[0], materials: commonMaterials,
    timeline: [{ minutes: '0~15분', activity: '문제 상황과 운영 영향 분석' }, { minutes: '15~35분', activity: '개선 전 코드 재현과 원인 추적' }, { minutes: '35~65분', activity: '개선 설계와 코드 적용' }, { minutes: '65~80분', activity: '자동·수동 테스트와 실패 조건 검증' }, { minutes: '80~90분', activity: '트레이드오프 리뷰와 회고' }],
    instructorGuide: `정답 코드를 먼저 보여주지 않습니다. “${problem}”이 사용자와 운영에 주는 영향을 수치나 재현 절차로 확인한 뒤 설계 선택을 비교합니다.`,
    errors: [`문제 상황: ${problem}`, '수정 후 정상 경로만 확인하고 실패·경계 조건을 빼먹는 경우가 있습니다.', '측정 자료 없이 개선되었다고 판단하지 말고 변경 전후 결과를 함께 남깁니다.'],
    expectedResult, tests, reviewQuestions, decision,
    assignment: '동일한 원칙을 현재 프로젝트의 다른 코드 한 곳에 적용하고 변경 전후 근거를 PR 설명 형식으로 작성합니다.',
    completionCriteria: ['문제를 같은 조건에서 재현했습니다.', '개선 전후 코드와 설계 이유를 설명했습니다.', '정상·경계·실패 테스트 결과를 기록했습니다.'],
  }
}

const specs = [
  {
    program: { id: 'senior-react-refactoring', title: 'React 리팩터링 실무', categoryId: 'frontend', category: '프런트엔드', description: '복잡해진 React 화면을 측정하고 안전하게 분리·최적화·검증합니다.', introduction: '거대한 컴포넌트와 뒤섞인 상태를 실제 장애 위험 없이 단계적으로 개선하고 테스트 가능한 구조로 만듭니다.', audience: ['React 운영 코드의 변경 위험을 낮추려는 개발자', '설계 판단과 코드 리뷰 역량을 강화하려는 개발자'], goals: ['변경 전 문제를 측정합니다.', '책임과 상태 경계를 설계합니다.', '테스트로 동작을 보존하며 리팩터링합니다.'], imageFile: 'program-react.webp' },
    sessions: [
      ['거대 컴포넌트의 책임 찾기','function Page(){ /* 조회·필터·폼·모달 500줄 */ }','function Page(){ return <><Filter/><ProgramList/><EditDialog/></> }','파일 길이가 아니라 변경 이유와 상태 소유권을 기준으로 경계를 나눕니다.',['독립적으로 테스트 가능한 세 컴포넌트','기존 사용자 흐름 보존'],['기존 주요 흐름 회귀 테스트','빈 데이터와 오류 상태'],['어떤 상태를 부모가 소유해야 하는가?','분리가 오히려 탐색 비용을 높이는 지점은?']],
      ['파생 상태 불일치 제거','useEffect(()=>setFiltered(items.filter(match)),[items,query])','const filtered = useMemo(()=>items.filter(match),[items,query])','원본에서 계산 가능한 값은 별도 상태로 복제하지 않아 동기화 버그를 줄입니다.',['검색 변경 즉시 일관된 목록','불필요한 추가 렌더 제거'],['검색어 연속 변경','원본 목록 교체'],['useMemo가 필요 없는 경우는?','서버 필터로 옮길 기준은?']],
      ['비동기 요청 경쟁 조건 처리','fetch(url).then(r=>r.json()).then(setData)','const controller=new AbortController(); fetch(url,{signal:controller.signal})','늦게 도착한 이전 응답이 최신 화면을 덮지 않도록 취소 또는 요청 식별자를 둡니다.',['최신 검색 결과만 표시','화면 이탈 후 상태 변경 없음'],['느린 요청 뒤 빠른 요청','컴포넌트 언마운트'],['AbortController와 요청 ID의 차이는?','캐시 라이브러리 도입 기준은?']],
      ['렌더링 병목 측정과 최적화','const rows=items.map(expensiveTransform)','const rows=useMemo(()=>items.map(expensiveTransform),[items])','Profiler로 병목을 확인한 곳만 최적화하고 메모이제이션 비용도 고려합니다.',['대규모 목록 렌더 시간 감소','기능 결과 동일'],['1천 개 항목 프로파일링','필터 반복 조작'],['React.memo가 실패하는 이유는?','가상화가 필요한 기준은?']],
      ['오류 경계와 복구 화면','return <LazyPage/>','<ErrorBoundary fallback={<Recovery/>}><LazyPage/></ErrorBoundary>','예상하지 못한 렌더 오류를 격리하고 사용자가 새로고침·홈 이동으로 복구하게 합니다.',['전체 백지 화면 방지','오류 구간만 대체 표시'],['동적 import 실패 모의','재시도 후 정상 복구'],['어디까지 하나의 오류 경계로 묶을까?','오류 로그에 넣지 말아야 할 값은?']],
      ['리팩터링 PR과 회귀 검증','git add . && git commit -m "refactor"','npm test && npm run build && git diff --stat','작은 커밋, 검증 근거, 롤백 단위를 갖춘 PR로 구조 변경 위험을 통제합니다.',['검증 가능한 PR 설명','빌드와 핵심 흐름 통과'],['모바일 핵심 경로','이전 데이터 호환'],['리팩터링과 기능 변경을 분리하는 이유는?','롤백 기준은 무엇인가?']],
    ],
  },
  {
    program: { id: 'senior-supabase-rls', title: 'Supabase 인증·RLS 보안', categoryId: 'database', category: '데이터베이스', description: '인증과 데이터 권한을 공격자 관점에서 설계하고 검증합니다.', introduction: '화면의 버튼 숨김을 넘어 PostgreSQL RLS 정책으로 사용자·관리자·서버 권한을 분리하고 우회 접근을 시험합니다.', audience: ['Supabase 서비스를 운영하는 개발자', 'RLS 정책을 체계적으로 검증하려는 개발자'], goals: ['위협 모델을 작성합니다.', '최소 권한 RLS를 설계합니다.', '다른 사용자 접근을 자동 검증합니다.'], imageFile: 'program-database.webp' },
    sessions: [
      ['화면 제한만 믿는 권한 우회','{isAdmin && <DeleteButton/>}','create policy admin_delete on items for delete using (is_admin(auth.uid()));','권한은 신뢰 경계인 데이터베이스에서 다시 확인하고 UI는 편의 기능으로만 봅니다.',['비관리자 직접 DELETE 차단','관리자 정상 삭제'],['anon·일반·관리자 역할별 요청','REST 직접 호출'],['UI 권한과 DB 권한의 책임은?','정책 실패는 어떻게 관찰할까?']],
      ['사용자 행 격리 정책','create policy read_all on progress for select using(true);','create policy read_own on progress for select using(auth.uid()=user_id);','본인 소유 관계를 행마다 검사하고 USING과 WITH CHECK를 모두 설계합니다.',['다른 사용자 진도 0건','본인 진도만 조회'],['사용자 A로 B 자료 조회','user_id 위조 INSERT'],['WITH CHECK가 빠지면 생기는 문제는?','NULL 소유자는 어떻게 다룰까?']],
      ['관리자 권한 상승 차단','insert into admin_profiles values(auth.uid(),true);','revoke insert,update,delete on admin_profiles from authenticated;','관리자 명단 자체는 일반 사용자가 변경할 수 없도록 별도 정책과 권한을 적용합니다.',['일반 사용자 승격 실패','서버 관리 절차만 성공'],['일반 토큰 INSERT·UPDATE','관리자 등록 운영 절차'],['관리자 부여 감사 기록은 어디에 둘까?','초기 관리자는 어떻게 안전하게 만들까?']],
      ['Security Definer 함수 안전화','create function is_admin() returns bool security definer ...','create function is_admin(uid uuid) returns bool security definer set search_path=public,pg_temp ...','권한 상승 함수는 search_path 고정, 입력 명시, 실행 권한 제한으로 객체 가로채기를 막습니다.',['고정 경로 관리자 검사','불필요한 함수 실행 권한 제거'],['가짜 객체 이름 충돌','anon 함수 호출'],['함수 없이 정책을 쓸 수 있는가?','재귀 정책을 피하는 방법은?']],
      ['서비스 역할 키 노출 대응','const key=import.meta.env.VITE_SERVICE_ROLE_KEY','const key=process.env.SUPABASE_SERVICE_ROLE_KEY // server only','service role은 RLS를 우회하므로 브라우저 번들·Git·로그에 절대 포함하지 않습니다.',['브라우저 번들 비밀값 없음','서버 함수에서만 관리자 작업'],['dist 문자열 검색','Git 이력 비밀 검사'],['노출 시 즉시 해야 할 조치는?','서버 함수 입력은 왜 다시 검증해야 하나?']],
      ['RLS 회귀 테스트와 감사','수동으로 관리자 화면만 확인','for (const role of roles) await assertPolicyMatrix(role)','정책 변경 때 역할×행동×소유권 매트릭스를 자동 실행하고 거부도 성공 조건으로 기록합니다.',['권한 매트릭스 자동 결과','정책 변경 회귀 방지'],['anon·사용자A·B·관리자','SELECT·INSERT·UPDATE·DELETE'],['거부 테스트가 중요한 이유는?','운영 로그와 개인정보를 어떻게 분리할까?']],
    ],
  },
  {
    program: { id: 'senior-payment-reliability', title: '결제 시스템 안정화', categoryId: 'backend', category: '백엔드', description: '주문·승인·웹훅을 중복과 부분 실패에 견디도록 설계합니다.', introduction: '브라우저 금액을 신뢰하지 않고 서버 주문을 기준으로 승인하며 멱등성, 상태 전이, 웹훅 검증과 장애 복구를 실습합니다.', audience: ['결제 연동을 운영 수준으로 높이려는 개발자', '분산 작업의 실패와 복구를 설계하려는 개발자'], goals: ['서버 가격 검증을 적용합니다.', '중복 승인을 방지합니다.', '감사 가능한 상태 복구 절차를 만듭니다.'], imageFile: 'program-backend.webp' },
    sessions: [
      ['브라우저 금액 변조 차단','const amount=req.body.amount','const program=await loadProgram(id); const amount=effectivePrice(program);','가격과 판매 상태는 서버가 신뢰 가능한 데이터 원본에서 다시 계산합니다.',['변조 금액 무시','판매 중지·무료 과정 차단'],['0원·음수·과다 금액 전송','존재하지 않는 과정'],['가격 변경 중 주문은 어떤 값을 갖는가?','할인 규칙은 어디에서 계산할까?']],
      ['주문번호와 중복 주문 제어','const orderId=Date.now().toString()','await insertUniqueOrder({orderCode:crypto.randomUUID(),userId,programId})','충돌하기 어려운 번호와 DB 유일 제약, 활성 주문 조회를 함께 사용합니다.',['동시 요청 중 하나만 생성','추적 가능한 주문 코드'],['동시 두 요청','기존 pending·paid 주문'],['pending 주문 만료 기준은?','DB 유일 제약의 범위는?']],
      ['승인 API 멱등성','await tossConfirm(paymentKey); await grantCourse();','if(order.status==="paid") return storedResult; await confirmOnce(order);','동일 요청 반복 시 같은 결과를 돌려주고 결제·수강권이 한 번만 생성되게 합니다.',['새로고침 중복 승인 없음','수강권 한 건 유지'],['동일 승인 3회','응답 손실 뒤 재요청'],['외부 승인 성공·DB 실패는 어떻게 복구할까?','멱등 키는 무엇으로 정할까?']],
      ['상태 전이와 부분 실패 처리','orders.update({status:req.body.status})','assertTransition(order.status,"paid"); await recordEvent();','허용된 상태 전이만 서버가 수행하고 모든 변경을 이벤트로 남깁니다.',['불가능한 역전이 차단','상태 변경 감사 기록'],['paid→pending 시도','결제 저장 실패 모의'],['트랜잭션 경계 밖 외부 API는 어떻게 다룰까?','보상 작업이 필요한 상태는?']],
      ['웹훅 위조·중복 방지','await updatePayment(req.body)','verifySource(); const payment=await toss.get(paymentKey); compareOrder(payment);','알림 원문을 신뢰하지 않고 결제사 조회 결과와 서버 주문을 비교하며 이벤트 ID를 중복 제거합니다.',['위조 웹훅 무시','중복 이벤트 한 번 처리'],['서명 오류·금액 불일치','순서가 바뀐 취소 이벤트'],['웹훅 재시도 응답 전략은?','이벤트 순서를 어떻게 판단할까?']],
      ['대사·복구·운영 런북','결제 완료 화면을 보고 수동 승인','compare provider payments with orders; enqueue repair','결제사와 내부 DB를 정기 대사하고 불일치를 자동 탐지한 뒤 승인된 절차로 복구합니다.',['불일치 목록과 복구 기록','키를 숨긴 운영 로그'],['결제 성공·주문 pending','취소 후 수강권 active'],['자동 복구와 수동 승인의 경계는?','장애 지표와 경보 기준은?']],
    ],
  },
]

export const seniorPrograms = specs.map(({ program }, index) => ({ ...program, learningTrack: '시니어', level: '고급', duration: '6주 · 주 1회', status: '모집 예정', color: ['violet', 'mint', 'coral'][index], number: String(101 + index), curriculum: specs[index].sessions.map((item) => item[0]), preparations: commonMaterials, relatedLessonIds: [], regularPrice: 0, salePrice: 0, isFree: true, saleStatus: 'draft' }))

export const seniorDetailedCourses = specs.map(({ program, sessions }) => ({
  programId: program.id, title: program.title, totalWeeks: 6, outcome: `${program.title} 설계 검토서와 재현 가능한 테스트 기록`,
  sessions: sessions.map((item, index) => seniorSession(program.id, index + 1, ...item)),
}))

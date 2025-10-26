# DNS 문제 해결 가이드

## 현재 상황
- 설정 완료 후 20분 경과
- 아직 DNS 전파되지 않음

## 확인 체크리스트

### ✅ 가비아 설정 확인
1. 가비아 로그인 → 내 도메인 → jdxwork.com 클릭
2. "DNS 관리" 또는 "네임서버 설정" 클릭
3. 다음이 입력되어 있는지 확인:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. "저장" 버튼을 한 번 더 클릭 (재저장)

### ✅ Vercel 설정 확인
1. Vercel 대시보드 접속
2. jd-automation 프로젝트 선택
3. Settings → Domains 클릭
4. jdxwork.com이 추가되어 있는지 확인
5. 상태 확인:
   - ✅ "Valid Configuration" (녹색) → 전파만 대기
   - ❌ "Invalid" 또는 "Pending" → 설정 오류

## 문제 해결 방법

### 1. 네임서버가 설정되지 않은 경우
```
가비아에서:
1. 네임서버 설정 페이지로 이동
2. "사용자 정의 네임서버" 선택
3. ns1.vercel-dns.com 입력
4. ns2.vercel-dns.com 입력
5. "저장" 클릭
6. 페이지 새로고침하여 설정 확인
```

### 2. Vercel에 도메인 추가가 안 된 경우
```
Vercel에서:
1. Settings → Domains
2. "Add" 또는 "Add Domain" 버튼 클릭
3. jdxwork.com 입력 (www 없이)
4. "Add" 클릭
5. 구독 계획 선택 (무료 플랜도 가능)
```

### 3. DNS 레코드 방식으로 설정하는 경우
만약 네임서버 방식이 작동하지 않는다면:
```
가비아에서:
1. DNS 관리 페이지로 이동
2. 기존 레코드 모두 삭제
3. 다음 레코드 추가:

레코드 1:
- 호스트: @
- 타입: A Record
- IP: [Vercel이 제공한 IP 주소]
- TTL: 3600

레코드 2:
- 호스트: www
- 타입: CNAME
- 값: cname.vercel-dns.com
- TTL: 3600
```

## 예상 소요 시간

### 네임서버 방식
- 일반: 10-30분
- 최대: 24시간

### DNS 레코드 방식
- 일반: 1-12시간
- 최대: 48시간

## 현재 확인 방법

온라인 도구:
- https://dnschecker.org/#A/jdxwork.com
- 녹색이 대부분이면 전파 완료

브라우저:
- https://jdxwork.com 접속 시도

## 다음 단계

1. 위 체크리스트 확인
2. 문제 발견 시 수정
3. 수정 후 30분 대기
4. 다시 확인

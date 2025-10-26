# 가비아 도메인을 Vercel에 연결하는 방법

## 가비아 네임서버 사용 방법 (추천)

### Step 1: 가비아에 Vercel 네임서버 등록

1. 가비아 로그인
   - https://www.gabia.com

2. 내 도메인 관리
   - "내 도메인" 메뉴 클릭
   - "도메인 관리" 선택
   - 구매한 도메인 선택

3. 네임서버 설정
   - "DNS 관리" 또는 "네임서버 설정" 클릭
   - "사용자 정의 네임서버" 선택
   - 다음과 같이 입력:
     ```
     네임서버 1: ns1.vercel-dns.com
     네임서버 2: ns2.vercel-dns.com
     ```
   - "저장" 클릭

### Step 2: Vercel에 도메인 추가

1. Vercel 대시보드 접속
   - https://vercel.com/dashboard
   - jd-automation 프로젝트 선택

2. Settings → Domains
   - Settings 탭 클릭
   - "Domains" 메뉴 클릭
   - "Add" 또는 "Add Domain" 버튼 클릭

3. 도메인 입력
   ```
   입력: yourdomain.com (가비아에서 구매한 도메인)
   ```
   - "Add" 클릭
   - "Just the root domain" 또는 "Add www" 선택

4. DNS 설정 확인
   - Vercel이 자동으로 DNS 설정 확인
   - 몇 분 소요될 수 있음

---

## 대안: 가비아 DNS 사용 방법

DNS 레코드를 직접 가비아에서 관리하는 경우:

### A 레코드 추가

1. 가비아 DNS 관리 페이지
2. "레코드 추가" 클릭
3. A 레코드 설정:
   ```
   호스트: @ (또는 빈칸)
   레코드 타입: A
   IP 주소: [Vercel이 제공한 IP]
   TTL: 3600
   ```

### CNAME 레코드 추가

1. "레코드 추가" 다시 클릭
2. CNAME 레코드 설정:
   ```
   호스트: www
   레코드 타입: CNAME
   호스트명: cname.vercel-dns.com
   TTL: 3600
   ```

---

## 설정 후 확인

1. DNS 전파 대기
   - 보통 10분~24시간 소요
   - 보통 10-30분 이내 완료

2. 확인 방법
   ```bash
   # 터미널에서 확인
   nslookup yourdomain.com
   # 또는 온라인 도구 사용
   # https://dnschecker.org
   ```

3. 웹사이트 접속 확인
   ```
   https://yourdomain.com
   https://www.yourdomain.com
   ```

---

## 문제 해결

### 도메인이 작동하지 않는 경우

1. DNS 전파 확인
   - https://dnschecker.org
   - 전 세계 DNS 서버에서 확인

2. Vercel 설정 확인
   - Settings → Domains
   - 도메인이 "Valid Configuration" 상태인지 확인

3. 가비아 설정 확인
   - 네임서버가 올바르게 설정되었는지 확인
   - DNS 레코드가 올바른지 확인

### 접속이 느린 경우

1. CDN 캐시 삭제
   - Vercel 대시보드에서 재배포
   
2. DNS 캐시 삭제
   ```bash
   # Mac/Linux
   sudo dscacheutil -flushcache
   # Windows
   ipconfig /flushdns
   ```

---

## 최종 확인 체크리스트

- [ ] 가비아에서 네임서버 설정 완료
- [ ] Vercel에서 도메인 추가 완료
- [ ] DNS 설정이 "Valid" 상태
- [ ] 도메인으로 사이트 접속 성공
- [ ] HTTPS 인증서 자동 설치 확인 (Vercel 자동)

---

## 참고 링크

- 가비아 도메인 관리: https://www.gabia.com/service/domain/
- Vercel 공식 문서: https://vercel.com/docs/concepts/projects/domains

## 지원

문제가 발생하면 다음을 확인하세요:
1. 가비아 고객센터: 1588-4254
2. Vercel 공식 문서
3. 개발자 커뮤니티

---

**작성일**: 2024년
**업데이트**: 도메인 설정 완료 후

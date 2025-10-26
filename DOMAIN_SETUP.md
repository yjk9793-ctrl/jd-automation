# 도메인 설정 가이드

## 1. 도메인 등록 사이트 비교

### 추천 순위

1. **Namecheap** (최저가)
   - 가격: $8.88/년 (첫 해)
   - 특징: 무료 WHOIS 프라이버시, DNS 관리 편리
   - 링크: https://www.namecheap.com

2. **Google Domains** (간편함)
   - 가격: $12/년
   - 특징: Gmail 통합, 간단한 설정
   - 링크: https://domains.google

3. **Cloudflare** (최고의 서비스)
   - 가격: 도메인 가격 + 수수료 없음
   - 특징: DNS 최적화, DDoS 보호 무료
   - 링크: https://www.cloudflare.com/products/registrar

## 2. Vercel에 도메인 연결하기

### Step 1: Vercel 대시보드 접속
```
https://vercel.com/dashboard
```

### Step 2: 프로젝트 선택
- `jd-automation` 프로젝트 클릭

### Step 3: Settings → Domains
- Settings 탭 클릭
- Domains 메뉴 클릭
- "Add Domain" 버튼 클릭

### Step 4: 도메인 입력
```
yourdomain.com 입력
```

### Step 5: DNS 설정
Vercel이 제공하는 DNS 정보를 복사해서 도메인 등록 사이트에 설정:

**Namecheap 예시:**
1. Domain List → Manage 클릭
2. Advanced DNS 탭
3. Add New Record
   - Type: A Record
   - Host: @
   - Value: Vercel이 제공한 IP 주소
   - Type: CNAME Record
   - Host: www
   - Value: cname.vercel-dns.com

**Google Domains 예시:**
1. DNS 탭 클릭
2. Custom resource records 추가
   - Type: A
   - Name: @
   - Data: Vercel IP
   - Type: CNAME
   - Name: www
   - Data: cname.vercel-dns.com

## 3. 추천 도메인 이름 아이디어

### JDX 관련
- jdxplatform.com
- jdxtransform.com
- jdxautomation.com
- transformjob.com

### 비즈니스 관련
- jobagent.io
- workautomation.io
- jobaiplatform.com

### 짧고 기억하기 쉬운
- jdx.co (단축 도메인)
- jobix.io
- jobai.kr (한국 도메인)

## 4. 최종 추천

**가격 우선:** Namecheap ($8.88/년)
**사용 편의성:** Google Domains ($12/년)
**최고 성능:** Cloudflare ($10/년 + 무료 DNS)

모두 Vercel과 완벽하게 호환됩니다!

# DNS 전파 확인 명령어

## 온라인 도구로 확인
- https://dnschecker.org
- https://www.whatsmydns.net
- 입력: jdxwork.com

## 터미널에서 확인
```bash
# Google DNS로 확인
dig @8.8.8.8 jdxwork.com

# Cloudflare DNS로 확인
dig @1.1.1.1 jdxwork.com

# 로컬 DNS 확인
nslookup jdxwork.com
```

## 전파 확인 방법
1. 여러 지역에서 도메인 확인
   - dnschecker.org에서 100개 이상의 DNS 서버 확인
   - 대부분 녹색으로 표시되면 전파 완료

2. Vercel 대시보드 확인
   - Settings → Domains
   - jdxwork.com 상태가 "Valid Configuration"인지 확인

3. 실제 접속 테스트
   - https://jdxwork.com
   - https://www.jdxwork.com

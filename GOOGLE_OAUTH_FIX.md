# 🔧 Google OAuth 400 오류 해결 방법

## 문제 원인:
400 오류는 일반적으로 리디렉션 URI가 Google Cloud Console에 등록되지 않았을 때 발생합니다.

## 해결 방법:

### Step 1: Google Cloud Console 확인
```
1. https://console.cloud.google.com 접속
2. 프로젝트 선택
3. API 및 서비스 → 사용자 인증 정보
4. OAuth 클라이언트 ID 클릭
```

### Step 2: 리디렉션 URI 확인
다음 URI가 **정확히** 등록되어 있어야 합니다:
```
https://jdxwork.com/api/auth/oauth/google/callback
```

**중요:**
- http가 아닌 https여야 함
- 경로가 정확히 일치해야 함
- 마지막에 슬래시(/) 없어야 함

### Step 3: 로컬 테스트용 URI 추가 (선택)
```
http://localhost:3000/api/auth/oauth/google/callback
```

### Step 4: 저장
변경사항을 저장합니다.

### Step 5: 재배포
Vercel에서 재배포합니다.

## ✅ 확인 체크리스트:
- [ ] Google Cloud Console에 리디렉션 URI 등록됨
- [ ] URI가 https://jdxwork.com/api/auth/oauth/google/callback과 정확히 일치
- [ ] Vercel에 GOOGLE_CLIENT_ID 설정됨
- [ ] Vercel에 GOOGLE_CLIENT_SECRET 설정됨
- [ ] 재배포 완료



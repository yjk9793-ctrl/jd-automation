# ✅ Google OAuth 완료 설정

## 발급받은 정보:
- **Client ID**: `1088636362027-qu8h24vsmouk574468ikeoj166n7slqe.apps.googleusercontent.com`
- **Client Secret**: `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`

## Vercel 환경 변수 설정:

### Step 1: Vercel Dashboard 접속
```
https://vercel.com/dashboard
→ jd-automation 프로젝트 클릭
```

### Step 2: Environment Variables 추가
```
Settings → Environment Variables
```

### Step 3: 다음 환경 변수 추가:

**1. GOOGLE_CLIENT_ID**
```
Key: GOOGLE_CLIENT_ID
Value: 1088636362027-qu8h24vsmouk574468ikeoj166n7slqe.apps.googleusercontent.com
Environment: ✅ Production, ✅ Preview, ✅ Development
```

**2. GOOGLE_CLIENT_SECRET**
```
Key: GOOGLE_CLIENT_SECRET
Value: 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
Environment: ✅ Production, ✅ Preview, ✅ Development
```

**3. NEXT_PUBLIC_BASE_URL (선택, 있으면 추가)**
```
Key: NEXT_PUBLIC_BASE_URL
Value: https://jdxwork.com
Environment: ✅ Production
```

### Step 4: 재배포
```
Deployments 탭
→ 최근 배포 클릭
→ "Redeploy" 클릭
```

## ✅ 완료!

재배포 후 구글 로그인이 작동합니다!

## 🔍 확인 방법:
1. 사이트 접속
2. "로그인" 버튼 클릭
3. "구글로 로그인" 버튼 클릭
4. 구글 계정 선택
5. 로그인 완료!

## ⚠️ 리디렉션 URI 확인:
Google Cloud Console에서 다음 URI가 등록되어 있어야 합니다:
- `https://jdxwork.com/api/auth/oauth/google/callback`

등록되어 있지 않으면 Google Cloud Console에서 추가해주세요!


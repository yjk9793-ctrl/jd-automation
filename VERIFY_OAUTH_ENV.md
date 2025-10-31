# ✅ Google OAuth 환경 변수 확인 방법

## "OAuth not configured" 오류 원인:
`GOOGLE_CLIENT_ID` 환경 변수가 Vercel에 설정되지 않았거나 재배포가 필요합니다.

## 해결 방법:

### Step 1: Vercel 환경 변수 확인
```
1. Vercel Dashboard → jd-automation
2. Settings → Environment Variables
3. 다음 변수가 있는지 확인:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
```

### Step 2: 환경 변수 값 확인
**GOOGLE_CLIENT_ID**:
```
1088636362027-qu8h24vsmouk574468ikeoj166n7slqe.apps.googleusercontent.com
```

**GOOGLE_CLIENT_SECRET**:
```
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
```

### Step 3: Environment 확인
모든 환경 변수에 대해:
- ✅ Production 체크
- ✅ Preview 체크
- ✅ Development 체크

### Step 4: 재배포 필수!
```
1. Deployments 탭
2. 최근 배포 클릭
3. "Redeploy" 클릭
```

환경 변수를 추가/수정한 후에는 반드시 재배포해야 합니다!

## ✅ 확인 체크리스트:
- [ ] GOOGLE_CLIENT_ID가 Vercel에 등록됨
- [ ] GOOGLE_CLIENT_SECRET이 Vercel에 등록됨
- [ ] 세 환경 모두 체크됨
- [ ] 재배포 완료
- [ ] 배포 후 로그에서 확인


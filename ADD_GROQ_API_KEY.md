# 🔧 Vercel에 GROQ_API_KEY 추가 방법

## 즉시 해야 할 일:

### Step 1: Groq API Key 발급 받기
```
1. https://console.groq.com 접속
2. Google 계정으로 로그인
3. 우측 상단 프로필 클릭
4. "API Keys" 클릭
5. "Create API Key" 클릭
6. API Key 복사
```

### Step 2: Vercel에 환경 변수 추가
```
1. Vercel Dashboard → jd-automation
2. Settings → Environment Variables
3. "Add New" 클릭
4. Key: GROQ_API_KEY
5. Value: [복사한 API Key]
6. Environment: ✅ Production, ✅ Preview, ✅ Development
7. "Save" 클릭
```

### Step 3: 기존 GEMINI_API_KEY 삭제 (선택)
```
더 이상 사용하지 않으므로 삭제해도 됩니다.
```

### Step 4: 재배포
```
1. Deployments 탭
2. 최근 배포 클릭
3. "Redeploy" 클릭
```

### Step 5: 확인
```
재배포 후 로그에서:
✅ GROQ_API_KEY exists: true
확인!
```


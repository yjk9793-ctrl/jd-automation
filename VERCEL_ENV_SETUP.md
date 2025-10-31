# 🔧 Vercel 환경 변수 설정 가이드

## Step-by-Step 가이드:

### Step 1: Vercel Dashboard 접속
```
1. https://vercel.com 접속
2. 로그인
3. "jd-automation" 프로젝트 클릭
```

### Step 2: Settings 메뉴 클릭
```
상단 메뉴에서 "Settings" 탭 클릭
```

### Step 3: Environment Variables 섹션
```
좌측 사이드바에서 "Environment Variables" 클릭
또는
Settings 페이지에서 "Environment Variables" 섹션 찾기
```

### Step 4: GOOGLE_CLIENT_ID 추가
```
1. "Add New" 또는 "+ Add" 버튼 클릭
2. Key 입력: GOOGLE_CLIENT_ID
3. Value 입력: 1088636362027-qu8h24vsmouk574468ikeoj166n7slqe.apps.googleusercontent.com
4. Environment 체크박스:
   ✅ Production
   ✅ Preview
   ✅ Development
5. "Save" 클릭
```

### Step 5: GOOGLE_CLIENT_SECRET 추가
```
1. 다시 "Add New" 또는 "+ Add" 버튼 클릭
2. Key 입력: GOOGLE_CLIENT_SECRET
3. Value 입력: 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
4. Environment 체크박스:
   ✅ Production
   ✅ Preview
   ✅ Development
5. "Save" 클릭
```

### Step 6: 다른 필수 환경 변수도 확인
다음도 설정되어 있는지 확인:
- DATABASE_URL: file:./prisma/dev.db
- AUTH_SECRET: [랜덤 문자열]
- GROQ_API_KEY: [Groq API Key]

### Step 7: 재배포 (필수!)
```
1. 상단 "Deployments" 탭 클릭
2. 최근 배포 클릭
3. 우측 상단 "..." 메뉴 클릭
4. "Redeploy" 클릭
5. "Redeploy" 확인
```

## ⚠️ 중요:
환경 변수를 추가/수정한 후에는 반드시 재배포해야 적용됩니다!

## ✅ 완료 후 확인:
재배포 후:
1. 사이트에서 "로그인" 클릭
2. "구글로 로그인" 클릭
3. 정상 작동 확인!

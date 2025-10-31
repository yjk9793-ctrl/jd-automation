# 🔍 HTTP ERROR 500 확인 방법

## 경고 메시지는 무시해도 됩니다
보여주신 경고들은 deprecated 패키지 경고이며
빌드를 막지 않습니다.

## 실제 500 에러 원인 확인:

### Step 1: Vercel 로그 확인 (가장 중요!)
```
1. Vercel Dashboard → jd-automation
2. Deployments 탭
3. 최근 배포 (빨간 ❌ 또는 ⚠️) 클릭
4. "Runtime Logs" 탭 클릭
5. 에러 메시지 확인
```

### Step 2: 확인해야 할 에러 메시지:

**A. Prisma 관련**
```
"@prisma/client did not initialize"
→ Prisma generate 문제
```

**B. 데이터베이스 관련**
```
"ENOENT: no such file or directory"
"SQLite database file not found"
→ SQLite 파일 경로 문제 (Vercel에서는 파일 저장 불가)
```

**C. 환경 변수 관련**
```
"Environment variable not found"
"process.env.DATABASE_URL is undefined"
→ 환경 변수 누락
```

### Step 3: 필수 환경 변수 확인
Vercel Settings → Environment Variables:
- ✅ DATABASE_URL
- ✅ AUTH_SECRET
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_CLIENT_SECRET

## 📸 에러 로그 요청:
Vercel Runtime Logs의 에러 메시지를 보여주시면
정확한 해결책을 제시해드리겠습니다!


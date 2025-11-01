# 🔧 HTTP ERROR 500 해결 방법

## 즉시 확인할 것:

### 1. Vercel 로그 확인 (가장 중요!)
```
1. Vercel Dashboard → jd-automation
2. Deployments 탭
3. 최근 배포 클릭 (빨간 ❌ 또는 ⚠️ 표시)
4. "Runtime Logs" 또는 "Function Logs" 확인
5. 에러 메시지 확인
```

### 2. 가능한 원인들:

#### A. Prisma 관련 오류
```
에러: "@prisma/client did not initialize"
해결: package.json의 build 스크립트 확인
```

#### B. 환경 변수 누락
```
필수 환경 변수:
- DATABASE_URL
- AUTH_SECRET
```

#### C. 데이터베이스 마이그레이션
```
Prisma 마이그레이션이 실행되지 않았을 수 있음
```

### 3. 빠른 해결책:

#### Step 1: 환경 변수 확인
```
Vercel Settings → Environment Variables:
- DATABASE_URL: file:./prisma/dev.db
- AUTH_SECRET: [랜덤 문자열]
```

#### Step 2: package.json 확인
build 스크립트에 `prisma generate`가 포함되어 있는지 확인

#### Step 3: 재배포
환경 변수 설정 후 재배포

## 📸 로그 확인 요청:
Vercel Runtime Logs에서 에러 메시지를 확인해서
정확한 원인을 알려주시면 해결해드리겠습니다!



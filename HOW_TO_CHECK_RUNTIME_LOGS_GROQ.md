# 🔍 Vercel Runtime Logs 확인 방법

## Step 1: Vercel Dashboard 접속
```
https://vercel.com/dashboard
→ jd-automation 프로젝트 클릭
```

## Step 2: Runtime Logs 확인 방법

### 방법 A: Deployments에서
```
1. 상단 "Deployments" 탭 클릭
2. 최근 배포 (초록색 ✓) 클릭
3. "Runtime Logs" 버튼 클릭
```

### 방법 B: Overview에서
```
1. Overview 페이지에 있는
2. "Production Deployment" 카드
3. 우측 "Runtime Logs" 버튼 클릭
```

### 방법 C: Logs 탭에서
```
1. 상단 "Logs" 탭 클릭
2. 필터에 "groq" 또는 "GROQ_API_KEY" 입력
3. 분석 실행 후 로그 확인
```

## Step 3: 확인할 내용
로그에서 다음 메시지를 찾으세요:

```
=== GroqLLMClient Constructor ===
GROQ_API_KEY exists: true
GROQ_API_KEY length: [숫자]
✅ GROQ_API_KEY is set, initializing...
✅ Groq client initialized
```

또는

```
❌ GROQ_API_KEY is not set!
GROQ_API_KEY exists: false
```

## Step 4: 분석 실행
로그를 확인하는 동안:
1. 사이트에서 분석 실행
2. 로그가 실시간으로 나타남
3. 메시지 확인


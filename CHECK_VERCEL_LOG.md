# 🔍 Vercel 로그 확인 방법

## 즉시 확인해야 할 것:

### 1. Vercel 대시보드 접속
```
https://vercel.com/dashboard
→ jd-automation 프로젝트 클릭
```

### 2. 로그 확인
**방법 A: Functions 탭**
```
1. 상단 메뉴에서 "Functions" 클릭
2. "/api/analyze" 클릭
3. 로그 확인
```

**방법 B: Deployments 탭**
```
1. "Deployments" 탭 클릭
2. 최근 배포 클릭 (초록 체크표시)
3. "Functions" 메뉴에서 "/api/analyze" 선택
4. 로그 확인
```

### 3. 확인해야 할 메시지
```
GeminiLLMClient constructor called
process.env.GEMINI_API_KEY: undefined (또는 값)
Final apiKey: gen-lang-client-0285771016
✅ GEMINI_API_KEY found. Using Gemini API...
```

또는

```
❌ GEMINI_API_KEY not found. Using fallback.
```

## ⚠️ 만약 "Using fallback"이 나온다면

환경 변수가 로드되지 않는다는 의미입니다.

Vercel Settings에서:
1. Environment Variables 클릭
2. GEMINI_API_KEY가 있는지 확인
3. Environment에 Production, Preview, Development 모두 체크됐는지 확인

## 🧪 빠른 테스트

로그를 확인할 수 없으시면:

1. 사이트에서 분석 실행
2. F12 (개발자 도구) 열기
3. Console 탭에서 에러 메시지 확인
4. Network 탭에서 /api/analyze 요청 확인
5. Response 내용 확인

## 📸 스크린샷 요청

다음 중 하나를 스크린샷 보내주시면:
1. Vercel Functions 로그
2. 브라우저 Console 에러
3. Network 탭의 /api/analyze Response


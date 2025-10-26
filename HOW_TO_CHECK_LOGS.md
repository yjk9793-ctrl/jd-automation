# Vercel 로그 확인 가이드

## 📍 확인 위치

### Build Log vs Runtime Log 구분

**Build Log (빌드 로그):**
- 배포할 때 빌드 과정의 로그
- npm install, 빌드 과정 등
- 현재 보고 계신 것이 빌드 로그

**Runtime Log (실행 로그):** ← 이걸 확인해야 함!
- 실제 사이트가 실행될 때의 로그
- API 호출 시 발생하는 로그
- 여기서 에러 메시지를 확인

## 🔍 Runtime Log 확인 방법

### 방법 1: Functions 탭 (가장 확실함)

1. Vercel Dashboard
2. jd-automation 프로젝트
3. 최근 배포 클릭 (상단 가장 최근 것)
4. "Functions" 탭 클릭
5. `/api/analyze` 클릭
6. 로그 확인

### 방법 2: 실시간 로그

1. Vercel Dashboard  
2. jd-automation 프로젝트
3. 상단에 "Functions" 클릭
4. `/api/analyze` 찾기
5. 로그 보기

### 방법 3: 사이트에서 분석 실행 후 바로 확인

1. https://jdxwork.com 접속
2. 분석 실행 (JD 입력 후 분석 시작)
3. 즉시 Vercel Dashboard → Functions → /api/analyze
4. 가장 최근 로그 확인 (방금 실행한 것)

## 📊 확인해야 할 로그

```
Environment check:
- GEMINI_API_KEY exists: true/false
- GEMINI_API_KEY length: [숫자]
- GEMINI_API_KEY first 10 chars: [문자열]

Attempting to use Gemini API...
GeminiLLMClient created successfully
Gemini API analysis completed successfully
```

또는 에러 메시지:
```
Gemini API Error Details:
- Error name: [이름]
- Error message: [메시지]
```

## ⚠️ Build Log는 의미 없음

- Build Log는 빌드 과정의 로그
- 실제 실행 시 발생하는 문제는 Runtime Log에서 확인
- Build Log만 봐도 환경 변수 확인 안 됨

## ✅ 올바른 확인 순서

1. 사이트 접속 (https://jdxwork.com)
2. 분석 실행 (JD 입력 후 분석)
3. Vercel Dashboard → Functions 탭
4. /api/analyze 로그 확인
5. 방금 실행한 로그만 확인

---
이 순서대로 하면 정확한 에러 메시지 확인 가능!

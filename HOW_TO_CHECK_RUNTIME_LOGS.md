# 📋 Runtime Logs 확인 방법

## Vercel Dashboard에서:

### 방법 1: Overview 페이지에서
```
1. Production Deployment 카드의 우측
2. "Runtime Logs" 버튼 클릭
```

### 방법 2: Deployments 탭에서
```
1. 상단 "Deployments" 탭 클릭
2. 최근 배포(초록색 ✓) 클릭
3. "Runtime Logs" 탭 클릭
```

## 로그 내용 확인

로그에서 찾을 내용:
- `=== GeminiLLMClient Constructor ===`
- `GEMINI_API_KEY exists: true/false`
- `✅ GEMINI_API_KEY is set, initializing...`

또는

- `❌ GEMINI_API_KEY is not set!`
- `Using fallback mock data`

## 📸 스크린샷 요청

Runtime Logs 화면 스크린샷을 보내주시면
정확히 무엇이 문제인지 알 수 있습니다!

특히 "GEMINI_API_KEY" 관련 메시지가 있는 부분을
찍어서 보내주세요.


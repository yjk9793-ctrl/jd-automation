# 🌐 브라우저에서 즉시 확인하는 방법

## Step 1: 사이트 접속
```
https://jdxwork.com
```

## Step 2: 개발자 도구 열기
```
Mac: Cmd + Option + I
Windows: F12 또는 Ctrl + Shift + I
```

## Step 3: 새 분석 실행
```
1. "테스트하기" 클릭
2. 마케팅 담당자 JD 입력
3. 이메일 입력
4. "분석 시작" 클릭
```

## Step 4: Console 확인
개발자 도구의 "Console" 탭에서 확인:
```
- ❌ 에러 메시지가 있는지 확인
- ✅ "GEMINI_API_KEY" 로그가 있는지 확인
- ✅ "Attempting to use Gemini API" 메시지 확인
```

## Step 5: Network 확인
1. 개발자 도구의 "Network" 탭 클릭
2. 분석 실행
3. "/api/analyze" 요청 찾기
4. 클릭하여 Response 확인

### Response에 나와야 할 내용:
```json
{
  "success": true,
  "data": {
    "aiSummary": "..."  ← 이것이 있어야 함!
  }
}
```

## ⚠️ 만약 Response에 에러가 있다면:

예시:
```json
{
  "success": false,
  "error": "Analysis failed"
}
```

에러 메시지를 복사해서 알려주세요!

## 🔍 또는 에러 스크린샷

Console 탭의 빨간 에러 메시지 스크린샷 보내주시면
정확한 원인을 알 수 있습니다.

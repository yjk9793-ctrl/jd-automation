# 🔍 Network 탭 확인 방법

## Step 1: 브라우저 개발자 도구 열기
```
F12 또는 Cmd + Option + I
```

## Step 2: Network 탭 선택
개발자 도구에서 "Network" 탭 클릭

## Step 3: 필터 설정
1. "Filter" 입력창에 "analyze" 입력
2. Enter

## Step 4: 분석 실행
사이트에서 다시 "AI 분석 시작" 클릭

## Step 5: 확인

### ✅ 성공 케이스
- "/api/analyze" 요청이 보임
- Status: 200 (초록색)
- Response에 결과가 나옴

### ❌ 실패 케이스
- "/api/analyze" 요청이 보이지 않음
→ 사이트가 데모 모드로 작동 중

## Step 6: 스크린샷

Network 탭을 스크린샷 찍어서 보내주세요:
1. "/api/analyze" 요청이 보이는지
2. 보인다면 Status 코드가 무엇인지
3. Response 내용


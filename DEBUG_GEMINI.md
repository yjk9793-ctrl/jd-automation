# Gemini API 문제 디버깅

## 현재 상황
- AI 요약이 표시되지 않음
- 배포는 완료되었지만 결과가 없음

## 가능한 원인

### 1. Gemini API가 작동하지 않음
- 환경 변수가 설정되지 않았거나
- API 키가 잘못되었거나
- API 호출 실패

### 2. 에러 로그 확인 필요
Vercel 로그 확인:
1. https://vercel.com/dashboard
2. jd-automation 프로젝트 클릭
3. Functions 탭
4. /api/analyze 로그 확인
5. 에러 메시지 확인

## 간단한 테스트 방법

### 즉시 확인
Gemini API가 작동하는지 직접 테스트:

```bash
curl -X POST https://jdxwork.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "type": "enterprise",
    "content": "마케팅 담당자",
    "email": "test@example.com"
  }'
```

### 예상 결과
- `aiSummary` 필드가 있는지 확인
- 에러 메시지 확인

## 임시 해결책
Gemini API가 작동하지 않아도 요약이 표시되도록 폴백 코드가 있음
- `getMockAnalysisResults()`에 `aiSummary` 포함됨

## 문제 해결 체크리스트
- [ ] Vercel 환경 변수 확인
- [ ] Gemini API 키 확인
- [ ] 로그 확인
- [ ] 직접 API 테스트

# Vercel 환경 변수 설정 가이드

## Gemini API Key 추가 방법

### Step 1: Vercel 대시보드 접속
```
https://vercel.com/dashboard
```

### Step 2: 프로젝트 선택
1. "jd-automation" 프로젝트 클릭
2. "Settings" 탭 클릭
3. "Environment Variables" 메뉴 클릭

### Step 3: 환경 변수 추가
```
변수 이름: GEMINI_API_KEY
값: gen-lang-client-0285771016
Environment: Production, Preview, Development 모두 선택
```

### Step 4: 저장 및 재배포
1. "Save" 버튼 클릭
2. "Deployments" 탭으로 이동
3. "Redeploy" 클릭하여 환경 변수 적용

## 확인 사항

✅ 환경 변수 추가 완료
✅ Vercel에 키 저장됨
✅ 모든 환경에 적용됨
✅ 재배포 완료 대기

## 다음 단계

1. Gemini API 패키지 설치
```bash
npm install @google/generative-ai
```

2. LLM Client 코드 수정
- src/lib/llmClient.ts 파일 수정
- Gemini API 연동 코드 추가

3. 테스트
- 사이트에서 분석 기능 테스트
- Gemini API 정상 작동 확인

---
자세한 구현 가이드는 무료 LLM 가이드를 참고하세요.

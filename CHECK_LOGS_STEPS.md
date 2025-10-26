# 🔍 Vercel 로그 확인 정확한 방법

## ⚠️ Build Log는 의미 없습니다!

**Build Log (빌드 로그):**
- npm install 로그
- 빌드 과정 로그
- 이건 현재 보고 계신 것

**Runtime Log (실행 로그):** ← 이것을 확인!
- 실제 API 호출 시 로그
- 환경 변수 확인
- 에러 메시지 확인

## ✅ 정확한 확인 방법

### 1단계: 사이트에서 분석 실행
```
1. https://jdxwork.com 접속
2. "기업 분석 시작" 클릭  
3. "마케팅 담당자 JD" 입력
4. 이메일 입력
5. "분석 시작" 버튼 클릭
6. 에러가 나거나 결과가 나올 때까지 대기
```

### 2단계: Vercel에서 로그 확인 (즉시!)
```
1. https://vercel.com/dashboard 접속
2. jd-automation 프로젝트 클릭
3. 상단 메뉴에서 "Functions" 클릭 (또는 최근 배포 클릭)
4. 함수 목록에서 "/api/analyze" 찾기
5. 클릭하여 로그 확인
```

### 3단계: 확인할 내용
```
Environment check:
- GEMINI_API_KEY exists: true/false
- GEMINI_API_KEY length: [숫자]
- GEMINI_API_KEY first 10 chars: [문자열]

Gemini API Error Details:
- Error name: [이름]
- Error message: [메시지]
```

## 🎯 간단한 확인 방법

### 브라우저 개발자 도구
```
1. https://jdxwork.com 접속
2. F12 누르기
3. Console 탭
4. 분석 실행
5. 콘솔에 에러 메시지 확인
```

또는

### Network 탭
```
1. F12 누르기
2. Network 탭
3. 분석 실행
4. /api/analyze 요청 클릭
5. Response 탭에서 에러 확인
```

## 📝 최종 요청

제가 로그를 확인해야 정확한 원인을 파악할 수 있습니다.

다음 중 하나를 해주세요:
1. Vercel Functions 탭의 /api/analyze 로그 스크린샷
2. 브라우저 Console의 에러 메시지 스크린샷
3. Network 탭의 /api/analyze Response 내용

이걸 보면 정확히 무엇이 문제인지 알 수 있습니다!

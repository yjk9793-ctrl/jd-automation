# Vercel에 Gemini API Key 추가하기

## 🚀 단계별 가이드

### Step 1: Vercel 대시보드 접속
```
https://vercel.com/dashboard
```

### Step 2: 프로젝트 선택
1. 대시보드에서 **"jd-automation"** 프로젝트 찾기
2. 프로젝트 클릭하여 이동

### Step 3: Settings 페이지 이동
1. 프로젝트 페이지 상단의 **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Environment Variables"** 클릭

### Step 4: 환경 변수 추가
1. **"Add New"** 버튼 클릭
2. 다음 정보 입력:

   **Key (변수 이름):**
   ```
   GEMINI_API_KEY
   ```

   **Value (값):**
   ```
   gen-lang-client-0285771016
   ```

   **Environment (환경):**
   - ✅ Production (체크)
   - ✅ Preview (체크)
   - ✅ Development (체크)

3. **"Save"** 버튼 클릭

### Step 5: 재배포 (자동)
- 환경 변수 추가 후 Vercel이 **자동으로 재배포** 시작
- 몇 분 소요
- Deployments 탭에서 배포 상태 확인 가능

## 📸 스크린샷 가이드

### 화면 구성
```
Vercel Dashboard
├─ Your Projects
│  └─ jdx-automation (클릭)
│     ├─ Settings 탭 (클릭)
│     │  └─ Environment Variables (클릭)
│     │     └─ Add New 버튼 (클릭)
│     │        ├─ Key 입력란: GEMINI_API_KEY
│     │        ├─ Value 입력란: gen-lang-client-0285771016
│     │        ├─ Production: ✅
│     │        ├─ Preview: ✅
│     │        └─ Development: ✅
│     │           └─ Save 버튼
```

## ✅ 확인 방법

### 1. 배포 상태 확인
```
1. Deployments 탭 클릭
2. 최근 배포 상태 확인
3. "Ready" 상태가 되면 완료
```

### 2. 로그 확인
```
1. 최근 배포 클릭
2. "Functions" 탭
3. /api/analyze 로그 확인
4. 환경 변수가 로드되었는지 확인
```

### 3. 기능 테스트
```
1. https://jdxwork.com 접속
2. 분석 기능 테스트
3. Gemini API가 정상 작동하는지 확인
```

## 🔍 문제 해결

### 환경 변수가 작동하지 않을 때
1. **재배포 필요**
   - Deployments → 최근 배포 클릭 → "Redeploy" 버튼
   
2. **환경 변수 이름 확인**
   - 정확히 `GEMINI_API_KEY`인지 확인
   - 대소문자 정확히 입력

3. **값 확인**
   - `gen-lang-client-0285771016` 정확히 입력
   - 앞뒤 공백 없이

### 배포가 실패할 때
1. **로그 확인**
   - Deployments → Functions 탭
   - 빌드 로그 확인

2. **환경 변수 다시 추가**
   - Settings → Environment Variables
   - 기존 항목 삭제 후 다시 추가

## 📝 참고사항

### 보안
- API Key는 민감한 정보입니다
- 절대 GitHub에 커밋하지 마세요
- Vercel 환경 변수에만 저장하세요

### 무료 할당량
- Gemini 무료 티어 사용 중
- 월 15 RPM (요청/분)
- 과도한 사용 시 제한될 수 있음

### 비용
- 현재 무료로 사용 가능
- 과도한 트래픽 발생 시 Gemini 유료 전환 고려

## ✨ 완료 후

환경 변수 추가 후 다음이 작동합니다:
- ✅ 실제 AI 분석 기능
- ✅ Job Description 분석
- ✅ Resume 분석
- ✅ 동적 분석 결과
- ✅ 맞춤형 추천

---

**작성일**: 2024년 10월
**업데이트**: 최신 Gemini API 정보

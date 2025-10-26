# 환경 변수 문제 디버깅

## 🔍 문제 상황
- Vercel에 환경 변수 추가됨
- 하지만 로그에서 `GEMINI_API_KEY exists: false`
- Environment Variable이 로드되지 않음

## ⚠️ 가능한 원인

### 1. 환경 변수 이름 오타
- Vercel에 잘못된 이름으로 추가됨
- 예: `GEMINI_API_KEY_` (언더스코어 추가)
- 예: `gemini_api_key` (소문자)
- 예: `GEMINIAPIKEY` (언더스코어 없음)

### 2. Environment 선택 문제
- Production만 선택됨
- Preview, Development 미선택
- 현재 환경이 다름

### 3. 재배포 안 함
- 환경 변수 추가 후 재배포 안 함
- 변경사항이 적용 안 됨

### 4. 다른 프로젝트에 추가함
- 다른 프로젝트에 추가됨
- jd-automation 프로젝트에 안 됨

## ✅ 해결 방법

### Step 1: 환경 변수 이름 확인
Vercel Dashboard에서:
```
Settings → Environment Variables
정확한 이름 확인:
GEMINI_API_KEY (대문자, 언더스코어 3개)
```

### Step 2: 값 확인
```
Value: gen-lang-client-0285771016
(앞뒤 공백 없어야 함)
```

### Step 3: Environment 확인
```
✅ Production 체크
✅ Preview 체크
✅ Development 체크
```

### Step 4: 강제 재배포
```
Deployments → 최근 배포 클릭
Redeploy 버튼 클릭
```

## 🧪 간단한 테스트

### 코드에 직접 테스트 추가
임시로 환경 변수 로드 테스트 코드 추가


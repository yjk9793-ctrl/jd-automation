# 즉시 해결 방법

## 문제
- AI 요약이 표시되지 않음
- 코드는 이미 수정되었지만 배포가 덜 반영됨

## 해결 방법

### 방법 1: Vercel 수동 재배포
1. https://vercel.com/dashboard 접속
2. jd-automation 프로젝트 선택
3. Deployments 탭
4. 최근 배포 클릭
5. "Redeploy" 버튼 클릭

### 방법 2: 코드 수정 후 자동 배포
임시로 UI 코드를 수정하여 강제 배포

### 방법 3: 환경 변수 확인
1. Settings → Environment Variables
2. GEMINI_API_KEY 확인
3. 없으면 추가
4. 추가 후 수동 재배포

## 가장 빠른 방법
코드에 작은 변경을 가해 자동 재배포 유도

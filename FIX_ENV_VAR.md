# 환경 변수 즉시 적용 방법

## 🎯 문제
- Vercel에 환경 변수 추가됨
- 하지만 로그에서 `GEMINI_API_KEY exists: false`
- 환경 변수가 로드되지 않음

## ✅ 해결 방법 (즉시 적용)

### 방법 1: 강제 재배포
```
1. https://vercel.com/dashboard
2. jd-automation 프로젝트
3. Deployments 탭
4. 최근 배포 클릭
5. 세 개 점 메뉴 (...) 클릭
6. "Redeploy" 클릭
```

### 방법 2: 환경 변수 재설정
```
1. Settings → Environment Variables
2. 기존 GEMINI_API_KEY 삭제
3. 다시 추가:
   Key: GEMINI_API_KEY
   Value: gen-lang-client-0285771016
   Environment: ✅ Production, ✅ Preview, ✅ Development
4. Save
5. Deployments에서 Redeploy
```

### 방법 3: 코드 수정으로 강제 배포
임시로 코드를 수정하여 자동 재배포

## 🔍 확인 체크리스트
- [ ] 환경 변수 이름 정확히: GEMINI_API_KEY
- [ ] 값 정확히: gen-lang-client-0285771016
- [ ] 세 환경 모두 체크
- [ ] 재배포 완료
- [ ] 로그 확인: exists: true

## ⚠️ 주의사항
- 환경 변수 추가만으로는 안 됨
- 재배포 필요!
- 환경 변수는 배포 시 로드됨


# ⚠️ SWC Dependencies 경고 정보

## 경고 메시지:
```
⚠ Found lockfile missing swc dependencies, run next locally to automatically patch
```

## 이 경고는 무엇인가요?
- Next.js의 SWC (Speedy Web Compiler) 의존성 관련 경고
- 일반적으로 빌드에는 영향 없음
- Vercel에서 자동으로 처리됨

## 해결 방법 (선택사항):

### 방법 1: 무시하기
이 경고는 빌드 성공에는 영향이 없습니다.

### 방법 2: 로컬에서 자동 패치
로컬에서 한 번 실행하면 자동으로 패치됩니다:
```bash
npm run dev
```
(로컬 실행 후 종료해도 됩니다)

### 방법 3: 명시적 설치
```bash
npm install --save-dev @next/swc-darwin-x64
```
(운영체제에 따라 다를 수 있음)

## ✅ 결론:
이 경고는 무시해도 됩니다. 
빌드가 성공적으로 완료되면 문제없습니다!


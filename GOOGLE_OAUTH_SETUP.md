# 🔐 Google OAuth 설정 가이드

## Step 1: Google Cloud Console 접속
```
1. https://console.cloud.google.com 접속
2. Google 계정으로 로그인
```

## Step 2: 새 프로젝트 생성
```
1. 상단 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름 입력: "JDX Authentication"
4. "만들기" 클릭
```

## Step 3: OAuth 동의 화면 구성
```
1. 좌측 메뉴 → "API 및 서비스" → "OAuth 동의 화면"
2. "외부" 선택 → "만들기"
3. 필수 정보 입력:
   - 앱 이름: "JDX"
   - 사용자 지원 이메일: [본인 이메일]
   - 개발자 연락처 정보: [본인 이메일]
4. "저장하고 계속하기" 클릭
5. 다음 단계들에서 "저장하고 계속하기" 계속 클릭
6. 마지막 "대시보드로 돌아가기" 클릭
```

## Step 4: OAuth 클라이언트 ID 생성
```
1. 좌측 메뉴 → "사용자 인증 정보"
2. 상단 "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
3. 애플리케이션 유형: "웹 애플리케이션"
4. 이름: "JDX Web Client"
5. 승인된 JavaScript 원본:
   - http://localhost:3000 (로컬 테스트용)
   - https://jdxwork.com (프로덕션)
6. 승인된 리디렉션 URI:
   - http://localhost:3000/api/auth/oauth/google/callback
   - https://jdxwork.com/api/auth/oauth/google/callback
7. "만들기" 클릭
```

## Step 5: 클라이언트 ID 및 SECRET 복사
```
생성된 팝업에서:
- 클라이언트 ID 복사
- 클라이언트 보안 비밀번호 복사

⚠️ 중요: 이 정보는 다시 볼 수 없으므로 안전하게 보관하세요!
```

## Step 6: Vercel 환경 변수 설정
```
1. Vercel Dashboard → jd-automation
2. Settings → Environment Variables
3. 추가:
   - GOOGLE_CLIENT_ID: [복사한 클라이언트 ID]
   - GOOGLE_CLIENT_SECRET: [복사한 클라이언트 SECRET]
4. Environment: 모든 환경 체크
5. Save
```

## Step 7: 로컬 .env 파일 설정
```
프로젝트 루트에 .env 파일 생성:
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

## ✅ 완료!

이제 구글 로그인을 사용할 수 있습니다!

## 🎯 발급 후 알려주세요
클라이언트 ID와 SECRET을 알려주시면
코드에 바로 연동해드리겠습니다!



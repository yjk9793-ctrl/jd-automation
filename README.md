# AI Agent Transformation Platform

## 프로젝트 개요

기업과 개인의 생산성 혁신을 위한 AI 에이전트 솔루션 플랫폼입니다. 직무 설명서와 이력서를 분석하여 AI 에이전트로 자동화 가능한 업무를 식별하고, 상세한 분석 리포트를 제공합니다.

## 주요 기능

### 1. 이중 분석 시스템
- **기업 분석**: 직무 설명서(JD) 분석을 통한 업무 자동화 가능성 평가
- **개인 분석**: 이력서 분석을 통한 개인의 AI 에이전트 활용 가능성 평가

### 2. 상세 분석 리포트
- 자동화 가능성 점수 및 ROI 예측
- 업무별 상세 분석 (완전 자동화, AI 협업, 인간 중심)
- 필요 기술 스택 및 구현 로드맵
- 기대 효과 및 위험 요소 분석

### 3. 이메일 리포트 발송
- 분석 결과를 이메일로 자동 발송
- PDF 형태의 상세 리포트 제공
- 재발송 및 다운로드 기능

### 4. 맞춤형 컨설팅 서비스
- 기업별 특성에 맞는 AI 에이전트 전환 전략
- 단계별 구현 계획 수립
- 성과 측정 및 최적화 방안

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **File Processing**: PDF-parse, Mammoth
- **Email**: Nodemailer
- **AI**: OpenAI GPT-4, Anthropic Claude
- **Deployment**: Vercel

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # 분석 API
│   │   └── send-email/route.ts   # 이메일 발송 API
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── AnalysisForm.tsx          # 분석 폼 컴포넌트
│   └── AnalysisResults.tsx       # 분석 결과 컴포넌트
├── lib/
│   └── i18n.ts                   # 다국어 지원
└── types/
    └── index.ts                  # TypeScript 타입 정의
```

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
# .env.local 파일 생성
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

## 배포 (Vercel)

### 1. Vercel 계정 생성
- [Vercel](https://vercel.com)에서 계정 생성

### 2. GitHub 연동
- GitHub 리포지토리와 Vercel 프로젝트 연결

### 3. 환경 변수 설정
- Vercel 대시보드에서 환경 변수 설정
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`

### 4. 자동 배포
- GitHub에 푸시하면 자동으로 배포됨

## 주요 컴포넌트

### AnalysisForm
- 파일 업로드 및 텍스트 입력
- 기업/개인 분석 타입 선택
- 이메일 주소 입력
- 분석 실행

### AnalysisResults
- 분석 결과 시각화
- 탭 기반 상세 정보 표시
- PDF 다운로드 및 이메일 재발송

## API 엔드포인트

### POST /api/analyze
분석 요청 처리
```json
{
  "type": "enterprise" | "personal",
  "content": "분석할 내용",
  "email": "결과 수신 이메일"
}
```

### POST /api/send-email
이메일 발송
```json
{
  "email": "수신자 이메일",
  "analysisResult": "분석 결과 객체"
}
```

## 다국어 지원

- 한국어 (ko)
- 영어 (en)

언어 전환은 헤더의 언어 토글 버튼을 통해 가능합니다.

## 스타일링

- **다크 테마**: 전체적으로 다크 배경과 밝은 텍스트
- **그라데이션**: 주요 요소에 그라데이션 효과 적용
- **애니메이션**: Framer Motion을 활용한 부드러운 애니메이션
- **반응형**: 모바일, 태블릿, 데스크톱 대응

## 성능 최적화

- Next.js 14 App Router 활용
- 이미지 최적화
- 코드 스플리팅
- 서버 사이드 렌더링

## 보안

- API 키 환경 변수 관리
- 입력 데이터 검증 (Zod)
- CORS 설정
- Rate Limiting (추후 구현 예정)

## 향후 계획

1. **실제 AI 모델 연동**: OpenAI GPT-4, Claude API 연동
2. **데이터베이스 연동**: 분석 결과 저장 및 관리
3. **사용자 인증**: 로그인/회원가입 시스템
4. **결제 시스템**: 프리미엄 기능 유료화
5. **API 확장**: 외부 서비스 연동
6. **모바일 앱**: React Native 앱 개발

## 라이선스

MIT License

## 문의

- 이메일: contact@aiagent.com
- 전화: +82-2-1234-5678
- 주소: 서울특별시 강남구 테헤란로 123

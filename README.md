# JD 자동화 분석기 (AI Agentization Analyzer)

> 당신의 JD, AI 에이전트화 관점에서 다시 보기

Job Description을 분석하여 AI 에이전트화 가능한 업무를 식별하고, 상세한 분석 리포트와 구현 가이드를 제공하는 AI 기반 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🌍 다국어 지원
- **한국어/영어**: 완전한 다국어 지원
- **실시간 전환**: 언어 전환 버튼으로 즉시 변경
- **일관된 경험**: 모든 UI 요소와 메시지 번역

### 🔍 AI 에이전트화 평가 엔진
- **작업 분해**: JD를 구체적인 작업 단위로 분해
- **3단계 분류**: Automate / Co-pilot / Human-critical
- **점수화**: 0-100점 자동화 가능성 점수
- **ROI 추정**: 예상 시간 절감 효과 계산
- **에이전트 유형 분류**: 데이터 처리, 고객 서비스, 콘텐츠 생성 등

### 📊 상세한 분석 리포트
- **시각화**: 다양한 차트와 그래프로 결과 표시
  - 원형 차트 (Task Distribution)
  - 막대 그래프 (ROI Analysis)
  - 선 그래프 (Score vs ROI)
  - 난이도 분포 차트
- **필터링**: 카테고리, 점수, 난이도별 필터
- **정렬**: 점수, ROI, 난이도, 제목순 정렬
- **검색**: 작업명과 설명으로 검색
- **요약/상세 뷰**: 두 가지 모드로 결과 확인

### 🤖 AI 에이전트 상세 정보
- **에이전트 유형**: 각 작업에 적합한 에이전트 유형 제안
- **주요 기능**: 에이전트의 핵심 기능 설명
- **기대 효과**: 시간 절감, 비용 절감, 품질 향상 등
- **구현 가이드**: 단계별 레시피와 코드 예시

### 🛠️ 구현 가이드
- **상세 레시피**: 입력/출력 스키마, 구현 단계
- **코드 예시**: TypeScript, Python 코드 제공
- **플로우 차트**: Mermaid 다이어그램
- **리스크 분석**: 위험 요소와 가드레일 제안

### 📤 PDF 내보내기 & 이메일 전송
- **PDF 생성**: 상세한 분석 리포트를 PDF로 변환
- **이메일 전송**: 입력한 이메일로 PDF 자동 전송
- **선택적 내보내기**: 작업 목록, 레시피, 코드 샘플 포함 여부 선택
- **로컬 다운로드**: PDF를 직접 다운로드 가능

### 🎨 최신 UI/UX 트렌드
- **그라데이션 디자인**: 현대적인 그라데이션 효과
- **애니메이션**: 부드러운 전환과 호버 효과
- **글래스모피즘**: 투명도와 블러 효과
- **다크 모드**: 완벽한 다크 모드 지원
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🚀 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Recharts** - 데이터 시각화 (차트, 그래프)
- **Lucide React** - 아이콘
- **Sonner** - 토스트 알림
- **React Hook Form** - 폼 관리
- **React Dropzone** - 파일 업로드

### Backend
- **Next.js API Routes** - 서버리스 API
- **OpenAI GPT-4** - LLM 분석
- **Anthropic Claude** - 대체 LLM 옵션
- **jsPDF** - PDF 생성
- **html2canvas** - HTML to Canvas 변환
- **Zod** - 스키마 검증
- **Mammoth** - DOCX 파일 파싱

### 개발 도구
- **ESLint** - 코드 품질
- **Prettier** - 코드 포맷팅
- **next-themes** - 다크/라이트 테마
- **Class Variance Authority** - 컴포넌트 변형

## 🛠️ 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/jd-automation.git
cd jd-automation
```

### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 3. 환경 변수 설정
```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 필요한 환경 변수를 설정하세요:

```env
# LLM Provider (OpenAI 또는 Anthropic 중 선택)
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# 또는 Anthropic 사용 시
# LLM_PROVIDER=anthropic
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# ANTHROPIC_MODEL=claude-3-sonnet-20240229

# 애플리케이션 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 이메일 서비스 설정 (PDF 전송용)
# SendGrid 사용 시
# SENDGRID_API_KEY=your_sendgrid_api_key
# FROM_EMAIL=noreply@yourdomain.com

# AWS SES 사용 시
# AWS_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
# FROM_EMAIL=noreply@yourdomain.com

# Resend 사용 시
# RESEND_API_KEY=your_resend_api_key
# FROM_EMAIL=noreply@yourdomain.com

# SMTP 사용 시
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
# FROM_EMAIL=your_email@gmail.com
```

### 4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📱 사용법

### 1. 언어 선택
- 헤더의 언어 전환 버튼으로 한국어/영어 선택
- 모든 UI 요소와 메시지가 선택한 언어로 표시됩니다

### 2. JD 입력
- **텍스트 입력**: JD 내용을 직접 입력
- **파일 업로드**: PDF, TXT, MD, DOCX 파일 업로드
- **데모 모드**: 샘플 JD로 기능 체험

### 3. 분석 결과 확인
- **요약 뷰**: 전체 통계와 ROI 정보
  - 점수 카드 (Automation Score, Agentization Score, Average ROI)
  - 도넛 차트로 자동화 기회 분포 시각화
  - 작업 목록에서 필터링과 정렬로 탐색
- **상세 뷰**: 포괄적인 분석 리포트
  - 다양한 차트와 그래프 (원형, 막대, 선 그래프)
  - High Impact Tasks 상세 분석
  - AI 에이전트 유형, 주요 기능, 기대 효과

### 4. AI 에이전트 정보 확인
- **에이전트 유형**: 각 작업에 적합한 에이전트 유형 제안
  - 데이터 처리 에이전트
  - 고객 서비스 에이전트
  - 콘텐츠 생성 에이전트
  - 분석 에이전트
  - 모니터링 에이전트
  - 워크플로우 에이전트
- **주요 기능**: 에이전트의 핵심 기능 설명
- **기대 효과**: 시간 절감, 비용 절감, 품질 향상 등

### 5. 상세 정보 조회
- **작업 선택**: 클릭하여 상세 정보 확인
- **레시피 생성**: 구현 가이드 자동 생성
- **코드 예시**: TypeScript/Python 코드 제공

### 6. PDF 내보내기 및 이메일 전송
- **PDF 내보내기 버튼**: 우측 상단의 "Export PDF" 버튼 클릭
- **이메일 입력**: PDF를 받을 이메일 주소 입력
- **옵션 선택**: 작업 목록, 레시피, 코드 샘플 포함 여부 선택
- **전송/다운로드**: 이메일로 전송하거나 로컬에 다운로드

## 🔧 API 엔드포인트

### POST `/api/analyze`
JD 분석 요청

**요청 본문:**
```json
{
  "jd": {
    "text": "Job Description 텍스트",
    "fileName": "파일명 (선택사항)",
    "fileType": "파일 타입 (선택사항)"
  },
  "options": {
    "includeRecipe": true,
    "detailLevel": "detailed"
  }
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "tasks": [...],
    "summary": {...},
    "metadata": {...}
  }
}
```

### POST `/api/recipe`
레시피 생성 요청

**요청 본문:**
```json
{
  "task": { /* TaskItem 객체 */ },
  "includeCode": true,
  "includeDiagram": true
}
```

### POST `/api/export-pdf`
PDF 내보내기 및 이메일 전송

**요청 본문:**
```json
{
  "result": { /* AnalysisResult 객체 */ },
  "email": "user@example.com",
  "options": {
    "includeTasks": true,
    "includeRecipes": true,
    "includeCode": true
  }
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "sentAt": "2024-01-01T00:00:00.000Z",
    "message": "PDF sent successfully"
  }
}
```

## 🎨 커스터마이징

### 테마 변경
`src/app/globals.css`에서 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다.

### LLM 모델 변경
`src/lib/llmClient.ts`에서 프롬프트와 모델 설정을 수정할 수 있습니다.

### 평가 기준 조정
`src/lib/scoring.ts`에서 가중치와 평가 기준을 조정할 수 있습니다.

## 🚀 배포

### Vercel 배포 (권장)

1. **Vercel 계정 생성**: [vercel.com](https://vercel.com)에서 계정 생성

2. **프로젝트 연결**:
   ```bash
   npx vercel
   ```

3. **환경 변수 설정**:
   - Vercel 대시보드에서 프로젝트 선택
   - Settings > Environment Variables에서 환경 변수 추가

4. **배포**:
   ```bash
   git push origin main
   ```

### Docker 배포

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 기타 플랫폼
- **Netlify**: `netlify.toml` 설정 파일 추가
- **Railway**: GitHub 연결 후 자동 배포
- **AWS Amplify**: Git 저장소 연결

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🆘 문제 해결

### 자주 묻는 질문

**Q: 분석이 실패하는 경우는?**
A: JD 텍스트가 너무 짧거나, LLM API 키가 설정되지 않은 경우입니다.

**Q: PDF 파일을 업로드할 수 없나요?**
A: 현재 클라이언트에서 PDF 파싱은 지원하지 않습니다. 서버에서 처리되도록 구현 예정입니다.

**Q: 분석 결과를 저장할 수 있나요?**
A: 현재는 브라우저 로컬 스토리지만 지원합니다. 서버 저장 기능은 옵션으로 제공 예정입니다.

### 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/jd-automation/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/your-username/jd-automation/discussions)
- **이메일**: support@jd-automation.com

## 🙏 감사의 말

- [OpenAI](https://openai.com) - GPT-4 API
- [Anthropic](https://anthropic.com) - Claude API
- [Vercel](https://vercel.com) - 배포 플랫폼
- [Tailwind CSS](https://tailwindcss.com) - CSS 프레임워크
- [shadcn/ui](https://ui.shadcn.com) - UI 컴포넌트

---

**JD 자동화 분석기**로 업무 효율성을 높여보세요! 🚀

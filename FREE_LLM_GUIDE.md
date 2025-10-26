# 무료 LLM API 가이드

## 🎯 비용 무료 LLM 서비스

### 1. Together AI ⭐ 가장 추천
- **무료 할당량**: 월 $25 (충분함)
- **모델**: Meta Llama 3, Mistral, Mixtral 등
- **장점**: 강력한 모델, 빠른 응답
- **가격**: 월 $25 무료 크레딧
- **링크**: https://api.together.xyz
- **실행**: 테스트 가능

### 2. Google Gemini (구 Bard) ⭐ 무료
- **무료 할당량**: 월 15 RPM (요청/분)
- **모델**: Gemini Pro 1.5
- **장점**: Google 서비스, 안정적
- **가격**: 완전 무료 (비교적 제한적)
- **링크**: https://aistudio.google.com/apikey
- **실행**: 월별 제한

### 3. Hugging Face Inference API
- **무료 할당량**: 월 30만 토큰
- **모델**: 다양한 오픈소스 모델
- **장점**: 다양한 모델 선택
- **가격**: 완전 무료
- **링크**: https://huggingface.co/inference-api
- **실행**: 보통

### 4. Cohere
- **무료 할당량**: 월 100 API 호출
- **모델**: Command, Command-Light
- **장점**: 빠른 응답
- **가격**: 무료 티어
- **링크**: https://cohere.com
- **실행**: 보통

### 5. Groq ⭐ 빠름
- **무료 할당량**: 월 14,400 요청
- **모델**: Llama 3, Mixtral 8x7B
- **장점**: 매우 빠름 (초당 처리)
- **가격**: 완전 무료 (제한적)
- **링크**: https://console.groq.com
- **실행**: 테스트 가능

### 6. Replicate
- **무료 할당량**: 지속적 크레딧 충전
- **모델**: 다양한 오픈소스
- **장점**: 모델 다양성, API 심플
- **가격**: 유료(크레딧)
- **링크**: https://replicate.com

## 📊 비교표

| 서비스 | 무료 할당량 | 속도 | 품질 | 추천도 |
|--------|------------|------|------|--------|
| Together AI | ★★★★★ | ⚡⚡⚡⚡ | ★★★★★ | ⭐⭐⭐⭐⭐ |
| Google Gemini | ★★★☆☆ | ⚡⚡⚡ | ★★★★★ | ⭐⭐⭐⭐ |
| Groq | ★★★★★ | ⚡⚡⚡⚡⚡ | ★★★★☆ | ⭐⭐⭐⭐ |
| Hugging Face | ★★★☆☆ | ⚡⚡ | ★★★★☆ | ⭐⭐⭐ |
| Cohere | ★★☆☆☆ | ⚡⚡⚡⚡ | ★★★★☆ | ⭐⭐ |

## 🚀 추천 순서

### 1순위: Together AI
```
장점:
- 무료 할당량 충분 ($25/월)
- 강력한 모델 (Llama 3 등)
- 빠른 응답 속도
- 안정적인 API

단점:
- 유료 티어로 전환 필요할 수 있음
- 회원가입 필요
```

### 2순위: Google Gemini
```
장점:
- Google의 안정적 서비스
- 고품질 응답
- 무료 사용 가능

단점:
- 제한적인 무료 할당량
- 속도가 다소 느릴 수 있음
```

### 3순위: Groq
```
장점:
- 매우 빠른 속도
- Llama 3 모델 사용
- 무료 할당량 충분

단점:
- 품질이 약간 낮을 수 있음
- API 제한 있음
```

## 💰 비용 대체안

### 오픈소스 모델 로컬 실행 (완전 무료)
- **모델**: Llama 3, Mistral (7B)
- **방법**: Ollama 로컬 설치
- **장점**: 완전 무료, 제한 없음
- **단점**: 서버 필요, 느릴 수 있음
- **링크**: https://ollama.com

### MongoDB Atlas Vector Search (검색 강화)
- **무료**: 512MB 스토리지
- **용도**: RAG (Retrieval-Augmented Generation)
- **장점**: 문서 검색 기능
- **링크**: https://www.mongodb.com

## 🎯 프로젝트에 맞는 추천

### JDX 프로젝트용 추천

**옵션 1: Together AI** (최우선)
```javascript
// Setup
npm install @together-ai/sdk

// 사용
const together = new TogetherAI({
  apiKey: process.env.TOGETHER_API_KEY
});

const response = await together.complete({
  model: 'meta-llama/Llama-3-70b-chat-hf',
  prompt: 'Analyze this job description...',
  max_tokens: 2048,
  temperature: 0.7
});
```

**옵션 2: Google Gemini** (안정적)
```javascript
// Setup
npm install @google/generative-ai

// 사용
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const result = await model.generateContent(prompt);
```

**옵션 3: Groq** (초고속)
```javascript
// Setup
npm install groq-sdk

// 사용
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const response = await groq.chat.completions.create({
  messages: [{ role: 'user', content: prompt }],
  model: 'llama3-8b-8192',
  temperature: 0.7
});
```

## 📝 환경 변수 설정

### .env.local 파일
```env
# Together AI
TOGETHER_API_KEY=your_together_api_key

# Google Gemini (선택)
GEMINI_API_KEY=your_gemini_api_key

# Groq (선택)
GROQ_API_KEY=your_groq_api_key
```

## 🎬 구현 가이드

### API 키 발급

**Together AI:**
1. https://api.together.xyz 접속
2. 회원가입
3. API Keys → Create Key
4. 무료 크레딧 $25 자동 충전

**Google Gemini:**
1. https://aistudio.google.com 접속
2. 로그인
3. Get API Key 클릭
4. 무료 사용 시작

**Groq:**
1. https://console.groq.com 접속
2. 회원가입
3. API Keys → Create Key
4. 무료 사용 시작

## ✅ 최종 추천

### 현재 프로젝트 (JDX Transformation)
**Together AI 추천 이유:**
1. 무료 할당량 충분 ($25/월)
2. 강력한 Llama 3 모델
3. 안정적인 API
4. 빠른 응답 시간

### 즉시 시작하기
```bash
# 1. API 키 발급
# Together AI: https://api.together.xyz

# 2. 패키지 설치
npm install @together-ai/sdk

# 3. 환경 변수 설정
TOGETHER_API_KEY=your_key

# 4. 코드 구현
# src/lib/llmClient.ts 파일 수정
```

---
**작성일**: 2024년 10월
**업데이트**: 최신 무료 LLM 서비스 정보

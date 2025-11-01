# Vercel Postgres 설정 가이드

Vercel은 SQLite를 지원하지 않으므로 PostgreSQL 데이터베이스가 필요합니다. Vercel Postgres를 사용하는 것이 가장 간단합니다.

## 방법 1: Vercel Postgres 사용 (권장)

### Step 1: Vercel Postgres 생성

1. Vercel 대시보드 → 프로젝트 선택
2. **Storage** 탭 클릭
3. **Create Database** 클릭
4. **Postgres** 선택
5. 데이터베이스 이름 입력 (예: `jdx-db`)
6. **Create** 클릭

### Step 2: DATABASE_URL 자동 설정

Vercel Postgres를 생성하면 자동으로 `DATABASE_URL` 환경 변수가 설정됩니다.

- Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
- `DATABASE_URL` 확인 (자동으로 생성됨)
- 형식: `postgres://default:password@host.region.postgres.vercel-storage.com:5432/verceldb`

### Step 3: 데이터베이스 마이그레이션

로컬에서 마이그레이션 실행:

```bash
npx prisma migrate deploy
```

또는 Vercel이 자동으로 `prisma generate`를 실행하지만, 마이그레이션은 수동으로 실행해야 할 수 있습니다.

### Step 4: Vercel에서 마이그레이션 실행

1. Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
2. `DATABASE_URL`이 설정되어 있는지 확인
3. **Deployments** 탭 → **Redeploy**

또는 터미널에서:

```bash
npx prisma migrate deploy
```

### Step 5: Prisma Studio로 확인 (선택사항)

로컬에서 데이터베이스 확인:

```bash
npx prisma studio
```

---

## 방법 2: 무료 PostgreSQL 서비스 사용

### Option A: Supabase (무료)

1. https://supabase.com 접속 및 회원가입
2. **New Project** 생성
3. **Settings** → **Database** → **Connection string** 복사
4. Vercel → **Settings** → **Environment Variables** → `DATABASE_URL` 추가

### Option B: Neon (무료)

1. https://neon.tech 접속 및 회원가입
2. **Create Project** 클릭
3. **Connection String** 복사
4. Vercel → **Settings** → **Environment Variables** → `DATABASE_URL` 추가

### Option C: Railway (무료 크레딧)

1. https://railway.app 접속 및 회원가입
2. **New Project** → **PostgreSQL** 선택
3. **Variables** 탭 → `DATABASE_URL` 복사
4. Vercel → **Settings** → **Environment Variables** → `DATABASE_URL` 추가

---

## 문제 해결

### 에러: "Environment variable not found: DATABASE_URL"

**해결:**
1. Vercel → **Settings** → **Environment Variables** 확인
2. `DATABASE_URL`이 있는지 확인
3. 모든 환경 (Production, Preview, Development)에 설정되었는지 확인
4. 재배포

### 에러: "P1001: Can't reach database server"

**해결:**
1. `DATABASE_URL` 형식 확인 (올바른 PostgreSQL 연결 문자열)
2. 데이터베이스 서버가 실행 중인지 확인
3. 방화벽/IP 제한 확인 (일부 서비스는 IP 화이트리스트 필요)

### 에러: "P1000: Authentication failed"

**해결:**
1. 데이터베이스 비밀번호 확인
2. 연결 문자열의 사용자명/비밀번호 확인
3. 데이터베이스 재생성 후 새로운 연결 문자열 사용

---

## 로컬 개발 설정

로컬에서 개발하려면:

1. PostgreSQL 설치 또는 Docker 사용
2. `.env.local` 파일 생성:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/jdx_db?schema=public
```

3. 마이그레이션 실행:

```bash
npx prisma migrate dev
```

---

## 다음 단계

1. ✅ Prisma 스키마를 PostgreSQL로 변경 (완료)
2. ⏳ Vercel Postgres 생성 또는 다른 PostgreSQL 서비스 사용
3. ⏳ Vercel에 `DATABASE_URL` 환경 변수 설정
4. ⏳ 재배포
5. ⏳ 회원가입 테스트



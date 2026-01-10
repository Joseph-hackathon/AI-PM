# Vercel 배포 오류 해결 가이드

## 문제: `cd frontend && npm install` 오류

Vercel에서 배포 시 `Error: Command "cd frontend && npm install" exited with 1` 또는 `sh: line 1: cd: frontend: No such file or directory` 오류가 발생하는 경우:

## 해결 방법

### 방법 1: Vercel 대시보드에서 설정 (필수)

1. **Vercel 대시보드**에서 프로젝트 선택
2. **Settings** → **General** 이동
3. **Root Directory** 섹션:
   - "Override" 클릭
   - `frontend` 입력
   - **Save** 클릭
4. **Build & Development Settings** 섹션:
   - **Build Command**: `npm run build` (또는 비워두기 - 자동 감지)
   - **Output Directory**: `.next` (또는 비워두기 - 자동 감지)
   - **Install Command**: `npm install` (또는 비워두기 - 자동 감지)
   - **Development Command**: `npm run dev` (또는 비워두기 - 자동 감지)
   - **Save** 클릭

### 방법 2: frontend/vercel.json 파일 사용 (권장)

`frontend/vercel.json` 파일이 이미 생성되어 있습니다. 이 파일은 Vercel이 올바른 빌드 명령을 사용하도록 보장합니다.

**중요**: 
- Vercel 대시보드에서 **Root Directory를 `frontend`로 설정**해야 합니다.
- Root Directory를 설정하면 Vercel은 자동으로 `frontend` 디렉토리에서 작업을 시작하므로 `cd frontend` 명령이 필요 없습니다.

## 확인 사항

1. ✅ `frontend/package.json` 파일이 존재하는지 확인
2. ✅ `frontend/package.json`에 모든 필수 의존성이 있는지 확인
3. ✅ Vercel 대시보드에서 Root Directory가 `frontend`로 설정되어 있는지 확인
4. ✅ 환경 변수 `OPENAI_API_KEY`가 설정되어 있는지 확인

## 배포 후 확인

배포가 성공하면 다음을 확인하세요:

1. 빌드 로그에 오류가 없는지 확인
2. 배포된 URL에서 애플리케이션이 정상 작동하는지 확인
3. API 엔드포인트가 정상 작동하는지 확인 (`/api/health` 등)

## 추가 문제 해결

### npm install 실패

만약 npm install이 실패한다면:

1. `frontend/package-lock.json` 파일을 삭제하고 다시 생성
2. Node.js 버전 확인 (Vercel 대시보드에서 Node.js 버전 설정)
3. 의존성 충돌 확인

### 빌드 실패

빌드가 실패한다면:

1. TypeScript 오류 확인
2. 환경 변수 확인
3. Next.js 설정 확인 (`frontend/next.config.js`)

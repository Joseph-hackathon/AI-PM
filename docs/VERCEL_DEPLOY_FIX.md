# Vercel 배포 오류 해결: "cd frontend: No such file or directory"

## 문제

Vercel 배포 시 다음 오류가 발생하는 경우:
```
sh: line 1: cd: frontend: No such file or directory
Error: Command "cd frontend && npm install" exited with 1
```

## 원인

Vercel 대시보드의 **Build Command**에 `cd frontend && npm install`이 명시적으로 설정되어 있지만, **Root Directory**가 `frontend`로 설정되어 있으면 Vercel은 이미 `frontend` 디렉토리에서 작업을 시작하므로 `cd frontend` 명령이 실패합니다.

## 해결 방법

### 1단계: Root Directory 설정 확인

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **General** 이동
3. **Root Directory** 섹션 확인:
   - "Override"가 활성화되어 있고 `frontend`로 설정되어 있는지 확인
   - 설정되어 있지 않다면:
     - "Override" 클릭
     - `frontend` 입력
     - **Save** 클릭

### 2단계: Build Command 수정 (중요!)

1. **Settings** → **Build & Development Settings** 이동
2. **Build Command** 필드 확인:
   - ❌ **잘못된 설정**: `cd frontend && npm install && npm run build`
   - ✅ **올바른 설정**: 비워두기 (자동 감지) 또는 `npm run build`
3. **Install Command** 필드 확인:
   - ❌ **잘못된 설정**: `cd frontend && npm install`
   - ✅ **올바른 설정**: 비워두기 (자동 감지) 또는 `npm install`
4. **Output Directory** 필드 확인:
   - ✅ `.next` 또는 비워두기 (자동 감지)
5. **Development Command** 필드 확인:
   - ✅ `npm run dev` 또는 비워두기 (자동 감지)
6. **Save** 클릭

### 3단계: 재배포

1. **Deployments** 탭으로 이동
2. 최신 배포 옆의 **"..."** 메뉴 클릭
3. **Redeploy** 선택
4. 또는 새 커밋을 푸시하면 자동으로 재배포됩니다

## 올바른 설정 요약

Root Directory가 `frontend`로 설정되어 있을 때:

| 설정 항목 | 값 |
|---------|-----|
| Root Directory | `frontend` |
| Build Command | (비워두기) 또는 `npm run build` |
| Install Command | (비워두기) 또는 `npm install` |
| Output Directory | `.next` 또는 (비워두기) |
| Development Command | `npm run dev` 또는 (비워두기) |

**중요**: Root Directory가 `frontend`로 설정되어 있으면, 모든 명령은 이미 `frontend` 디렉토리에서 실행되므로 `cd frontend`가 필요 없습니다!

## 확인 사항

- ✅ Root Directory가 `frontend`로 설정되어 있는지
- ✅ Build Command에 `cd frontend`가 포함되어 있지 않은지
- ✅ Install Command에 `cd frontend`가 포함되어 있지 않은지
- ✅ `frontend/package.json` 파일이 존재하는지
- ✅ 환경 변수 `OPENAI_API_KEY`가 설정되어 있는지

## 추가 도움말

여전히 문제가 발생하면:
1. Vercel 대시보드의 빌드 로그 전체를 확인
2. Root Directory 설정을 한 번 제거하고 다시 설정
3. Build Command를 완전히 비워두고 Vercel이 자동으로 감지하도록 함

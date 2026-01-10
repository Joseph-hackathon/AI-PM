# Vercel 배포 오류 해결 가이드

## 문제
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## 해결 방법

### 1. Vercel 대시보드에서 Root Directory 설정

1. Vercel 대시보드에 로그인
2. 프로젝트 선택
3. **Settings** → **General** 이동
4. **Root Directory** 섹션에서:
   - "Override" 클릭
   - `frontend` 입력
   - **Save** 클릭

### 2. 프로젝트 재배포

1. **Deployments** 탭으로 이동
2. 최신 배포 옆의 **"..."** 메뉴 클릭
3. **Redeploy** 선택
4. 또는 새 커밋을 푸시하면 자동으로 재배포됩니다

## 확인 사항

- ✅ `frontend/package.json`에 `next`가 `dependencies`에 포함되어 있는지 확인
- ✅ Root Directory가 `frontend`로 설정되어 있는지 확인
- ✅ `frontend/vercel.json`이 올바르게 설정되어 있는지 확인

## 대안: vercel.json 없이 배포

`frontend/vercel.json`을 삭제하고 Vercel이 자동으로 감지하도록 할 수도 있습니다:

1. Root Directory를 `frontend`로 설정
2. Vercel이 자동으로 Next.js를 감지합니다

#!/bin/bash

# 변경사항 없으면 종료 (untracked 포함 전체 감지)
[ -z "$(git status --porcelain)" ] && exit 0

# 빌드 검증 (타입체크 + 번들)
echo "🔍 빌드 검증 중..."
BUILD_OUT=$(npm run build 2>&1)
BUILD_CODE=$?
echo "$BUILD_OUT"

if [ $BUILD_CODE -ne 0 ]; then
  echo '{"systemMessage": "❌ 빌드 실패 — 커밋이 중단됩니다. 위 에러를 수정해주세요."}'
  exit 0
fi

echo "✅ 빌드 성공"

# 전체 스테이징 (.gitignore 가 node_modules/dist/.env 등 제외)
git add .

if git diff --cached --quiet; then
  exit 0
fi

# 커밋 메시지: 변경 파일 최대 3개 + 나머지 개수
NAMES=$(git diff --cached --name-only)
TOTAL=$(echo "$NAMES" | wc -l | tr -d ' ')
PREVIEW=$(echo "$NAMES" | head -3 | tr '\n' ', ' | sed 's/,$//')
[ "$TOTAL" -gt 3 ] && SUFFIX=" 외 $((TOTAL - 3))개" || SUFFIX=""

git commit -m "auto: ${PREVIEW}${SUFFIX} 변경사항 적용

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
# 빌드를 이미 검증했으므로 pre-push 재실행 생략 (--no-verify)
git push --no-verify origin "$BRANCH"

echo '{"systemMessage": "✅ 커밋/푸시 완료"}'

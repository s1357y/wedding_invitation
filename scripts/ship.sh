#!/bin/bash
set -e

MESSAGE="${1:-chore: update}"

echo "🔍 빌드 및 타입 검증 중..."
npm run build

echo ""
echo "📦 변경사항 확인 중..."
git add .

if git diff --cached --quiet; then
  echo "✅ 커밋할 변경사항이 없습니다."
  exit 0
fi

echo ""
echo "📝 변경된 파일:"
git diff --cached --name-only

echo ""
echo "💾 커밋 중..."
git commit -m "$MESSAGE

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

echo ""
echo "🚀 푸시 중..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push origin "$CURRENT_BRANCH"

# main이 아닌 브랜치면 main에도 머지 후 푸시
if [ "$CURRENT_BRANCH" != "main" ]; then
  git checkout main
  git merge "$CURRENT_BRANCH" --no-edit
  git push origin main
  git checkout "$CURRENT_BRANCH"
fi

echo ""
echo "✅ 완료! 배포가 시작됩니다."

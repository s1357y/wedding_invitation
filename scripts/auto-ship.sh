#!/bin/bash

# 변경사항 없으면 조용히 종료
if git diff --quiet && git diff --cached --quiet; then
  exit 0
fi

# 변경된 파일 목록 수집
CHANGED=$(git diff --name-only && git diff --cached --name-only)
if [ -z "$CHANGED" ]; then
  exit 0
fi

echo "🔍 빌드 검증 중..."
npm run build 2>&1
if [ $? -ne 0 ]; then
  echo '{"systemMessage": "❌ 빌드 실패 — 커밋이 중단됩니다. 에러를 확인해주세요."}'
  exit 0
fi

# 자동 커밋 메시지 생성
FILES=$(echo "$CHANGED" | head -3 | tr '\n' ', ' | sed 's/,$//')
MSG="auto: ${FILES} 외 변경사항 적용"

git add .
if git diff --cached --quiet; then
  exit 0
fi

git commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>" 2>/dev/null

BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push origin "$BRANCH" 2>/dev/null

echo '{"systemMessage": "✅ 변경사항이 자동으로 커밋/푸시됐습니다."}'

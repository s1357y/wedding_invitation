# Fullstack Web App Harness

풀스택 웹앱의 요구사항→설계→프론트엔드→백엔드→테스트→배포를 에이전트 팀이 협업하여 개발하는 하네스.

## 구조

```
.claude/
├── agents/
│   ├── architect.md             — 시스템 설계 (요구사항 분석, 아키텍처, DB 모델링, API 설계)
│   ├── frontend-dev.md          — 프론트엔드 개발 (React/Next.js, UI 컴포넌트, 상태관리)
│   ├── backend-dev.md           — 백엔드 개발 (API 구현, DB, 인증, 비즈니스 로직)
│   ├── qa-engineer.md           — QA 엔지니어 (테스트 전략, 단위/통합/E2E 테스트)
│   └── devops-engineer.md       — DevOps 엔지니어 (CI/CD, 인프라, 배포, 모니터링)
├── skills/
│   ├── fullstack-webapp/
│   │   └── skill.md             — 오케스트레이터 (팀 조율, 워크플로우, 에러핸들링)
│   ├── component-patterns/
│   │   └── skill.md             — 프론트엔드 확장 (React 패턴, 상태관리, 폴더 구조)
│   └── api-security-checklist/
│       └── skill.md             — 백엔드 확장 (OWASP Top 10, 인증/인가, 보안 헤더)
└── CLAUDE.md                    — 이 파일
```

## 사용법

`/fullstack-webapp` 스킬을 트리거하거나, "웹앱 만들어줘" 같은 자연어로 요청한다.

## 산출물

모든 산출물은 프로젝트 루트에 직접 생성된다:
- `_workspace/00_input.md` — 사용자 입력 정리
- `_workspace/01_architecture.md` — 아키텍처 설계 문서
- `_workspace/02_api_spec.md` — API 명세
- `_workspace/03_db_schema.md` — DB 스키마
- `_workspace/04_test_plan.md` — 테스트 계획
- `_workspace/05_deploy_guide.md` — 배포 가이드
- `_workspace/06_review_report.md` — 리뷰 보고서
- `src/` — 소스 코드 (프론트엔드 + 백엔드)

---

## ⚠️ 필수 워크플로우 — 모든 구현 태스크에 반드시 적용

사용자가 기능 추가, 버그 수정, 리팩토링 등 **코드 변경을 수반하는 모든 태스크**를 요청하면
"계획해줘"라는 명시가 없어도 아래 단계를 순서대로 **자동으로** 실행한다.

### 예외 — 하네스 없이 바로 수정 가능한 경우

아래 조건을 **모두** 충족할 때는 플랜 작성·Codex 검증 없이 즉시 수정한다:

1. **단일 파일, 5줄 이하** 변경으로 완결되는 작업
2. **의도가 명확**하여 설계 판단이 필요 없는 작업 (오타 수정, 설정값 변경, 누락된 임포트 추가 등)
3. **새 로직·새 모듈 없음** — 기존 코드의 단순 수치·문자열 수정에 한함

위 조건 중 하나라도 불확실하면 하네스를 따른다.

---

### Phase 1: 플랜 작성 + Codex 검증 (최대 3회 왕복)

**Step 1-A** — 플랜 파일 작성
파일명 형식: `PLAN_YYYYMMDD_<태스크명>.md` (예: `PLAN_20260615_auth_refactor.md`)
태스크 내용을 분석하고 위 형식으로 플랜 파일을 새로 생성한다. 포함 항목:
- 목표 요약 (2~3문장)
- 생성/수정할 파일 목록 (각 파일의 역할)
- 구현 순서 (단계별)
- 테스트 전략
- 엣지 케이스 및 에러 처리 방침

**⚠️ 인코딩 주의**: 플랜 파일은 반드시 **PowerShell `Set-Content -Encoding utf8`** 로 저장한다.
Write 도구나 Bash `cat >`는 UTF-8 BOM 없이 저장하여 Codex가 한글을 읽지 못한다.
```powershell
Set-Content -Path "PLAN_YYYYMMDD_태스크명.md" -Encoding utf8 -Value @'
(플랜 내용)
'@
```

**Step 1-B** — Codex 플랜 검증
Bash 도구로 아래 명령을 **백그라운드(`run_in_background: true`)** 로 실행한다.
```
codex exec --dangerously-bypass-approvals-and-sandbox "<플랜파일>를 검토해라. (1) 목표가 2~3문장으로 명확한지, (2) 생성/수정 파일 목록이 구체적인지, (3) 구현 순서가 논리적인지, (4) 테스트 전략이 명시됐는지만 확인해라. 코드 버그나 보안 이슈는 확인하지 않아도 된다 — 아직 코드가 없는 단계다. 반드시 첫 줄을 APPROVED 또는 REJECTED: 로 시작해라." 2>&1 | tee codex_review_out.txt
```
완료 알림이 오면 `codex_review_out.txt`를 읽어 **파일 전체 내용을 사용자에게 출력한다.**

**Step 1-C** — 결과에 따른 분기:
- **APPROVED**: Phase 2로 진행
- **REJECTED**: Codex가 지적한 문제를 반영해 플랜 파일을 수정하고 Step 1-B를 재실행
- **최대 3회** 왕복 후에도 REJECTED면 **사용자에게 남은 이슈를 보고하고 진행 여부를 물어본다** (자동 진행 금지)

---

### Phase 2: 구현 + Codex 검증 (최대 3회 왕복)

**Step 2-A** — 구현
플랜 파일의 내용을 그대로 따라 구현한다. 완료 후 프로젝트 테스트 명령을 실행한다.

**Step 2-B** — Codex 구현 검증
`review --uncommitted`는 미커밋 전체를 스캔하여 Phase가 쌓일수록 분석 시간이 폭증한다.
대신 **플랜 파일의 파일 목록만 대상**으로 검토한다.

1. 플랜 파일에서 "생성/수정할 파일 목록"을 읽어 파일 경로 목록을 추출한다.
2. Bash 도구로 아래 명령을 **백그라운드(`run_in_background: true`)** 로 실행한다.
```
codex exec --dangerously-bypass-approvals-and-sandbox "다음 파일들만 검토해라: <파일목록>. 확인 항목: (1) 플랜 파일에 명시된 파일이 모두 존재하는지, (2) 하드코딩된 시크릿·자격증명이 없는지, (3) 새 모듈마다 테스트 파일이 작성됐는지. 논리적 버그 탐색은 범위 밖이다 — 플랜 준수 여부만 판단해라. 반드시 첫 줄을 APPROVED 또는 REJECTED: 로 시작해라." 2>&1 | tee codex_review_out.txt
```
완료 알림이 오면 `codex_review_out.txt`를 읽어 **파일 전체 내용을 사용자에게 출력한다.**

**Step 2-C** — 결과에 따른 분기:
- **APPROVED**: 작업 완료. 사용자에게 완료 보고
- **REJECTED**: Codex가 지적한 문제를 수정하고 Step 2-B를 재실행
- **최대 3회** 왕복 후에도 REJECTED면 **사용자에게 남은 이슈를 보고하고 대기한다** (자동 진행 금지)

---

### 워크플로우 요약

```
사용자 태스크 입력
  └─ [Phase 1] PLAN_YYYYMMDD_<태스크명>.md 작성
        └─ Codex 검증 → APPROVED? → [Phase 2] 구현
              └─ (REJECTED 시 최대 3회 재시도)         └─ Codex 검증 → APPROVED → 완료
                                                              └─ (REJECTED 시 최대 3회 재시도)
```

---

### 임시 파일 (커밋 금지)

- `PLAN_*.md` — 태스크별 플랜 파일 (`.gitignore`에 추가)
- `codex_review_out.txt` — Codex 검토 결과 (`.gitignore`에 추가)

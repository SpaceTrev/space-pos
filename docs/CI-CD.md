# ⚙️ CI/CD Overview

## ✅ Lint, Typecheck, Format

- GitHub Actions validate every PR
- Pre-push Git hook runs `pnpm lint && pnpm typecheck`

## 🔁 Dependabot

- Safe updates auto-merged
- Major updates PR to `dependabot/breaking-changes`
- `pnpm sync:deps-branch` keeps that branch in sync with `main`

## 🔐 Secrets

- Stored in AWS Secrets Manager and `.env` files
- Auto-uploaded by `pnpm secrets:upload`

## 🔄 Deploy

- Vercel preview deploys per app (`webstore`, `admin`, `pos`)
- Post-deploy smoke tests validate URLs
- Revert workflow auto-pushes rollback if deployment fails

## 📦 Release

- Use `pnpm changeset` to version
- `git push && git tag vX.Y.Z` triggers:
  - Changelog generation
  - GitHub release creation
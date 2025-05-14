# 👨‍💻 Local Development

## 🛠 Setup

```bash
pnpm install
pnpm infra:setup     # optional Terraform bootstrap
pnpm dev --filter=webstore-meaty-mexico
```

## 🧪 Local Testing

```bash
pnpm test            # unit tests
pnpm test:ui         # visual tests
pnpm lint && pnpm typecheck
```

## 🧼 Useful Scripts

- `pnpm sync:deps-branch` – sync `main → dependabot/breaking-changes`
- `pnpm changelog` – generate `CHANGELOG.md`
- `pnpm i18n:check` – validate translations

## 🧪 Dev UX

- Tenant Dev Portal at `apps/dev-portal`
- Theme + locale preview planned
- CLI: `pnpm create-pos-platform webstore your-tenant`
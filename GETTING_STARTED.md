# 🚧 Getting Started with `space-pos`

This guide walks you through running the platform locally for development.

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (v8+)
- [Git](https://git-scm.com/)
- Optional: Docker (if using local databases)

---

## 📦 Install Dependencies

```bash
corepack enable
pnpm install
```

---

## 🗂️ Project Structure Overview

```
apps/
  admin/     → Internal admin panel
  pos/       → In-store POS app
  web/       → White-labeled customer webstore
  docs/      → MDX-powered documentation site

packages/
  platform/  → Core logic for webstore, admin, pos
  ui/        → Shared design system components
  config/    → Tenant configurations and tokens
  cli/       → Scaffolding tool (create-tenant apps)
```

---

## 🛠️ Run Any App

You can run any app like so:

### Admin Panel

```bash
pnpm dev --filter=admin
```

### POS

```bash
pnpm dev --filter=pos
```

### Webstore (default tenant)

```bash
pnpm dev --filter=webstore-meaty-mexico
```

> If you haven't scaffolded a tenant yet:
```bash
pnpm create-pos-platform webstore meaty-mexico --with-config
```

---

## 📚 Run the Docs Site

```bash
pnpm dev --filter=docs
```

Open [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📖 Run Storybook

From the `@platform/ui` package:

```bash
cd packages/ui
pnpm storybook
```

---

## 🧪 Dev Tips

- Use `make dev` or `make webstore` for shorthand commands
- Use `.env.example` to create a working `.env` file
- You can live preview tokens/themes in the `/docs/theme` route

---

## ✅ Next Steps

- Connect AWS Cognito and DB locally
- Run `pnpm changeset` to version/publish packages
- Deploy via GitHub Actions or Amplify

---
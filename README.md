# 🧠 POS Platform Starter – Developer Docs

A scalable, white-labeled Point of Sale + Webstore + Admin system built for exotic meat stores and beyond.

This monorepo supports multi-tenant setups, theme + locale injection, automated onboarding, and rapid deployments — making it ideal for SaaS-style distribution or internal tooling.

---

## 🚀 Tech Stack Overview

| Layer           | Tech                                              |
|-----------------|---------------------------------------------------|
| Frontend        | React, Next.js, Tailwind, ShadCN UI, Storybook    |
| Backend/API     | Express, Node.js, PostgreSQL, Prisma              |
| Auth            | AWS Cognito (guest + user auth, multitenant)      |
| Infra           | Terraform, Docker, AWS (Cognito, RDS, S3)         |
| CI/CD           | GitHub Actions, TurboRepo, Changesets             |
| Developer UX    | CLI Tooling, Tenant Dev Portal, Local seed flows  |
| Testing         | Vitest, Playwright, Visual Snapshots              |
| Docs            | MDX-based docs, Storybook, API Contracts          |

---

## 📦 What’s Included

- 🧱 **Multi-Tenant Webstore** with checkout + theming
- 🛒 **POS Interface** built for in-store touchscreen use
- 🧑‍💼 **Admin Dashboard** for managing users, inventory, orders
- 🧪 **Storybook + Unit Tests + Snapshot Tests**
- 🧰 **CLI Tool** for onboarding tenants, pushing starter repos, and registering with the platform
- 🔐 **Cognito Auth** (optional guest fallback)
- 🌐 **Stripe Integration** for payments (Apple/Google Pay ready)
- 📡 **Terraform-managed Infra** (Postgres, Cognito, Secrets, Deploy Targets)
- 🚀 **Automated CI/CD**, Dependabot, Release/Versioning flows

---

## 🧩 Getting Started

```bash
pnpm install
pnpm setup
pnpm dev --filter=webstore
```

> See `/docs/internal/` for full API, schema, and tenant onboarding docs.

To onboard a new tenant:
```bash
pnpm exec create-tenant
```

---

## 🛠 Deployment Notes

- GitHub Deployments, Preview URLs, and optional repo generation are built-in.
- Configure `.env.tenants/{tenant}.env` for isolated secrets.
- Trigger deploys via GitHub Actions or the API directly.

---

## 🤝 Contributions

If you're working on the platform itself (not as a tenant), see:

- `DEPLOYMENT.md`
- `DEVELOPING.md`
- `docs/internal/*`
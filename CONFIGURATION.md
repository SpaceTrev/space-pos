# 🛠️ Configuration Guide for `pos-platform-starter`

This guide explains how to configure tenants for your white-labeled POS, Webstore, and Admin apps.

---

## 📦 Project Structure

Your project uses a **modular monorepo** setup with the following structure:

```
apps/
  web/       ← consumes @platform/webstore
  pos/       ← consumes @platform/pos
  admin/     ← consumes @platform/admin

packages/
  platform/
    webstore/
    pos/
    admin/
  config/
    tenants/
      meaty-mexico.ts   ← individual tenant configs
```

---

## 🔧 How to Configure a Tenant

Each tenant has a config file located at:

```
packages/config/tenants/<tenantId>.ts
```

### Example: `meaty-mexico.ts`
```ts
export default {
  tenantId: 'meaty-mexico',
  theme: 'dark',
  locale: 'es-MX',
  logoUrl: '/logos/meaty.png',
  features: {
    delivery: true,
    loyalty: false
  }
};
```

---

## 📲 Using Tenant Config in Your Apps

Each app (webstore, pos, admin) imports a config and wraps its component:

### Example: `apps/web/pages/index.tsx`
```tsx
import tenantConfig from '@platform/config/tenants/meaty-mexico';
import { WebstoreApp, createWebstoreConfig } from '@platform/webstore';

const config = createWebstoreConfig(tenantConfig);

export default function Web() {
  return <WebstoreApp config={config} />;
}
```

You can follow a similar pattern in:
- `apps/pos/pages/index.tsx`
- `apps/admin/pages/index.tsx`

---

## 🧩 What Can Be Configured?

| Key         | Type     | Description                              |
|-------------|----------|------------------------------------------|
| tenantId    | string   | Unique ID for tenant                     |
| theme       | string   | UI theme variant                         |
| locale      | string   | Language setting                         |
| logoUrl     | string   | URL to logo for branding                 |
| features    | object   | Feature flags (e.g., delivery, loyalty)  |

---

## 🏷️ Add a New Tenant

1. Duplicate an existing config file:
   ```
   cp packages/config/tenants/meaty-mexico.ts packages/config/tenants/new-tenant.ts
   ```
2. Update the fields for the new tenant.
3. Change the import in your app entrypoint.

---

## 🌐 White-label Usage

Each app can be deployed:
- Independently: `store.tenant.com`, `admin.tenant.com`, `pos.tenant.com`
- Or as a bundled suite
- Each will load and reflect its own config on startup
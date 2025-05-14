# 🚀 Deployment Guide for `space-pos`

This guide will help you publish this monorepo to GitHub as a private repo, configure GitHub Packages for NPM, scaffold a tenant webstore, and deploy to AWS or Vercel.

---

## ✅ STEP 1: Upload to GitHub as a Private Repo

1. Unzip this project and navigate into the directory:
   ```bash
   cd space-pos
   ```

2. Initialize Git and push to GitHub:
   ```bash
   git init
   git remote add origin git@github.com:your-org/space-pos.git
   git checkout -b main
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

3. On GitHub:
   - Mark the repo as **Private**
   - Enable **GitHub Packages** in Settings

---

## ✅ STEP 2: Enable GitHub Packages for Private Publishing

### `.npmrc` setup (root-level):
```bash
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@your-org:registry=https://npm.pkg.github.com/
```

### Create a GitHub Personal Access Token:
- Go to https://github.com/settings/tokens
- Enable scopes: `read:packages`, `write:packages`, `repo`

---

## ✅ STEP 3: Scaffold a Webstore App

Use the built-in CLI:

```bash
pnpm create-pos-platform webstore meaty-mexico --with-config
```

- This creates: `apps/webstore-meaty-mexico/`
- You can deploy it or run locally with:
  ```bash
  pnpm dev --filter=webstore-meaty-mexico
  ```

---

## ✅ STEP 4: Publish Platform Packages

Run the following:

```bash
pnpm build
pnpm changeset version
pnpm changeset publish
```

This publishes `@platform/webstore`, `@platform/ui`, etc., to GitHub Packages.

---

## ✅ STEP 5: Deploy the Webstore App

### Option A: AWS Amplify

1. Go to [Amplify Console](https://console.aws.amazon.com/amplify/)
2. Connect GitHub and select branch
3. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - corepack enable
           - pnpm install
       build:
         commands:
           - pnpm turbo run build --filter=webstore-meaty-mexico
     artifacts:
       baseDirectory: apps/webstore-meaty-mexico/.next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```

### Option B: Vercel (Recommended for Next.js)

1. Create a project
2. Import from GitHub → set root as `apps/webstore-meaty-mexico`
3. Build Command: `pnpm build --filter=webstore-meaty-mexico`
4. Output Dir: `.next`

Add `GITHUB_TOKEN` and `.npmrc` in project settings.

### Option C: S3 + CloudFront

1. Run:
   ```bash
   pnpm build
   pnpm export --filter=webstore-meaty-mexico
   ```
2. Upload to S3
3. Serve via CloudFront

---

## ✅ STEP 6: Consume Packages in Other Projects

Install platform packages in another repo or frontend:

```bash
npm install @your-org/webstore --registry=https://npm.pkg.github.com/
```

Ensure:
- `.npmrc` is present
- GitHub PAT is available as `NPM_TOKEN`

---

## ✅ Checklist

| Task | ✅ |
|------|----|
| Upload to GitHub | ✅ |
| Configure `.npmrc` | ✅ |
| Scaffold tenant app | ✅ |
| Publish packages | ✅ |
| Deploy app | ✅ |
| Use packages via npm | ✅ |
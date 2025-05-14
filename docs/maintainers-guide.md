# 📦 Maintainers Guide – Publishing & Deployments

This guide walks you through publishing platform packages and deploying documentation.

---

## 1. Publishing Packages to GitHub Packages

### Step 1. Authenticate with GitHub Packages

```bash
npm login --registry=https://npm.pkg.github.com
```

Use your GitHub credentials and a Personal Access Token (PAT) with:

- `write:packages`
- `read:packages`
- `repo`

---

### Step 2. Version + Commit with Changesets

```bash
pnpm install
pnpm changeset version
git add .
git commit -m "chore(release): version bump"
git push origin main
```

---

### Step 3. Let GitHub Actions Do the Rest

- The `release.yml` workflow will detect changesets
- Automatically publish to GitHub Packages

You’ll find the packages at:

```
https://github.com/orgs/YOUR_ORG/packages
```

---

## 2. Deploying Docs to GitHub Pages

### Step 1. Ensure Docs Config

In `apps/docs/next.config.js`, set:

```js
module.exports = {
  output: 'export',
  basePath: '/your-repo-name',
  trailingSlash: true,
};
```

---

### Step 2. Push to Main

```bash
git add .
git commit -m "docs: update"
git push origin main
```

This will:

- Build the docs via `pnpm --filter=docs export`
- Push static output to `gh-pages` branch via GitHub Actions

---

### Step 3. Enable GitHub Pages

1. GitHub Repo → Settings → Pages
2. Source: `gh-pages` branch
3. Path: `/ (root)`

Live docs will be at:

```
https://your-username.github.io/your-repo-name/
```

---

## 3. Notes

- `.npmrc` ensures consumers pull from GitHub Packages
- Don’t forget to bump versions with `pnpm changeset` before publishing
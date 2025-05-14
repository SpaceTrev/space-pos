# 🔐 Doppler Secrets Manager Integration

To sync secrets from Doppler:

1. Install the CLI
   ```bash
   brew install dopplerhq/cli/doppler
   ```

2. Login and setup:
   ```bash
   doppler login
   doppler setup
   ```

3. Link a project/env:
   ```bash
   doppler link
   ```

4. Inject secrets into dev:
   ```bash
   doppler run -- pnpm dev --filter=api
   ```

## 🧪 For GitHub Actions

Add a GitHub Secret `DOPPLER_TOKEN` and run:

```yaml
- name: Load Doppler secrets
  run: doppler secrets download --format=env > .env
  env:
    DOPPLER_TOKEN: ${{ secrets.DOPPLER_TOKEN }}
```

More: https://docs.doppler.com/docs
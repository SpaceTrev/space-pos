# 🏗️ Infrastructure Setup via Terraform + Turbo

This project automates AWS setup (RDS, Cognito, S3) and secrets via Turbo + Terraform.

---

## 🔧 Prerequisites

- Terraform CLI installed
- AWS credentials configured (`aws configure`)
- `.env.example` to start from

---

## ✅ One-Step Infra Setup

```bash
pnpm infra:setup
```

This will:
1. Run `terraform init` and `apply`
2. Extract outputs like DB endpoint and Cognito IDs
3. Write a `.env` file locally
4. Upload secrets to AWS Secrets Manager

---

## 📜 Available Turbo + Scripts

| Command | Description |
|--------|-------------|
| `pnpm infra:init` | Terraform init |
| `pnpm infra:apply` | Terraform apply |
| `pnpm env:generate` | Create `.env` from TF outputs |
| `pnpm secrets:upload` | Push .env to AWS Secrets Manager |
| `pnpm infra:setup` | All of the above together |

---

## 📂 Secrets Storage Format

Secrets are stored in AWS Secrets Manager as:

```
pos/DATABASE_URL
pos/S3_BUCKET_NAME
pos/COGNITO_USER_POOL_ID
...
```

You can fetch them with the AWS SDK or use IAM-based injection.

---

## 🧪 Testing Locally

After running `pnpm infra:setup`:

```bash
pnpm dev --filter=api
```

Now your API is live and wired to AWS.

---
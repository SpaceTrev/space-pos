# 🛠️ Amazon Web Services (AWS) Setup Guide

This guide explains how to configure AWS for use with the `space-pos`, including Cognito for auth, S3 for image uploads, and optional Amplify for frontend hosting.

---

## ☁️ Prerequisites

- An AWS Account
- IAM privileges to create Cognito, S3, IAM roles, and optionally Amplify

---

## ✅ 1. Create an S3 Bucket for Product Images

1. Go to [S3 Console](https://s3.console.aws.amazon.com/s3)
2. Create a new bucket:
   - Name: `pos-platform-images`
   - Region: e.g., `us-east-1`
3. Enable public read or use signed URLs
4. In `.env` or AWS Secrets:
   ```
   S3_BUCKET_NAME=pos-platform-images
   ```

---

## ✅ 2. Set Up Cognito for Multi-Tenant Auth

1. Go to [Cognito Console](https://console.aws.amazon.com/cognito)
2. Create a **User Pool**:
   - Name: `pos-platform-users`
   - Attributes: Email (required)
   - Add custom attribute: `tenantId`
3. Create an **App Client**:
   - No client secret
   - Enable `USER_PASSWORD_AUTH`
4. Note your values:
   ```
   COGNITO_USER_POOL_ID=us-east-1_xxxxx
   COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxx
   COGNITO_REGION=us-east-1
   ```

---

## ✅ 3. Set Up IAM for Programmatic Access

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Create a new user:
   - Programmatic access only
3. Attach policy:
   - `AmazonS3FullAccess`
   - `AmazonCognitoPowerUser` *(or custom-restricted policy)*
4. Save:
   ```
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   ```

---

## ✅ 4. (Optional) Deploy Webstore via AWS Amplify

1. Go to [Amplify Console](https://console.aws.amazon.com/amplify)
2. Connect your GitHub repo
3. Select frontend branch (`main`, or a tenant branch)
4. Use this `amplify.yml`:
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
   ```

---

## 🧪 Test Locally

Use the `.env.example` file and populate with your real AWS keys and values:
```bash
cp .env.example .env
```

Run the API:
```bash
pnpm dev --filter=api
```

---

## ✅ You're Ready!

You can now:
- Upload product images to S3
- Authenticate users per tenant via Cognito
- Deploy React apps using Amplify or Vercel

For full automation, see `DEPLOYMENT.md` or add GitHub Actions to sync environments.
# 🔒 Production Hardening Checklist

Ensure your `pos-platform-starter` deployment is secure and resilient.

---

## ✅ Authentication & Security

- [ ] Enforce MFA for admin users in Cognito
- [ ] Use domain-based email verification in Cognito
- [ ] Enable rate limiting / WAF on API gateway (if exposed)
- [ ] Configure JWT expiration and refresh rules

---

## ✅ S3 Security

- [ ] Disable public access on bucket (if not using signed URLs)
- [ ] Use signed URLs for uploads/downloads
- [ ] Enable S3 access logging
- [ ] Enable object versioning (optional)

---

## ✅ Secrets Management

- [ ] Store environment variables in:
  - GitHub Secrets (CI/CD)
  - AWS Secrets Manager (for runtime)
- [ ] Rotate secrets regularly
- [ ] Audit IAM roles and permissions (least privilege)

---

## ✅ API & Webstore

- [ ] Enable CORS with domain allowlists
- [ ] Use HTTPS (via Amplify, CloudFront, or Vercel)
- [ ] Monitor logs with CloudWatch or Datadog
- [ ] Add CSRF tokens and request validation

---

## ✅ Infrastructure Resilience

- [ ] Enable daily DB snapshots (RDS or other)
- [ ] Backup S3 buckets to Glacier (optional)
- [ ] Set alarms for low stock, failed orders, auth spikes
- [ ] Use CDN for image caching

---

## ✅ CI/CD Best Practices

- [ ] Use GitHub Actions for lint/build/test/deploy
- [ ] Require PR reviews before merge to `main`
- [ ] Auto-tag releases with Changesets

---

## ✅ Observability

- [ ] Use metrics + dashboards (CloudWatch, Grafana)
- [ ] Enable request tracing (X-Ray or third-party)
- [ ] Add uptime monitoring for public endpoints

---
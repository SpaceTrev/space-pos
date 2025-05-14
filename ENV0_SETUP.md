# ⚙️ env0 Setup Guide (Optional)

You can use [env0](https://env0.com) to manage:

- Terraform IaC environments
- Secret management per tenant
- Approval workflows for production deploys

---

## ✅ Steps

1. Connect GitHub repo to env0
2. Configure a Template for `infra/aws`
3. Use Environment Variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - Custom: `TENANT_ID`, `STAGE`, etc.

4. Link to `main.tf` entry point
5. Add Approval Policies if needed
6. Trigger workflows via PR or CLI

---

## Example CLI
```bash
env0 deploy --template template-id --env environment-id
```

Docs: https://docs.env0.com
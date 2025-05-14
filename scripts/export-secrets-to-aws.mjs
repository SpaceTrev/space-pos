import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const env = readFileSync('.env').toString().split('\n');
for (const line of env) {
  const [key, value] = line.split('=');
  if (!key || !value) continue;
  execSync(`aws secretsmanager create-secret --name pos/${key} --secret-string ${value} || aws secretsmanager put-secret-value --secret-id pos/${key} --secret-string ${value}`);
  console.log(`🔐 Synced: pos/${key}`);
}
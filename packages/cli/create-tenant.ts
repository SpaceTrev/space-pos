
#!/usr/bin/env tsx

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const argv = yargs(hideBin(process.argv))
  .option('yes', { type: 'boolean', default: false, describe: 'Skip prompts and use defaults' })
  .option('skip-deploy', { type: 'boolean', default: false, describe: 'Skip deploy step' })
  .option('repo', { type: 'string', describe: 'GitHub repo to push tenant instance to' })
  .option('register-api', { type: 'boolean', default: false, describe: 'Register tenant in central API' })
  .help().argv;

async function main() {
  console.log('🧪 POS Platform – Tenant Onboarding CLI');

  const prompts = argv.yes ? {
    tenantName: 'Demo Tenant',
    subdomain: 'demo',
    primaryColor: '#D62828',
    locale: 'en',
    stripeKey: 'sk_test_...',
    cognitoPoolId: 'us-west-2_example',
    cognitoClientId: 'exampleclientid',
    confirm: true,
  } : await inquirer.prompt([
    { name: 'tenantName', message: 'Tenant Name:' },
    { name: 'subdomain', message: 'Subdomain (e.g., meaty):' },
    { name: 'primaryColor', message: 'Primary Brand Color (hex):', default: '#D62828' },
    { name: 'locale', message: 'Locale (e.g., en, es):', default: 'en' },
    { name: 'stripeKey', message: 'Stripe Secret Key:' },
    { name: 'cognitoPoolId', message: 'Cognito User Pool ID:' },
    { name: 'cognitoClientId', message: 'Cognito Client ID:' },
    { name: 'confirm', type: 'confirm', message: 'Proceed with scaffolding?', default: true }
  ]);

  if (!prompts.confirm) {
    console.log('❌ Aborted.');
    process.exit(0);
  }

  const tenantId = prompts.subdomain;
  const configDir = path.resolve(__dirname, '../../config/tenants');
  const envDir = path.resolve(__dirname, '../../.env.tenants');

  const configPath = path.join(configDir, `${tenantId}.ts`);
  const envPath = path.join(envDir, `${tenantId}.env`);

  const configContent = \`
export const config = {
  id: '\${tenantId}',
  name: '\${prompts.tenantName}',
  primaryColor: '\${prompts.primaryColor}',
  locale: '\${prompts.locale}',
};
  \`.trim();

  const envContent = \`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=\${prompts.stripeKey}
NEXT_PUBLIC_COGNITO_USER_POOL_ID=\${prompts.cognitoPoolId}
NEXT_PUBLIC_COGNITO_CLIENT_ID=\${prompts.cognitoClientId}
  \`.trim();

  fs.mkdirSync(configDir, { recursive: true });
  fs.mkdirSync(envDir, { recursive: true });

  fs.writeFileSync(configPath, configContent);
  fs.writeFileSync(envPath, envContent);

  console.log(`✅ Created config: \${configPath}`);
  console.log(`✅ Created env: \${envPath}`);

  // Git commit & push
  try {
    execSync(`git add ${configPath} ${envPath}`);
    execSync(`git commit -m "chore(tenant): add \${tenantId} config"`);
    execSync(`git push`);
    console.log('✅ Committed and pushed tenant config');
  } catch (err) {
    console.warn('⚠️ Git commit/push failed:', err.message);
  }

  // Optionally call API
  if (argv['register-api']) {
    try {
      const registerRes = await fetch('http://localhost:3001/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: tenantId, name: prompts.tenantName })
      });
      console.log('✅ Registered in API:', await registerRes.text());
    } catch {
      console.warn('⚠️ API registration failed');
    }
  }

  // Optional GitHub repo creation (placeholder)
  if (argv.repo) {
    console.log(`📦 TODO: Create GitHub repo at ${argv.repo}`);
    // integrate Octokit or GitHub CLI here
  }

  // Optional deploy
  if (!argv['skip-deploy']) {
    console.log(`🚀 Triggering deploy workflow for tenant: ${tenantId}`);
    // TODO: POST to /api/deploy or trigger GH Actions dispatch
  }
}


import os from 'os';
import { execSync } from 'child_process';
import fs from 'fs-extra';

async function pushStarterToRepo(repoUrl: string, tenantId: string) {
  const tmp = path.join(os.tmpdir(), `starter-${tenantId}`);
  const starterSrc = path.resolve(__dirname, '../../examples/webstore-expanded');

  if (!fs.existsSync(starterSrc)) {
    console.warn('⚠️ Starter repo not found at', starterSrc);
    return;
  }

  try {
    fs.copySync(starterSrc, tmp);
    process.chdir(tmp);
    execSync('git init', { stdio: 'ignore' });
    execSync(`git remote add origin ${repoUrl}`);
    execSync('git add .');
    execSync(`git commit -m "Initial commit for tenant: ${tenantId}"`);
    execSync('git branch -M main');
    execSync('git push -u origin main');
    console.log(`✅ Starter code pushed to ${repoUrl}`);
  } catch (err) {
    console.error('❌ Failed to push starter:', err);
  }
}
main();

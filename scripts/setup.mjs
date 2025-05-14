import { execSync } from 'child_process';
import fs from 'fs';

console.log('📦 Installing dependencies with pnpm...');
execSync('pnpm install', { stdio: 'inherit' });

console.log('🛠️ Setting up default .env.local files...');
const envContent = `# Stripe
STRIPE_SECRET_KEY=sk_test_yourkey
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_yourkey

# DB
DATABASE_URL=postgres://localhost:5432/posdb
`;

['.', 'apps/api', 'apps/webstore'].forEach((dir) => {
  const filePath = `${dir}/.env.local`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, envContent);
    console.log(`✅ Created ${filePath}`);
  }
});

console.log('🚀 Done. You can now run:');
console.log('   pnpm dev --filter=webstore');
console.log('   pnpm dev --filter=api');
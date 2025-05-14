#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { program } from 'commander';

program
  .name('create-pos-platform')
  .argument('<template>', 'App template (webstore, pos, admin)')
  .argument('<tenant>', 'Tenant ID (e.g. meaty-mexico)')
  .option('--with-config', 'Create a blank tenant config if not exists')
  .parse();

const [template, tenant] = program.args;
const options = program.opts();

if (!['webstore', 'pos', 'admin'].includes(template)) {
  console.error("❌ Invalid template. Use 'webstore', 'pos', or 'admin'.");
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), `apps/${template}-${tenant}`);
const configPath = path.resolve("packages/config/tenants", `${tenant}.ts`);

if (fs.existsSync(targetDir)) {
  console.error(`❌ App already exists at ${targetDir}`);
  process.exit(1);
}

// 1. Create app directory and default index page
fs.mkdirSync(path.join(targetDir, "pages"), { recursive: true });

fs.writeFileSync(path.join(targetDir, "pages/index.tsx"), `
import { ${template.charAt(0).toUpperCase() + template.slice(1)}App, create${template.charAt(0).toUpperCase() + template.slice(1)}Config } from '@platform/${template}';
import tenantConfig from '@platform/config/tenants/${tenant}';

const config = create${template.charAt(0).toUpperCase() + template.slice(1)}Config(tenantConfig);

export default function App() {
  return <${template.charAt(0).toUpperCase() + template.slice(1)}App config={config} />;
}
`.trim());

// 2. Optionally generate tenant config file
if (options.withConfig && !fs.existsSync(configPath)) {
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, `
export default {
  tenantId: '${tenant}',
  theme: 'light',
  locale: 'en-US',
  logoUrl: '',
  features: {
    delivery: false,
    loyalty: false
  }
};
  `.trim());
}

console.log(`✅ Scaffolded ${template} app for tenant '${tenant}' at apps/${template}-${tenant}`);
if (options.withConfig) {
  console.log(`🧩 Config file: packages/config/tenants/${tenant}.ts`);
}
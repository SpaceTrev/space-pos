import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

function getOutput(key) {
  return execSync(`terraform output -raw ${key}`, { cwd: 'infra/aws' }).toString().trim();
}

const env = `
DATABASE_URL=postgresql://postgres:postgres1234@${getOutput('rds_instance_endpoint')}/pos_platform
S3_BUCKET_NAME=${getOutput('s3_bucket_name')}
COGNITO_USER_POOL_ID=${getOutput('cognito_user_pool_id')}
COGNITO_CLIENT_ID=${getOutput('cognito_client_id')}
COGNITO_REGION=us-east-1
`.trim();

writeFileSync('.env', env);
console.log('✅ .env file created from Terraform outputs.');
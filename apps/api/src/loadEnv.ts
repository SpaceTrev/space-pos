import { config } from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('.env.local')) {
  config({ path: '.env.local' });
} else {
  config(); // fallback to .env
}
import fs from 'fs';
import path from 'path';

const localesPath = 'packages/config/locales';
const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

const translations = files.reduce((acc, file) => {
  const locale = file.replace('.json', '');
  const content = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf-8'));
  acc[locale] = content;
  return acc;
}, {});

const baseLocale = Object.keys(translations)[0];
const baseKeys = new Set(Object.keys(translations[baseLocale]));

for (const locale in translations) {
  if (locale === baseLocale) continue;
  const missing = [...baseKeys].filter(key => !Object.hasOwn(translations[locale], key));
  if (missing.length > 0) {
    console.warn(`❌ ${locale} is missing ${missing.length} keys:`);
    console.warn(missing.join(', '));
  } else {
    console.log(`✅ ${locale} has all keys.`);
  }
}
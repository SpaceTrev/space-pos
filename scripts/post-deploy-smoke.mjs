import https from 'https';

const apps = [
  { name: 'webstore', url: 'https://webstore-meaty-mexico.vercel.app' },
  { name: 'admin', url: 'https://admin.pos-platform.com' },
  { name: 'pos', url: 'https://pos.pos-platform.com' }
];

for (const { name, url } of apps) {
  https.get(url, (res) => {
    const code = res.statusCode;
    console.log(`${name} ➜ ${url} ➜ HTTP ${code}`);
    if (code >= 400) process.exitCode = 1;
  }).on('error', (err) => {
    console.error(`❌ ${name} failed:`, err.message);
    process.exitCode = 1;
  });
}
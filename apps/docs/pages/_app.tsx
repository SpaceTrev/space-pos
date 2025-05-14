import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const menu = [
    { href: '/docs', label: 'Overview' },
    { href: '/docs/configuration', label: 'Configuration' },
    { href: '/docs/cli', label: 'CLI' },
    { href: '/docs/ui', label: 'UI Components' },
    { href: '/docs/database', label: 'Database' },
    { href: '/docs/api', label: 'API' },
    { href: '/docs/auth', label: 'Auth & Tenancy' }
  ];

  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState('meaty');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    document.body.classList.remove('theme-meaty', 'theme-zapata');
    document.body.classList.add(`theme-${theme}`);
  }, [dark, theme]);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 border-r text-sm">
        <div className="mb-4 space-y-2">
          <button onClick={() => setDark(!dark)} className="w-full border px-2 py-1 rounded">
            Toggle {dark ? 'Light' : 'Dark'} Mode
          </button>
          <select onChange={(e) => setTheme(e.target.value)} className="w-full border px-2 py-1 rounded">
            <option value="meaty">Meaty</option>
            <option value="zapata">Zapata</option>
          </select>
        </div>
        <nav className="space-y-1">
          {menu.map((item) => (
            <a key={item.href} href={item.href} className="block hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
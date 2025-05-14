import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/internal', label: 'Internal Docs' },
  { href: '/storybook', label: 'Storybook' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 p-4 border-r border-gray-200 bg-gray-50">
        <h2 className="font-bold mb-4 text-lg">Docs Navigation</h2>
        <nav className="space-y-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <a className={\`\${pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-800'} block hover:underline\`}>
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
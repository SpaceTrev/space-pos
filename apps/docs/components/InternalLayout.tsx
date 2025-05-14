'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InternalSidebar from '@platform/ui/src/components/InternalSidebar';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== 'production';
    const hasAccess = localStorage.getItem('internal_access') === 'true';
    if (isDev || hasAccess) {
      setAuthenticated(true);
    } else {
      router.push('/');
    }
  }, [router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden bg-gray-800 text-white px-4 py-2 fixed top-4 left-4 z-50 rounded"
      >
        {sidebarOpen ? 'Close' : 'Menu'}
      </button>

      <div className={\`bg-gray-100 md:block fixed md:relative z-40 w-64 border-r p-4 \${sidebarOpen ? 'block' : 'hidden'}\`}>
        <InternalSidebar />
        <input
          type="text"
          placeholder="Search docs..."
          className="mt-4 w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <main className="flex-1 p-6 md:ml-64 prose max-w-none">
        {children}
      </main>
    </div>
  );
}
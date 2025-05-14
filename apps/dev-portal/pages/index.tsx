import { useState } from 'react';

export default function DevPortal() {
  const [tenantId, setTenantId] = useState('');
  const [theme, setTheme] = useState('meaty');
  const [locale, setLocale] = useState('en');

  return (
    <main className="p-6 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Tenant Dev Portal</h1>

      <label className="block mb-2">
        Tenant ID
        <input
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          className="w-full border rounded px-3 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Theme
        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full border rounded px-3 py-1 mt-1">
          <option value="meaty">Meaty</option>
          <option value="zapata">Zapata</option>
        </select>
      </label>

      <label className="block mb-4">
        Locale
        <select value={locale} onChange={(e) => setLocale(e.target.value)} className="w-full border rounded px-3 py-1 mt-1">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </label>

      <button
        onClick={() => alert(`Scaffolded ${tenantId} with theme ${theme} and locale ${locale}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Scaffold Tenant App
      </button>
    </main>
  );
}
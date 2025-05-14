export default function InternalSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r text-sm">
      <h2 className="font-bold mb-2">Internal Docs</h2>
      <div className="space-y-2">
        <a href="/docs/internal/README">Overview</a>
        <a href="/docs/internal/ARCHITECTURE">Architecture</a>
        <a href="/docs/internal/DEVELOPMENT">Development</a>
        <a href="/docs/internal/CI-CD">CI/CD</a>
        <a href="/docs/internal/TESTING">Testing</a>
      </div>
    </aside>
  );
}
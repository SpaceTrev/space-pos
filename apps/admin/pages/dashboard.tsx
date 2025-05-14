import { useEffect, useState } from 'react';

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('http://localhost:4000/metrics/dashboard', {
          headers: {
            Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
          }
        });
        if (!res.ok) throw new Error('Request failed');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data');
      }
    };

    fetchMetrics();
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Dashboard Metrics</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {metrics ? (
        <>
          <h2>Total Sales: ${metrics.totalSales.toFixed(2)}</h2>
          <h3>Total Orders: {metrics.totalOrders}</h3>
          <h4>Low Stock Products:</h4>
          <ul>
            {metrics.lowStock.map((p: any) => (
              <li key={p.name}>
                {p.name} — {p.stock} left
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
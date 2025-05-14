import { useEffect, useState } from 'react';

type Order = {
  id: string;
  total: number;
  createdAt: string;
};

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:4000/orders', {
          headers: {
            Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
          }
        });
        if (!res.ok) throw new Error('Request failed');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError('Failed to load order history');
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Order History</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: 8 }}>Order ID</th>
              <th style={{ border: '1px solid black', padding: 8 }}>Total</th>
              <th style={{ border: '1px solid black', padding: 8 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ border: '1px solid black', padding: 8 }}>{order.id}</td>
                <td style={{ border: '1px solid black', padding: 8 }}>${order.total.toFixed(2)}</td>
                <td style={{ border: '1px solid black', padding: 8 }}>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders yet.</p>
      )}
    </main>
  );
}
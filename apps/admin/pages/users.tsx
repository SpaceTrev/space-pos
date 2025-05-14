import { useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:4000/users', {
        headers: {
          Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
        }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Unable to load users');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
        },
        body: JSON.stringify({ email, role })
      });
      if (!res.ok) throw new Error('Failed to create user');
      setEmail('');
      setRole('');
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <h3>Create New User</h3>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
        <button onClick={handleCreate}>Create User</button>
      </div>

      <h3>Existing Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.email} — <strong>{u.role}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
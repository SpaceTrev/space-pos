import { useState } from 'react';

export function CheckoutForm({ onSubmit }: {
  onSubmit: (values: { name: string; email: string; address: string }) => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
        className="w-full border rounded p-2" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
        className="w-full border rounded p-2" required />
      <input name="address" placeholder="Shipping Address" value={form.address} onChange={handleChange}
        className="w-full border rounded p-2" required />
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
        Continue to Payment
      </button>
    </form>
  );
}
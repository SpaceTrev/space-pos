import { useEffect, useState } from 'react';

type Product = {
  id?: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ name: '', price: 0, stock: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:4000/secure', {
        headers: {
          Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
        }
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      setError('Unable to load products');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value }));
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) formData.append('image', selectedFile);
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price.toString());
      formData.append('stock', newProduct.stock.toString());

      const res = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
        },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to create product');
      setNewProduct({ name: '', price: 0, stock: 0 });
      setSelectedFile(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_COGNITO_JWT_HERE'
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update product');
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Product Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <h3>Create Product</h3>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={newProduct.price} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreate}>Create</button>
      </div>

      <h3>Existing Products</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: 8 }}>Name</th>
            <th style={{ border: '1px solid black', padding: 8 }}>Price</th>
            <th style={{ border: '1px solid black', padding: 8 }}>Stock</th>
            <th style={{ border: '1px solid black', padding: 8 }}>Image</th>
            <th style={{ border: '1px solid black', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={{ border: '1px solid black', padding: 8 }}>{p.name}</td>
              <td style={{ border: '1px solid black', padding: 8 }}>${p.price.toFixed(2)}</td>
              <td style={{ border: '1px solid black', padding: 8 }}>{p.stock}</td>
              <td style={{ border: '1px solid black', padding: 8 }}>
                {p.imageUrl ? <img src={p.imageUrl} alt={p.name} width="50" /> : 'No image'}
              </td>
              <td style={{ border: '1px solid black', padding: 8 }}>
                <button onClick={() => handleUpdate(p.id!, { stock: p.stock + 1 })}>+1 Stock</button>
                <button onClick={() => handleUpdate(p.id!, { stock: p.stock - 1 })}>-1 Stock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
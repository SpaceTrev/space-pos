import { cn } from '@/lib/utils';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export function ProductCard({ product, onAddToCart }: {
  product: Product;
  onAddToCart: (id: string) => void;
}) {
  return (
    <div className={cn('border rounded p-4 shadow-sm hover:shadow-md transition')}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-2 bg-primary text-white py-1 px-3 rounded hover:bg-primary/90"
      >
        Add to Cart
      </button>
    </div>
  );
}
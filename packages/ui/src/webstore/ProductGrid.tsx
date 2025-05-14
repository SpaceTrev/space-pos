import { Product, ProductCard } from './ProductCard';

export function ProductGrid({ products, onAddToCart }: {
  products: Product[];
  onAddToCart: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
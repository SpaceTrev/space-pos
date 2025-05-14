import { Product } from './ProductCard';

export function CartItem({ product, quantity, onRemove }: {
  product: Product;
  quantity: number;
  onRemove: () => void;
}) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4 className="font-medium">{product.name}</h4>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)} × {quantity}</p>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:underline">Remove</button>
    </div>
  );
}
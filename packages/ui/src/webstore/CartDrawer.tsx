import { CartItem } from './CartItem';
import { Product } from './ProductCard';

export function CartDrawer({ isOpen, products, cart, onRemove }: {
  isOpen: boolean;
  products: Product[];
  cart: Record<string, number>;
  onRemove: (id: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 z-50">
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        Object.entries(cart).map(([id, qty]) => {
          const product = products.find(p => p.id === id);
          if (!product) return null;
          return (
            <CartItem
              key={id}
              product={product}
              quantity={qty}
              onRemove={() => onRemove(id)}
            />
          );
        })
      )}
    </div>
  );
}
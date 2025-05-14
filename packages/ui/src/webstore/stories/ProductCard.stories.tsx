import { ProductCard, Product } from '../ProductCard';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Webstore/ProductCard',
  component: ProductCard,
};

const mockProduct: Product = {
  id: '1',
  name: 'Bison Ribeye',
  price: 32.5,
  image: 'https://source.unsplash.com/featured/?steak',
};

export const Default = () => (
  <ProductCard product={mockProduct} onAddToCart={action('add-to-cart')} />
);
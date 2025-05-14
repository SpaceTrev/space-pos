import { ProductGrid, Product } from '../ProductGrid';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Webstore/ProductGrid',
  component: ProductGrid,
};

const products: Product[] = [
  {
    id: '1',
    name: 'Venison Jerky',
    price: 8.99,
    image: 'https://source.unsplash.com/featured/?jerky',
  },
  {
    id: '2',
    name: 'Elk Steak',
    price: 25.0,
    image: 'https://source.unsplash.com/featured/?meat',
  },
];

export const Default = () => (
  <ProductGrid products={products} onAddToCart={action('add-to-cart')} />
);
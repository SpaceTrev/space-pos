import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';

const mockProducts = [
  { id: '1', name: 'Test 1', price: 10, image: '/a.jpg' },
  { id: '2', name: 'Test 2', price: 20, image: '/b.jpg' }
];

test('renders all products in grid', () => {
  render(<ProductGrid products={mockProducts} onAddToCart={() => {}} />);
  expect(screen.getByText('Test 1')).toBeInTheDocument();
  expect(screen.getByText('Test 2')).toBeInTheDocument();
});
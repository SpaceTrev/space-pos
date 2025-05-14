import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Meat',
  price: 19.99,
  image: '/test.jpg',
};

test('renders product card and fires add-to-cart', () => {
  const handleAdd = vi.fn();
  render(<ProductCard product={mockProduct} onAddToCart={handleAdd} />);
  expect(screen.getByText('Test Meat')).toBeInTheDocument();
  fireEvent.click(screen.getByText(/add to cart/i));
  expect(handleAdd).toHaveBeenCalledWith('1');
});
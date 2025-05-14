import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutForm } from '../CheckoutForm';

test('submits form with values', () => {
  const mockSubmit = vi.fn();
  render(<CheckoutForm onSubmit={mockSubmit} />);
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Shipping Address'), { target: { value: '123 Test St' } });
  fireEvent.click(screen.getByText(/continue to payment/i));
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'Jane Doe',
    email: 'jane@example.com',
    address: '123 Test St',
  });
});
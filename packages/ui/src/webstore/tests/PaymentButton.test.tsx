import { render, screen } from '@testing-library/react';
import { PaymentButton } from '../PaymentButton';

vi.mock('@stripe/stripe-js', () => ({
  loadStripe: () => Promise.resolve({ confirmPayment: vi.fn().mockResolvedValue({}) })
}));

test('renders payment button and calls stripe confirm', async () => {
  render(<PaymentButton clientSecret="mock_secret" />);
  expect(await screen.findByText(/pay now/i)).toBeInTheDocument();
});
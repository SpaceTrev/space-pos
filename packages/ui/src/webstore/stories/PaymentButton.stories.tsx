import { PaymentButton } from '../PaymentButton';

export default {
  title: 'Webstore/PaymentButton',
  component: PaymentButton,
};

export const Default = () => (
  <PaymentButton clientSecret="test_client_secret_123" />
);
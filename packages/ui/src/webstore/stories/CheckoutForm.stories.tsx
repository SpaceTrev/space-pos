import { CheckoutForm } from '../CheckoutForm';

export default {
  title: 'Webstore/CheckoutForm',
  component: CheckoutForm,
};

export const Default = () => (
  <CheckoutForm onSubmit={(data) => alert(JSON.stringify(data))} />
);
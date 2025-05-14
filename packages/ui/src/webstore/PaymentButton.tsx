import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentButton({ clientSecret }: { clientSecret: string }) {
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    if (clientSecret) setStripeReady(true);
  }, [clientSecret]);

  const handleClick = async () => {
    const stripe = await stripePromise;
    if (!stripe || !clientSecret) return;

    const { error } = await stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!stripeReady}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay Now
    </button>
  );
}
import { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function CheckoutForm({ invoiceId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payments/result?invoice=${invoiceId}`,
      },
    });

    // Only reached when confirmation fails immediately; on success Stripe
    // redirects to return_url.
    setMessage(error.message);
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="actions checkout-actions">
        <button className="btn primary" disabled={!stripe || submitting}>
          {submitting ? 'Processing…' : 'Pay now'}
        </button>
      </div>
      {message && <p className="error">{message}</p>}
    </form>
  );
}

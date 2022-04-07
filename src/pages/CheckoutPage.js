import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { invoicesApi, paymentsApi } from '../api';
import CheckoutForm from '../components/CheckoutForm';
import { stripePromise } from '../lib/stripe';
import { formatMoney } from '../utils/money';

export default function CheckoutPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const intentRequested = useRef(false);

  useEffect(() => {
    // Creating a PaymentIntent is not idempotent. StrictMode runs this effect
    // twice in development, which left an orphaned intent in Stripe per visit.
    if (!stripePromise || intentRequested.current) return;
    intentRequested.current = true;

    Promise.all([invoicesApi.get(id), paymentsApi.createIntent(id)])
      .then(([inv, intent]) => {
        setInvoice(inv);
        setClientSecret(intent.clientSecret);
      })
      .catch((err) => setError(err.response?.data?.detail || err.message));
  }, [id]);

  if (!stripePromise) {
    return (
      <p className="error">
        Stripe is not configured. Set REACT_APP_STRIPE_PUBLISHABLE_KEY to your <strong>test</strong> publishable
        key in .env.local.
      </p>
    );
  }
  if (error) return <p className="error">{error}</p>;
  if (!invoice || !clientSecret) return <p>Preparing checkout…</p>;

  return (
    <div className="card narrow">
      <h1>Pay {invoice.number}</h1>
      <p>
        Amount due: <strong>{formatMoney(invoice.total, invoice.currency)}</strong>
      </p>
      <p className="hint">
        Test mode: use card 4242 4242 4242 4242 with any future expiry date and any CVC.
      </p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm invoiceId={invoice.id} />
      </Elements>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { stripePromise } from '../lib/stripe';

const MESSAGES = {
  loading: 'Checking payment status…',
  succeeded: 'Payment received. The invoice will be marked paid as soon as Stripe confirms it.',
  processing: 'Your payment is processing.',
  requires_payment_method: 'The payment did not go through. Please try another card.',
  unknown: 'We could not determine the payment status.',
};

export default function PaymentResultPage() {
  const [params] = useSearchParams();
  const invoiceId = params.get('invoice');
  const clientSecret = params.get('payment_intent_client_secret');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!clientSecret || !stripePromise) {
      setStatus('unknown');
      return;
    }
    stripePromise
      .then((stripe) => stripe.retrievePaymentIntent(clientSecret))
      .then(({ paymentIntent }) => setStatus(paymentIntent?.status ?? 'unknown'))
      .catch(() => setStatus('unknown'));
  }, [clientSecret]);

  return (
    <div className="card narrow">
      <h1>Payment</h1>
      <p>{MESSAGES[status] ?? MESSAGES.unknown}</p>
      {invoiceId && <Link to={`/invoices/${invoiceId}`}>Back to invoice</Link>}
    </div>
  );
}

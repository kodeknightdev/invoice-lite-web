import { loadStripe } from '@stripe/stripe-js';

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (publishableKey && !publishableKey.startsWith('pk_test_')) {
  console.warn('Invoice Lite is only meant to run against Stripe test mode.');
}

// null when no key is configured; pages check for that and show a hint.
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

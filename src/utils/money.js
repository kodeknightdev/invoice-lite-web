// Do the math in integers so totals match the API, which uses decimals and
// rounds half cents away from zero. Floats gave 1.5 x 33.33 = 49.99 here
// while the invoice saved as 50.00.
function lineCents(item) {
  const quantityHundredths = Math.round(Number(item.quantity || 0) * 100);
  const priceCents = Math.round(Number(item.unitPrice || 0) * 100);
  return Math.round((quantityHundredths * priceCents) / 100);
}

export function lineAmount(item) {
  return lineCents(item) / 100;
}

export function invoiceTotal(items) {
  return items.reduce((sum, item) => sum + lineCents(item), 0) / 100;
}

export function formatMoney(amount, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

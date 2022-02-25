export function lineAmount(item) {
  return Number(item.quantity || 0) * Number(item.unitPrice || 0);
}

export function invoiceTotal(items) {
  return items.reduce((sum, item) => sum + lineAmount(item), 0);
}

export function formatMoney(amount, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

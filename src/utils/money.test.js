import { formatMoney, invoiceTotal, lineAmount } from './money';

test('lineAmount multiplies quantity by unit price', () => {
  expect(lineAmount({ quantity: 3, unitPrice: 19.99 })).toBe(59.97);
});

test('lineAmount rounds half cents up like the API', () => {
  expect(lineAmount({ quantity: 1.5, unitPrice: 33.33 })).toBe(50);
});

test('lineAmount treats empty inputs as zero', () => {
  expect(lineAmount({ quantity: '', unitPrice: '' })).toBe(0);
});

test('invoiceTotal avoids floating point drift', () => {
  const items = [
    { quantity: 1, unitPrice: 0.1 },
    { quantity: 1, unitPrice: 0.2 },
  ];
  expect(invoiceTotal(items)).toBe(0.3);
});

test('formatMoney uses the invoice currency', () => {
  expect(formatMoney(1234.5, 'usd')).toBe('$1,234.50');
  expect(formatMoney(10, 'eur')).toBe('€10.00');
});

import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

test('renders the status with a matching class', () => {
  render(<StatusBadge status="Paid" />);

  expect(screen.getByText('Paid')).toHaveClass('badge', 'badge-paid');
});

test('shows overdue for sent invoices past their due date', () => {
  render(<StatusBadge status="Sent" overdue />);

  expect(screen.getByText('Overdue')).toHaveClass('badge-overdue');
});

test('ignores the overdue flag once an invoice is paid', () => {
  render(<StatusBadge status="Paid" overdue />);

  expect(screen.getByText('Paid')).toBeInTheDocument();
});

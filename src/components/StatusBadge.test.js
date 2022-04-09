import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

test('renders the status with a matching class', () => {
  render(<StatusBadge status="Paid" />);

  expect(screen.getByText('Paid')).toHaveClass('badge', 'badge-paid');
});

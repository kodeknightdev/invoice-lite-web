import { fireEvent, render, screen } from '@testing-library/react';
import LineItemsEditor from './LineItemsEditor';

const items = [{ description: 'Logo design', quantity: 2, unitPrice: 150 }];

test('shows the amount for each line', () => {
  render(<LineItemsEditor items={items} currency="usd" onChange={() => {}} />);

  expect(screen.getByText('$300.00')).toBeInTheDocument();
});

test('adds an empty line', () => {
  const onChange = jest.fn();
  render(<LineItemsEditor items={items} currency="usd" onChange={onChange} />);

  fireEvent.click(screen.getByRole('button', { name: /add line/i }));

  expect(onChange).toHaveBeenCalledWith([...items, { description: '', quantity: 1, unitPrice: 0 }]);
});

test('cannot remove the last remaining line', () => {
  render(<LineItemsEditor items={items} currency="usd" onChange={() => {}} />);

  expect(screen.getByRole('button', { name: /remove/i })).toBeDisabled();
});

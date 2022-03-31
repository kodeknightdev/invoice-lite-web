import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatMoney } from '../utils/money';
import { formatDate } from '../utils/dates';

export default function InvoiceTable({ invoices, showClient = true }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Number</th>
          {showClient && <th>Client</th>}
          <th>Issued</th>
          <th>Due</th>
          <th>Status</th>
          <th className="num">Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td>
              <Link to={`/invoices/${inv.id}`}>{inv.number}</Link>
            </td>
            {showClient && <td>{inv.clientName}</td>}
            <td>{formatDate(inv.issueDate)}</td>
            <td>{formatDate(inv.dueDate)}</td>
            <td>
              <StatusBadge status={inv.status} />
            </td>
            <td className="num">{formatMoney(inv.total, inv.currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

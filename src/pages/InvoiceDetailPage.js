import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { invoicesApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import StatusBadge from '../components/StatusBadge';
import useApi from '../hooks/useApi';
import { formatDate } from '../utils/dates';
import { formatMoney } from '../utils/money';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: invoice, loading, error, setData } = useApi(() => invoicesApi.get(id), [id]);
  const [actionError, setActionError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function runAction(action) {
    setBusy(true);
    setActionError(null);
    try {
      setData(await action(id));
    } catch (err) {
      setActionError(err);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this draft invoice?')) return;
    try {
      await invoicesApi.remove(id);
      navigate('/invoices');
    } catch (err) {
      setActionError(err);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <ErrorMessage error={error} />;

  const isDraft = invoice.status === 'Draft';
  const isSent = invoice.status === 'Sent';

  return (
    <div className="card">
      <div className="page-header">
        <h1>
          {invoice.number} <StatusBadge status={invoice.status} />
        </h1>
        <div className="actions">
          {isDraft && (
            <Link className="btn" to={`/invoices/${id}/edit`}>
              Edit
            </Link>
          )}
          {isDraft && (
            <button className="btn primary" disabled={busy} onClick={() => runAction(invoicesApi.send)}>
              Mark as sent
            </button>
          )}
          {isSent && (
            <Link className="btn primary" to={`/invoices/${id}/pay`}>
              Pay by card (test)
            </Link>
          )}
          {isSent && (
            <button className="btn" disabled={busy} onClick={() => runAction(invoicesApi.markPaid)}>
              Mark paid manually
            </button>
          )}
          {(isDraft || isSent) && (
            <button className="btn danger" disabled={busy} onClick={() => runAction(invoicesApi.voidInvoice)}>
              Void
            </button>
          )}
          {isDraft && (
            <button className="btn danger" disabled={busy} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>

      <ErrorMessage error={actionError} />

      <dl className="meta">
        <dt>Client</dt>
        <dd>
          <Link to={`/clients/${invoice.clientId}`}>{invoice.clientName}</Link>
        </dd>
        <dt>Issued</dt>
        <dd>{formatDate(invoice.issueDate)}</dd>
        <dt>Due</dt>
        <dd>{formatDate(invoice.dueDate)}</dd>
        {invoice.paidAt && (
          <>
            <dt>Paid</dt>
            <dd>{formatDate(invoice.paidAt)}</dd>
          </>
        )}
      </dl>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="num">Qty</th>
            <th className="num">Unit price</th>
            <th className="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((li) => (
            <tr key={li.id}>
              <td>{li.description}</td>
              <td className="num">{li.quantity}</td>
              <td className="num">{formatMoney(li.unitPrice, invoice.currency)}</td>
              <td className="num">{formatMoney(li.amount, invoice.currency)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
            <th className="num">{formatMoney(invoice.total, invoice.currency)}</th>
          </tr>
        </tfoot>
      </table>

      {invoice.notes && <p className="notes">{invoice.notes}</p>}
    </div>
  );
}

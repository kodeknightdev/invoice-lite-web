import { Link } from 'react-router-dom';
import { invoicesApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import InvoiceTable from '../components/InvoiceTable';
import useApi from '../hooks/useApi';

export default function InvoicesPage() {
  const { data: invoices, loading, error } = useApi(() => invoicesApi.list(), []);

  return (
    <div>
      <div className="page-header">
        <h1>Invoices</h1>
        <Link className="btn primary" to="/invoices/new">
          New invoice
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      <ErrorMessage error={error} />
      {invoices && invoices.length === 0 && <p className="muted">No invoices yet.</p>}
      {invoices?.length > 0 && <InvoiceTable invoices={invoices} />}
    </div>
  );
}

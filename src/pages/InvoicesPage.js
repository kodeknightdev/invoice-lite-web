import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoicesApi } from '../api';
import InvoiceTable from '../components/InvoiceTable';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    invoicesApi
      .list()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Invoices</h1>
        <Link className="btn primary" to="/invoices/new">
          New invoice
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && invoices.length === 0 && <p className="muted">No invoices yet.</p>}
      {invoices.length > 0 && <InvoiceTable invoices={invoices} />}
    </div>
  );
}

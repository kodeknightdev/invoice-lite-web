import { useState } from 'react';
import { Link } from 'react-router-dom';
import { invoicesApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import InvoiceTable from '../components/InvoiceTable';
import Pagination from '../components/Pagination';
import useApi from '../hooks/useApi';

const PAGE_SIZE = 20;

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useApi(() => invoicesApi.list({ page, pageSize: PAGE_SIZE }), [page]);
  const invoices = data?.items ?? [];

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
      {data && invoices.length === 0 && <p className="muted">No invoices yet.</p>}
      {invoices.length > 0 && <InvoiceTable invoices={invoices} />}
      {data && (
        <Pagination page={data.page} pageSize={data.pageSize} totalCount={data.totalCount} onChange={setPage} />
      )}
    </div>
  );
}

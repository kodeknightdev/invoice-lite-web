import { useState } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi, invoicesApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import InvoiceTable from '../components/InvoiceTable';
import Pagination from '../components/Pagination';
import useApi from '../hooks/useApi';

const PAGE_SIZE = 20;
const STATUSES = ['Draft', 'Sent', 'Paid', 'Void'];

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [clientId, setClientId] = useState('');

  const { data: clients } = useApi(() => clientsApi.list(), []);
  const { data, loading, error } = useApi(
    () =>
      invoicesApi.list({
        page,
        pageSize: PAGE_SIZE,
        status: status || undefined,
        clientId: clientId || undefined,
      }),
    [page, status, clientId]
  );
  const invoices = data?.items ?? [];
  const filtered = Boolean(status || clientId);

  function filterHandler(setter) {
    return (e) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  return (
    <div>
      <div className="page-header">
        <h1>Invoices</h1>
        <Link className="btn primary" to="/invoices/new">
          New invoice
        </Link>
      </div>

      <div className="filters">
        <select value={status} onChange={filterHandler(setStatus)} aria-label="Filter by status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={clientId} onChange={filterHandler(setClientId)} aria-label="Filter by client">
          <option value="">All clients</option>
          {(clients ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading…</p>}
      <ErrorMessage error={error} />
      {data && invoices.length === 0 && (
        <p className="muted">{filtered ? 'No invoices match these filters.' : 'No invoices yet.'}</p>
      )}
      {invoices.length > 0 && <InvoiceTable invoices={invoices} />}
      {data && (
        <Pagination page={data.page} pageSize={data.pageSize} totalCount={data.totalCount} onChange={setPage} />
      )}
    </div>
  );
}

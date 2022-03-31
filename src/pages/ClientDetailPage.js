import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clientsApi, invoicesApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import InvoiceTable from '../components/InvoiceTable';
import useApi from '../hooks/useApi';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: client, loading, error } = useApi(() => clientsApi.get(id), [id]);
  const { data: invoices } = useApi(() => invoicesApi.list({ clientId: id, pageSize: 100 }), [id]);
  const [deleteError, setDeleteError] = useState(null);

  async function handleDelete() {
    if (!window.confirm(`Delete ${client.name}?`)) return;
    try {
      await clientsApi.remove(id);
      navigate('/clients');
    } catch (err) {
      setDeleteError(err);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="card">
      <div className="page-header">
        <h1>{client.name}</h1>
        <div className="actions">
          <Link className="btn" to={`/clients/${id}/edit`}>
            Edit
          </Link>
          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <ErrorMessage error={deleteError} />
      <dl className="meta">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${client.email}`}>{client.email}</a>
        </dd>
        <dt>Company</dt>
        <dd>{client.company || '—'}</dd>
        <dt>Address</dt>
        <dd>{client.address || '—'}</dd>
      </dl>

      <h2>Invoices</h2>
      {invoices?.items.length > 0 ? (
        <InvoiceTable invoices={invoices.items} showClient={false} />
      ) : (
        <p className="muted">No invoices for this client yet.</p>
      )}
    </div>
  );
}

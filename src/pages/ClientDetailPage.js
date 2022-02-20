import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clientsApi } from '../api';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    clientsApi
      .get(id)
      .then(setClient)
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm(`Delete ${client.name}?`)) return;
    try {
      await clientsApi.remove(id);
      navigate('/clients');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!client) return <p>Loading…</p>;

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
    </div>
  );
}

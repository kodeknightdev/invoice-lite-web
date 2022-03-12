import { Link } from 'react-router-dom';
import { clientsApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import useApi from '../hooks/useApi';

export default function ClientsPage() {
  const { data: clients, loading, error } = useApi(() => clientsApi.list(), []);

  return (
    <div>
      <div className="page-header">
        <h1>Clients</h1>
        <Link className="btn primary" to="/clients/new">
          New client
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      <ErrorMessage error={error} />
      {clients && clients.length === 0 && <p className="muted">No clients yet.</p>}

      {clients?.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>
                  <Link to={`/clients/${c.id}`}>{c.name}</Link>
                </td>
                <td>{c.company || '—'}</td>
                <td>{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

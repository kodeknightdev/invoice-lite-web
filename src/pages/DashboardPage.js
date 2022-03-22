import { Link } from 'react-router-dom';
import { dashboardApi } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import useApi from '../hooks/useApi';
import { formatMoney } from '../utils/money';

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { data, loading, error } = useApi(() => dashboardApi.summary(), []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <Link className="btn primary" to="/invoices/new">
          New invoice
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      <ErrorMessage error={error} />

      {data && (
        <div className="stats">
          <Stat label="Outstanding" value={formatMoney(data.outstandingTotal)} />
          <Stat label="Paid this month" value={formatMoney(data.paidThisMonth)} />
          <Stat label="Overdue invoices" value={data.overdueCount} />
          <Stat label="Drafts" value={data.draftCount} />
          <Stat label="Clients" value={data.clientCount} />
        </div>
      )}
    </div>
  );
}

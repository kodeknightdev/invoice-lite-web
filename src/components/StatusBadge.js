export default function StatusBadge({ status, overdue = false }) {
  if (overdue && status === 'Sent') {
    return <span className="badge badge-overdue">Overdue</span>;
  }
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientsApi, invoicesApi } from '../api';
import LineItemsEditor from '../components/LineItemsEditor';
import { getErrorMessage, getFieldErrors } from '../utils/errors';
import { formatMoney, invoiceTotal } from '../utils/money';

const CURRENCIES = ['usd', 'eur', 'gbp', 'cad'];

const toInputDate = (date) => date.toISOString().slice(0, 10);
const daysFromNow = (days) => toInputDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));

export default function InvoiceBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    clientId: '',
    issueDate: daysFromNow(0),
    dueDate: daysFromNow(30),
    currency: 'usd',
    notes: '',
    lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    clientsApi.list().then(setClients);
  }, []);

  useEffect(() => {
    if (!id) return;
    invoicesApi.get(id).then((inv) =>
      setForm({
        clientId: String(inv.clientId),
        issueDate: inv.issueDate.slice(0, 10),
        dueDate: inv.dueDate.slice(0, 10),
        currency: inv.currency,
        notes: inv.notes || '',
        lineItems: inv.lineItems.map(({ description, quantity, unitPrice }) => ({
          description,
          quantity,
          unitPrice,
        })),
      })
    );
  }, [id]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFieldErrors({});

    const payload = {
      ...form,
      clientId: Number(form.clientId),
      lineItems: form.lineItems.map((li) => ({
        ...li,
        quantity: Number(li.quantity),
        unitPrice: Number(li.unitPrice),
      })),
    };

    try {
      const saved = id ? await invoicesApi.update(id, payload) : await invoicesApi.create(payload);
      navigate(`/invoices/${saved.id}`);
    } catch (err) {
      setError(getErrorMessage(err));
      setFieldErrors(getFieldErrors(err));
      setSaving(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>{id ? 'Edit invoice' : 'New invoice'}</h1>

      <div className="grid-2">
        <label>
          Client
          <select value={form.clientId} onChange={(e) => update('clientId', e.target.value)} required>
            <option value="">Select a client…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Currency
          <select value={form.currency} onChange={(e) => update('currency', e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label>
          Issue date
          <input type="date" value={form.issueDate} onChange={(e) => update('issueDate', e.target.value)} required />
        </label>
        <label>
          Due date
          <input type="date" value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} required />
          {fieldErrors.dueDate && <span className="field-error">{fieldErrors.dueDate}</span>}
        </label>
      </div>

      <LineItemsEditor
        items={form.lineItems}
        currency={form.currency}
        onChange={(items) => update('lineItems', items)}
      />
      {fieldErrors.lineItems && <p className="field-error">{fieldErrors.lineItems}</p>}
      <p className="total">
        Total <strong>{formatMoney(invoiceTotal(form.lineItems), form.currency)}</strong>
      </p>

      <label>
        Notes
        <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} />
      </label>

      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button className="btn primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save draft'}
        </button>
      </div>
    </form>
  );
}

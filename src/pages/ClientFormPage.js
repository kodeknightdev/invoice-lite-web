import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientsApi } from '../api';

const empty = { name: '', email: '', company: '', address: '' };

export default function ClientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    clientsApi.get(id).then((c) =>
      setForm({ name: c.name, email: c.email, company: c.company || '', address: c.address || '' })
    );
  }, [id]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const saved = id ? await clientsApi.update(id, form) : await clientsApi.create(form);
      navigate(`/clients/${saved.id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="card narrow" onSubmit={handleSubmit}>
      <h1>{id ? 'Edit client' : 'New client'}</h1>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Company
        <input name="company" value={form.company} onChange={handleChange} />
      </label>
      <label>
        Address
        <textarea name="address" rows={3} value={form.address} onChange={handleChange} />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button className="btn primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../auth/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      signIn(await authApi.register(form));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account.');
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="card narrow" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <label>
          Your name
          <input name="displayName" value={form.displayName} onChange={handleChange} autoFocus />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
        <p className="muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

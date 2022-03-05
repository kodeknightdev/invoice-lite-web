import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
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
      signIn(await authApi.login(form));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in.');
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="card narrow" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required autoFocus />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="muted">
          No account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}

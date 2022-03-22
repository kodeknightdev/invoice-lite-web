import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { user, signOut } = useAuth();

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">Invoice Lite</span>
        <nav>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/clients">Clients</NavLink>
          <NavLink to="/invoices">Invoices</NavLink>
        </nav>
        {user && (
          <div className="user">
            <span>{user.displayName || user.email}</span>
            <button className="link" onClick={signOut}>
              Sign out
            </button>
          </div>
        )}
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

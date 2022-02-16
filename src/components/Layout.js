import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">Invoice Lite</span>
        <nav>
          <NavLink to="/clients">Clients</NavLink>
          <NavLink to="/invoices">Invoices</NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

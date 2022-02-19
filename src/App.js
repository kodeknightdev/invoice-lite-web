import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ClientsPage from './pages/ClientsPage';
import ClientFormPage from './pages/ClientFormPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clients" replace />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/new" element={<ClientFormPage />} />
        <Route path="clients/:id/edit" element={<ClientFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;

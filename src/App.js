import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ClientsPage from './pages/ClientsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clients" replace />} />
        <Route path="clients" element={<ClientsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

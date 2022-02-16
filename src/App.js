import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clients" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

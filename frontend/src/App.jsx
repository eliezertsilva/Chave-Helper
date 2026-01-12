import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';

import Clients from './pages/Clients/Clients';
import Services from './pages/Services/Services';
import Inventory from './pages/Inventory/Inventory';
import Finance from './pages/Finance/Finance';
import Compatibility from './pages/Compatibility/Compatibility';
import Login from './pages/Login/Login';
import Sales from './pages/Sales/Sales';
import Purchases from './pages/Purchases/Purchases';
import Suppliers from './pages/Suppliers/Suppliers';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';

// Placeholder components for other routes
const Placeholder = ({ title }) => <h1 className="page-title">{title}</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<Clients />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/vendas" element={<Sales />} />
              <Route path="/financeiro" element={<Finance />} />
              <Route path="/estoque" element={<Inventory />} />
              <Route path="/compras" element={<Purchases />} />
              <Route path="/fornecedores" element={<Suppliers />} />
              <Route path="/relatorios" element={<Reports />} />
              <Route path="/compatibilidade" element={<Compatibility />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="*" element={<Placeholder title="Página não encontrada" />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

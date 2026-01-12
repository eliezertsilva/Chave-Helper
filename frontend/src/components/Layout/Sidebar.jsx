import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaTools, FaMoneyBillWave, FaBoxOpen, 
  FaShoppingCart, FaCashRegister, FaChartBar, FaTruck, 
  FaKey, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Sidebar = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome /> },
    { path: '/clientes', name: 'Clientes', icon: <FaUsers /> },
    { path: '/servicos', name: 'Serviços', icon: <FaTools /> },
    { path: '/vendas', name: 'Vendas', icon: <FaCashRegister /> },
    { path: '/financeiro', name: 'Financeiro', icon: <FaMoneyBillWave /> },
    { path: '/estoque', name: 'Estoque', icon: <FaBoxOpen /> },
    { path: '/compras', name: 'Compras', icon: <FaShoppingCart /> },
    { path: '/fornecedores', name: 'Fornecedores', icon: <FaTruck /> },
    { path: '/relatorios', name: 'Relatórios', icon: <FaChartBar /> },
    { path: '/compatibilidade', name: 'Compatibilidade', icon: <FaKey /> },
    { path: '/configuracoes', name: 'Configurações', icon: <FaCog /> },
  ];

  return (
    <div className="sidebar d-flex flex-column p-3">
      <div className="sidebar-header mb-4 text-center">
        <h3 className="text-white fw-bold">ChaveHelper</h3>
        <small className="text-muted">ERP System</small>
      </div>
      
      <Nav className="flex-column flex-grow-1">
        {navItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            className={({ isActive }) => 
              `d-flex align-items-center mb-2 text-white rounded p-2 ${isActive ? 'bg-primary' : ''}`
            }
            style={{ textDecoration: 'none', transition: 'background 0.2s' }}
          >
            <span className="me-3 fs-5">{item.icon}</span>
            <span>{item.name}</span>
          </Nav.Link>
        ))}
      </Nav>

      <div className="mt-auto">
        <Nav.Link className="d-flex align-items-center text-danger rounded p-2" href="#">
          <span className="me-3 fs-5"><FaSignOutAlt /></span>
          <span>Sair</span>
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;

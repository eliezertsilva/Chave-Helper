import React from 'react';
import Sidebar from './Sidebar';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-wrapper">
        <div className="main-content">
          {children}
        </div>
        <footer className="bg-white p-3 text-center text-muted border-top">
          <small>&copy; {new Date().getFullYear()} ChaveHelper ERP. Todos os direitos reservados.</small>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;

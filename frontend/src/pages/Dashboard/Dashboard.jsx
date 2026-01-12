import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaMoneyBillWave, FaTools, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, footer }) => (
  <Card className="glass-card border-0 h-100">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h6 className="text-muted text-uppercase mb-1">{title}</h6>
          <h2 className="mb-0 fw-bold">{value}</h2>
        </div>
        <div className={`p-3 rounded-circle bg-${color} bg-opacity-10 text-${color}`}>
          {icon}
        </div>
      </div>
      {footer && <div className="small text-muted">{footer}</div>}
    </Card.Body>
  </Card>
);

const Dashboard = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted">Visão geral do desempenho hoje</p>
        </div>
        <div className="text-end">
           <span className="badge bg-primary fs-6">Janeiro 2026</span>
        </div>
      </div>

      <Row className="g-4 mb-4">
        <Col md={3}>
          <StatCard 
            title="Faturamento Dia" 
            value="R$ 1.250,00" 
            icon={<FaMoneyBillWave size={24} />} 
            color="success"
            footer="+15% vs ontem"
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Serviços Ativos" 
            value="8" 
            icon={<FaTools size={24} />} 
            color="primary"
            footer="3 aguardando aprovação"
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Alertas Estoque" 
            value="12" 
            icon={<FaExclamationTriangle size={24} />} 
            color="warning"
            footer="Itens abaixo do mínimo"
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Novos Clientes" 
            value="24" 
            icon={<FaUsers size={24} />} 
            color="info"
            footer="Este mês"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={8}>
          <Card className="glass-card h-100">
            <Card.Body>
              <h5 className="card-title fw-bold mb-4">Últimos Serviços</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Serviço</th>
                      <th>Status</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>João Silva</td>
                      <td>Cópia Chave Tetra</td>
                      <td><span className="badge bg-success">Concluído</span></td>
                      <td>R$ 45,00</td>
                    </tr>
                    <tr>
                      <td>Maria Oliveira</td>
                      <td>Abertura Cofre</td>
                      <td><span className="badge bg-warning">Em Andamento</span></td>
                      <td>R$ 150,00</td>
                    </tr>
                    <tr>
                      <td>Oficina Central</td>
                      <td>Confecção Chave Codificada</td>
                      <td><span className="badge bg-primary">Aguardando Peça</span></td>
                      <td>R$ 380,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card h-100">
            <Card.Body>
              <h5 className="card-title fw-bold mb-4">Metas do Mês</h5>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Faturamento</span>
                  <span className="fw-bold">75%</span>
                </div>
                <ProgressBar variant="success" now={75} />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Novos Clientes</span>
                  <span className="fw-bold">40%</span>
                </div>
                <ProgressBar variant="info" now={40} />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span>Serviços Realizados</span>
                  <span className="fw-bold">90%</span>
                </div>
                <ProgressBar variant="primary" now={90} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

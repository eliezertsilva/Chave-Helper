import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Spinner } from 'react-bootstrap';
import { 
  FaChartLine, FaBoxOpen, FaDollarSign, FaUsers, 
  FaCheckCircle, FaClock, FaTools, FaTrophy
} from 'react-icons/fa';
import { reportsService } from '../../services/api';

const Reports = () => {
  const [dashboard, setDashboard] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [serviceStatus, setServiceStatus] = useState([]);
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [inventoryTurnover, setInventoryTurnover] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashData, productsData, statusData, revenueData, turnoverData] = await Promise.all([
        reportsService.getDashboard(),
        reportsService.getTopProducts(10),
        reportsService.getServiceStatus(),
        reportsService.getRevenueByCategory(),
        reportsService.getInventoryTurnover()
      ]);

      setDashboard(dashData.data);
      setTopProducts(productsData.data);
      setServiceStatus(statusData.data);
      setRevenueByCategory(revenueData.data);
      setInventoryTurnover(turnoverData.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle className="text-success" />;
      case 'in_progress': return <FaTools className="text-primary" />;
      case 'pending': return <FaClock className="text-warning" />;
      default: return <FaClock />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: 'Concluído',
      in_progress: 'Em Andamento',
      pending: 'Pendente',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <FaChartLine className="me-2" />
          Relatórios e Análises
        </h1>
        <p className="text-muted">Visão geral do desempenho do negócio</p>
      </div>

      {/* Dashboard Cards */}
      {dashboard && (
        <Row className="mb-4 g-4">
          <Col md={3}>
            <Card className="glass-card border-0 h-100 bg-primary bg-opacity-10">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 rounded bg-primary text-white me-3">
                    <FaTools />
                  </div>
                  <h6 className="text-primary mb-0 fw-bold">Serviços</h6>
                </div>
                <h2 className="fw-bold mb-1">{dashboard.services.total}</h2>
                <small className="text-muted">
                  {dashboard.services.thisMonth} este mês
                </small>
                <div className="mt-2">
                  <Badge bg="success" className="me-2">
                    {dashboard.services.completionRate}% concluídos
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="glass-card border-0 h-100 bg-success bg-opacity-10">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 rounded bg-success text-white me-3">
                    <FaDollarSign />
                  </div>
                  <h6 className="text-success mb-0 fw-bold">Receita Total</h6>
                </div>
                <h2 className="fw-bold mb-1">
                  R$ {parseFloat(dashboard.financial.totalRevenue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <small className="text-muted">
                  R$ {parseFloat(dashboard.financial.monthRevenue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês
                </small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="glass-card border-0 h-100 bg-warning bg-opacity-10">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 rounded bg-warning text-dark me-3">
                    <FaBoxOpen />
                  </div>
                  <h6 className="text-warning mb-0 fw-bold">Estoque</h6>
                </div>
                <h2 className="fw-bold mb-1">{dashboard.inventory.totalProducts}</h2>
                <small className="text-muted">
                  {dashboard.inventory.lowStockProducts} com estoque baixo
                </small>
                <div className="mt-2">
                  <Badge bg={dashboard.inventory.stockHealth > 80 ? 'success' : 'warning'}>
                    {dashboard.inventory.stockHealth}% saudável
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="glass-card border-0 h-100 bg-info bg-opacity-10">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 rounded bg-info text-white me-3">
                    <FaUsers />
                  </div>
                  <h6 className="text-info mb-0 fw-bold">Clientes</h6>
                </div>
                <h2 className="fw-bold mb-1">{dashboard.clients.total}</h2>
                <small className="text-muted">
                  {dashboard.clients.active} ativos
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className="g-4 mb-4">
        {/* Top Products */}
        <Col md={6}>
          <Card className="glass-card h-100">
            <Card.Header className="bg-transparent border-0 pt-4">
              <h5 className="fw-bold mb-0">
                <FaTrophy className="text-warning me-2" />
                Produtos Mais Usados
              </h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th className="text-center">Qtd Usada</th>
                    <th className="text-center">Vezes</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.slice(0, 5).map((item, index) => (
                    <tr key={item.ProductId}>
                      <td className="fw-bold">{index + 1}</td>
                      <td>
                        <div className="fw-bold">{item.Product?.name}</div>
                        <small className="text-muted">{item.Product?.category}</small>
                      </td>
                      <td className="text-center">
                        <Badge bg="primary">{item.totalUsed}</Badge>
                      </td>
                      <td className="text-center">
                        <Badge bg="secondary">{item.timesUsed}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Service Status Distribution */}
        <Col md={6}>
          <Card className="glass-card h-100">
            <Card.Header className="bg-transparent border-0 pt-4">
              <h5 className="fw-bold mb-0">
                <FaChartLine className="text-primary me-2" />
                Status dos Serviços
              </h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Status</th>
                    <th className="text-end">Quantidade</th>
                    <th className="text-end">Percentual</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceStatus.map((item) => {
                    const total = serviceStatus.reduce((sum, s) => sum + parseInt(s.count), 0);
                    const percentage = total > 0 ? ((parseInt(item.count) / total) * 100).toFixed(1) : 0;
                    return (
                      <tr key={item.status}>
                        <td>
                          {getStatusIcon(item.status)}
                          <span className="ms-2">{getStatusLabel(item.status)}</span>
                        </td>
                        <td className="text-end fw-bold">{item.count}</td>
                        <td className="text-end">
                          <Badge bg="secondary">{percentage}%</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {/* Revenue by Category */}
        <Col md={6}>
          <Card className="glass-card h-100">
            <Card.Header className="bg-transparent border-0 pt-4">
              <h5 className="fw-bold mb-0">
                <FaDollarSign className="text-success me-2" />
                Receita por Categoria
              </h5>
            </Card.Header>
            <Card.Body>
              {revenueByCategory.length > 0 ? (
                <Table hover responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Categoria</th>
                      <th className="text-end">Valor</th>
                      <th className="text-center">Transações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueByCategory.map((item) => (
                      <tr key={item.category}>
                        <td className="fw-bold">{item.category || 'Sem categoria'}</td>
                        <td className="text-end text-success fw-bold">
                          R$ {parseFloat(item.total).toFixed(2).replace('.', ',')}
                        </td>
                        <td className="text-center">
                          <Badge bg="info">{item.count}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted">
                  <p>Nenhuma receita registrada ainda</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Inventory Turnover */}
        <Col md={6}>
          <Card className="glass-card h-100">
            <Card.Header className="bg-transparent border-0 pt-4">
              <h5 className="fw-bold mb-0">
                <FaBoxOpen className="text-warning me-2" />
                Giro de Estoque
              </h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Produto</th>
                    <th className="text-center">Estoque</th>
                    <th className="text-center">Usado</th>
                    <th className="text-end">Taxa</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryTurnover
                    .sort((a, b) => b.turnoverRate - a.turnoverRate)
                    .slice(0, 5)
                    .map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-bold">{item.name}</div>
                          <small className="text-muted">{item.category}</small>
                        </td>
                        <td className="text-center">
                          <Badge bg={item.stock <= item.minStock ? 'danger' : 'success'}>
                            {item.stock}
                          </Badge>
                        </td>
                        <td className="text-center">{item.totalUsed}</td>
                        <td className="text-end">
                          <Badge bg={item.turnoverRate > 1 ? 'success' : 'warning'}>
                            {item.turnoverRate}x
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;

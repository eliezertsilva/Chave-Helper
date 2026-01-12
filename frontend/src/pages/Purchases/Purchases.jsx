import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEye, FaFileDownload, FaShoppingCart, FaTruck } from 'react-icons/fa';

const Purchases = () => {
  // Mock data
  const [orders, setOrders] = useState([
    { id: 2001, supplier: 'Distribuidora Chaves Brasil', date: '2024-01-05', total: 1250.00, items: 15, status: 'received', delivery: '2024-01-08' },
    { id: 2002, supplier: 'Yale Brasil', date: '2024-01-10', total: 4500.00, items: 4, status: 'shipped', delivery: '2024-01-15' },
    { id: 2003, supplier: 'AutoParts Peças', date: '2024-01-11', total: 850.00, items: 10, status: 'processing', delivery: '2024-01-18' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'received': return <Badge bg="success">Recebido</Badge>;
      case 'shipped': return <Badge bg="primary">Em Trânsito</Badge>;
      case 'processing': return <Badge bg="warning" text="dark">Processando</Badge>;
      case 'cancelled': return <Badge bg="danger">Cancelado</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Compras e Pedidos</h1>
          <p className="text-muted">Gerencie aquisições de estoque e insumos</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaShoppingCart /> Novo Pedido de Compra
        </Button>
      </div>

      <Row className="mb-4 g-4">
        <Col md={3}>
           <Card className="glass-card border-0 h-100 bg-info bg-opacity-10">
             <Card.Body className="d-flex align-items-center">
               <div className="p-3 rounded-circle bg-info text-dark me-3">
                 <FaTruck size={20} />
               </div>
               <div>
                 <h6 className="text-muted mb-0">Pedidos em Aberto</h6>
                 <h3 className="fw-bold mb-0">2</h3>
               </div>
             </Card.Body>
           </Card>
        </Col>
        <Col md={3}>
           <Card className="glass-card border-0 h-100 bg-success bg-opacity-10">
             <Card.Body className="d-flex align-items-center">
               <div className="p-3 rounded-circle bg-success text-white me-3">
                 <FaFileDownload size={20} />
               </div>
               <div>
                 <h6 className="text-muted mb-0">Total Mês Atual</h6>
                 <h3 className="fw-bold mb-0">R$ 6.600,00</h3>
               </div>
             </Card.Body>
           </Card>
        </Col>
      </Row>

      <Card className="glass-card mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Buscar por número do pedido ou fornecedor..." 
                  className="border-start-0 ps-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">Todos os Status</option>
                <option value="processing">Processando</option>
                <option value="shipped">Em Trânsito</option>
                <option value="received">Recebido</option>
              </Form.Select>
            </Col>
            <Col md={3}>
               <Form.Control type="month" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="glass-card">
        <Card.Body className="p-0">
          <Table hover responsive className="table-borderless align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="ps-4">Pedido #</th>
                <th>Fornecedor</th>
                <th>Data Pedido</th>
                <th>Previsão Entrega</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4 fw-bold text-primary">#{order.id}</td>
                  <td className="fw-bold">{order.supplier}</td>
                  <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(order.delivery).toLocaleDateString('pt-BR')}</td>
                  <td>{order.items} un</td>
                  <td className="fw-bold">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="text-end pe-4">
                    <Button variant="link" className="text-secondary p-1" title="Ver Detalhes"><FaEye /></Button>
                    <Button variant="link" className="text-primary p-1" title="Baixar PDF"><FaFileDownload /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Purchases;

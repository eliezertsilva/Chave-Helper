import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, Tab, Tabs, Modal } from 'react-bootstrap';
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaChartLine } from 'react-icons/fa';
import { financeService } from '../../services/api';

const Finance = () => {
  const [key, setKey] = useState('overview');
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    type: 'income',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
    category: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [transRes, sumRes] = await Promise.all([
        financeService.getAll(),
        financeService.getSummary()
      ]);
      setTransactions(transRes.data);
      setSummary(sumRes.data);
    } catch (error) {
      console.error('Error loading finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (type) => {
    setTransactionType(type);
    setFormData({ ...formData, type });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await financeService.create(formData);
      loadData();
      handleClose();
      setFormData({
        description: '',
        value: '',
        type: 'income',
        status: 'pending',
        dueDate: new Date().toISOString().split('T')[0],
        category: ''
      });
    } catch (error) {
      alert('Erro ao salvar transação');
    }
  };

  const payables = transactions.filter(t => t.type === 'expense');
  const receivables = transactions.filter(t => t.type === 'income');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': 
      case 'received': return <Badge bg="success">Pago/Recebido</Badge>;
      case 'pending': return <Badge bg="warning" text="dark">Pendente</Badge>;
      case 'overdue': return <Badge bg="danger">Atrasado</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Gestão Financeira</h1>
          <p className="text-muted">Controle de fluxo de caixa, contas a pagar e receber</p>
        </div>
        <div className="d-flex gap-2">
           <Button variant="outline-danger" className="d-flex align-items-center gap-2" onClick={() => handleShow('expense')}>
            <FaArrowDown /> Nova Despesa
          </Button>
          <Button variant="outline-success" className="d-flex align-items-center gap-2" onClick={() => handleShow('income')}>
            <FaArrowUp /> Nova Receita
          </Button>
        </div>
      </div>

      <Row className="mb-4 g-4">
        <Col md={4}>
           <Card className="glass-card border-0 h-100 bg-success bg-opacity-10">
             <Card.Body>
               <div className="d-flex align-items-center mb-2">
                 <div className="p-2 rounded bg-success text-white me-3"><FaArrowUp /></div>
                 <h6 className="text-success mb-0 fw-bold">Receitas</h6>
               </div>
               <h3 className="fw-bold mb-0">R$ {summary.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
             </Card.Body>
           </Card>
        </Col>
        <Col md={4}>
           <Card className="glass-card border-0 h-100 bg-danger bg-opacity-10">
             <Card.Body>
               <div className="d-flex align-items-center mb-2">
                 <div className="p-2 rounded bg-danger text-white me-3"><FaArrowDown /></div>
                 <h6 className="text-danger mb-0 fw-bold">Despesas</h6>
               </div>
               <h3 className="fw-bold mb-0">R$ {summary.totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
             </Card.Body>
           </Card>
        </Col>
         <Col md={4}>
           <Card className="glass-card border-0 h-100 bg-primary bg-opacity-10">
             <Card.Body>
               <div className="d-flex align-items-center mb-2">
                 <div className="p-2 rounded bg-primary text-white me-3"><FaMoneyBillWave /></div>
                 <h6 className="text-primary mb-0 fw-bold">Saldo Atual</h6>
               </div>
               <h3 className="fw-bold mb-0">R$ {summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
               <small className="text-muted">Caixa + Bancos</small>
             </Card.Body>
           </Card>
        </Col>
      </Row>

      <Card className="glass-card">
        <Card.Body>
          <Tabs
            id="finance-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-4 border-bottom-0"
          >
            <Tab eventKey="overview" title="Fluxo de Caixa">
               <h5 className="mb-4 fw-bold">Movimentações Recentes</h5>
               <Card className="border-0 bg-light mb-3">
                 <Card.Body className="text-center py-5 text-muted">
                   <FaChartLine size={40} className="mb-3 opacity-50" />
                   <p>Gráfico de Fluxo de Caixa (Em Breve)</p>
                 </Card.Body>
               </Card>
            </Tab>
            
            <Tab eventKey="payables" title="Contas a Pagar">
               <Table hover responsive className="table-borderless align-middle">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payables.map(item => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.description}</td>
                      <td>{item.category}</td>
                      <td>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</td>
                      <td className="text-danger fw-bold">- R$ {parseFloat(item.value).toFixed(2).replace('.', ',')}</td>
                      <td>{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="receivables" title="Contas a Receber">
               <Table hover responsive className="table-borderless align-middle">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th>Descrição</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                   {receivables.map(item => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.description}</td>
                      <td>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</td>
                      <td className="text-success fw-bold">+ R$ {parseFloat(item.value).toFixed(2).replace('.', ',')}</td>
                      <td>{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Nova {transactionType === 'income' ? 'Receita' : 'Despesa'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descrição</Form.Label>
              <Form.Control 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Valor (R$)</Form.Label>
              <Form.Control 
                type="number"
                step="0.01"
                required
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Data</Form.Label>
                  <Form.Control 
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Categoria</Form.Label>
                  <Form.Control 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 p-4 pt-0">
            <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant={transactionType === 'income' ? 'success' : 'danger'} type="submit" className="px-5 fw-bold">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Finance;

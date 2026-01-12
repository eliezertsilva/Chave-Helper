import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, Tab, Tabs, ProgressBar } from 'react-bootstrap';
import { FaPlus, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';

const Finance = () => {
  const [key, setKey] = useState('overview');

  // Mock Data
  const payables = [
    { id: 1, description: 'Aluguel Loja', category: 'Despesas Fixas', value: 2500.00, dueDate: '2024-01-15', status: 'pending', supplier: 'Imobiliária Central' },
    { id: 2, description: 'Compra de Chaves Virgens', category: 'Fornecedores', value: 850.00, dueDate: '2024-01-20', status: 'paid', supplier: 'Distribuidora Chaves' },
    { id: 3, description: 'Energia Elétrica', category: 'Despesas Fixas', value: 320.00, dueDate: '2024-01-10', status: 'overdue', supplier: 'Enel' },
  ];

  const receivables = [
    { id: 1, description: 'Serviço #102 - Confecção Chave', client: 'Oficina Central', value: 380.00, dueDate: '2024-01-12', status: 'received' },
    { id: 2, description: 'Venda Balcão', client: 'Consumidor Final', value: 150.00, dueDate: '2024-01-11', status: 'received' },
    { id: 3, description: 'Serviço #105 - Troca Fechadura', client: 'Condomínio Solar', value: 1200.00, dueDate: '2024-01-30', status: 'pending' },
  ];

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
           <Button variant="outline-danger" className="d-flex align-items-center gap-2">
            <FaArrowDown /> Nova Despesa
          </Button>
          <Button variant="outline-success" className="d-flex align-items-center gap-2">
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
                 <h6 className="text-success mb-0 fw-bold">Receitas (Mês)</h6>
               </div>
               <h3 className="fw-bold mb-0">R$ 15.450,00</h3>
               <small className="text-success">+12% vs mês anterior</small>
             </Card.Body>
           </Card>
        </Col>
        <Col md={4}>
           <Card className="glass-card border-0 h-100 bg-danger bg-opacity-10">
             <Card.Body>
               <div className="d-flex align-items-center mb-2">
                 <div className="p-2 rounded bg-danger text-white me-3"><FaArrowDown /></div>
                 <h6 className="text-danger mb-0 fw-bold">Despesas (Mês)</h6>
               </div>
               <h3 className="fw-bold mb-0">R$ 8.230,00</h3>
               <small className="text-danger">+5% vs mês anterior</small>
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
               <h3 className="fw-bold mb-0">R$ 7.220,00</h3>
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
                    <th>Fornecedor</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {payables.map(item => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.description}</td>
                      <td>{item.category}</td>
                      <td>{item.supplier}</td>
                      <td>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</td>
                      <td className="text-danger fw-bold">- R$ {item.value.toFixed(2).replace('.', ',')}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td><Button size="sm" variant="outline-primary">Editar</Button></td>
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
                    <th>Cliente</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                   {receivables.map(item => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.description}</td>
                      <td>{item.client}</td>
                      <td>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</td>
                      <td className="text-success fw-bold">+ R$ {item.value.toFixed(2).replace('.', ',')}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td><Button size="sm" variant="outline-primary">Detalhes</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Finance;

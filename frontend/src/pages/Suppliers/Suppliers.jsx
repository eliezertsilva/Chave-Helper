import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaPhone, FaEnvelope, FaTruck } from 'react-icons/fa';

const Suppliers = () => {
  // Mock data
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Distribuidora Chaves Brasil', contact: 'Carlos', phone: '(11) 3333-2222', email: 'vendas@chavesbrasil.com.br', category: 'Chaves e Fechaduras', status: 'active' },
    { id: 2, name: 'Yale Brasil', contact: 'Fernanda', phone: '0800 555 1234', email: 'comercial@yale.com.br', category: 'Fechaduras Digitais', status: 'active' },
    { id: 3, name: 'AutoParts Peças', contact: 'Roberto', phone: '(11) 98888-1111', email: 'roberto@autoparts.com', category: 'Automotivo', status: 'inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Fornecedores</h1>
          <p className="text-muted">Gestão de parceiros e distribuidores</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaPlus /> Novo Fornecedor
        </Button>
      </div>

      <Card className="glass-card mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Buscar fornecedor, contato ou categoria..." 
                  className="border-start-0 ps-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">Todas as Categorias</option>
                <option value="Chaves">Chaves</option>
                <option value="Fechaduras">Fechaduras</option>
                <option value="Automotivo">Automotivo</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="glass-card">
        <Card.Body className="p-0">
          <Table hover responsive className="table-borderless align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="ps-4">Empresa</th>
                <th>Categoria</th>
                <th>Contato Principal</th>
                <th>Canais de Atendimento</th>
                <th>Status</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="ps-4">
                    <div className="fw-bold">{supplier.name}</div>
                    <small className="text-muted"><FaTruck size={10} className="me-1"/> Fornecedor</small>
                  </td>
                  <td><Badge bg="info" text="dark" className="fw-normal">{supplier.category}</Badge></td>
                  <td>{supplier.contact}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <FaPhone className="text-success" /> {supplier.phone}
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                         <FaEnvelope className="text-primary" /> {supplier.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    {supplier.status === 'active' ? <Badge bg="success">Ativo</Badge> : <Badge bg="secondary">Inativo</Badge>}
                  </td>
                  <td className="text-end pe-4">
                    <Button variant="link" className="text-secondary p-1"><FaEdit /></Button>
                    <Button variant="link" className="text-danger p-1"><FaTrash /></Button>
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

export default Suppliers;

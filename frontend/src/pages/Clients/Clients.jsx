import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { clientsService } from '../../services/api';

const Clients = () => {
  // Mock data
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await clientsService.getAll();
      setClients(response.data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Gestão de Clientes</h1>
          <p className="text-muted">Gerencie sua base de clientes e históricos</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaPlus /> Novo Cliente
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
                  placeholder="Buscar por nome, CPF/CNPJ ou telefone..." 
                  className="border-start-0 ps-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">Todos os Status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
                <option value="debt">Inadimplentes</option>
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
                <th className="ps-4">Nome / Razão Social</th>
                <th>Documento</th>
                <th>Contatos</th>
                <th>Endereço</th>
                <th>Status</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="ps-4">
                    <div className="fw-bold">{client.name}</div>
                    <small className="text-muted">{client.type}</small>
                  </td>
                  <td>{client.doc}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <FaWhatsapp className="text-success" /> {client.phone}
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <FaEnvelope className="text-primary" /> {client.email}
                      </div>
                    </div>
                  </td>
                  <td><span className="text-truncate d-block" style={{maxWidth: '200px'}}>{client.address}</span></td>
                  <td>
                    {client.status === 'active' && <Badge bg="success">Ativo</Badge>}
                    {client.status === 'inactive' && <Badge bg="secondary">Inativo</Badge>}
                    {client.status === 'debt' && <Badge bg="danger">Inadimplente</Badge>}
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

export default Clients;

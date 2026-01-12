import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTools, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { servicesService } from '../../services/api';

const Services = () => {
  // Mock data
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await servicesService.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <Badge bg="success"><FaCheckCircle className="me-1"/> Concluído</Badge>;
      case 'in_progress': return <Badge bg="primary"><FaTools className="me-1"/> Em Andamento</Badge>;
      case 'pending': return <Badge bg="warning" text="dark"><FaClock className="me-1"/> Pendente</Badge>;
      case 'waiting_parts': return <Badge bg="info" text="dark">Aguardando Peça</Badge>;
      case 'cancelled': return <Badge bg="danger"><FaTimesCircle className="me-1"/> Cancelado</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Gestão de Serviços</h1>
          <p className="text-muted">Ordens de serviço e acompanhamento técnico</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaPlus /> Nova OS
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
                  placeholder="Buscar por cliente, tipo de serviço ou OS..." 
                  className="border-start-0 ps-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="">Todos os Status</option>
                <option value="in_progress">Em Andamento</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídos</option>
              </Form.Select>
            </Col>
            <Col md={3}>
               <Form.Control type="date" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="glass-card">
        <Card.Body className="p-0">
          <Table hover responsive className="table-borderless align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="ps-4">OS #</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Previsão/SLA</th>
                <th>Valor</th>
                <th>Status</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="ps-4 fw-bold">#{service.id}</td>
                  <td>{service.client}</td>
                  <td>{service.type}</td>
                  <td>{new Date(service.date).toLocaleDateString('pt-BR')}</td>
                  <td>{service.sla}</td>
                  <td className="fw-bold">R$ {service.value.toFixed(2).replace('.', ',')}</td>
                  <td>{getStatusBadge(service.status)}</td>
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

export default Services;

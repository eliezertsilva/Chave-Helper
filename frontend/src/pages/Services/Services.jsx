import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTools, FaClock, FaCheckCircle, FaTimesCircle, FaChevronDown } from 'react-icons/fa';
import { servicesService, clientsService } from '../../services/api';

const Services = () => {
  // Mock data
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    ClientId: ''
  });

  useEffect(() => {
    loadServices();
    loadClients();
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

  const loadClients = async () => {
    try {
      const response = await clientsService.getAll();
      setClients(response.data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servicesService.create(formData);
      loadServices();
      handleClose();
      setFormData({ description: '', value: '', ClientId: '' });
    } catch (error) {
      alert('Erro ao criar OS');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await servicesService.updateStatus(id, newStatus);
      loadServices();
    } catch (error) {
      alert('Erro ao atualizar status');
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
        <Button variant="primary" className="d-flex align-items-center gap-2" onClick={handleShow}>
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
                  <td>{service.description}</td>
                  <td>{new Date(service.date).toLocaleDateString('pt-BR')}</td>
                  <td>-</td>
                  <td className="fw-bold">R$ {parseFloat(service.value).toFixed(2).replace('.', ',')}</td>
                  <td>
                    <Form.Select 
                      size="sm" 
                      className="border-0 bg-transparent fw-bold" 
                      value={service.status}
                      onChange={(e) => handleStatusChange(service.id, e.target.value)}
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em Andamento</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                    </Form.Select>
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Abrir Nova OS</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Cliente</Form.Label>
              <Form.Select 
                required
                value={formData.ClientId}
                onChange={(e) => setFormData({...formData, ClientId: e.target.value})}
              >
                <option value="">Selecione um cliente...</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descrição do Serviço</Form.Label>
              <Form.Control 
                required
                placeholder="Ex: Cópia de chave tetra, Abertura de porta..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Valor Estimado (R$)</Form.Label>
              <Form.Control 
                type="number"
                step="0.01"
                required
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 p-4 pt-0">
            <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="px-5 fw-bold">
              Abrir OS
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;

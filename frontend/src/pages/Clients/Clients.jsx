import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, Spinner, Modal } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { clientsService } from '../../services/api';

const Clients = () => {
  // Mock data
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'PF',
    document: '',
    phone: '',
    email: '',
    address: ''
  });

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

  const handleShow = (client = null) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        type: client.type,
        document: client.document,
        phone: client.phone,
        email: client.email || '',
        address: client.address || ''
      });
    } else {
      setEditingClient(null);
      setFormData({ name: '', type: 'PF', document: '', phone: '', email: '', address: '' });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await clientsService.update(editingClient.id, formData);
      } else {
        await clientsService.create(formData);
      }
      loadClients();
      handleClose();
    } catch (error) {
      alert('Erro ao salvar cliente');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clientsService.delete(id);
        loadClients();
      } catch (error) {
        alert('Erro ao excluir cliente');
      }
    }
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Gestão de Clientes</h1>
          <p className="text-muted">Gerencie sua base de clientes e históricos</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2" onClick={() => handleShow()}>
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
                  <td>{client.document}</td>
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
                    <Button variant="link" className="text-secondary p-1" onClick={() => handleShow(client)}><FaEdit /></Button>
                    <Button variant="link" className="text-danger p-1" onClick={() => handleDelete(client.id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nome Completo / Razão Social</Form.Label>
                  <Form.Control 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Tipo</Form.Label>
                  <Form.Select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="PF">Pessoa Física</option>
                    <option value="PJ">Pessoa Jurídica</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">CPF / CNPJ</Form.Label>
                  <Form.Control 
                    required
                    value={formData.document}
                    onChange={(e) => setFormData({...formData, document: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Telefone / WhatsApp</Form.Label>
                  <Form.Control 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">E-mail</Form.Label>
                  <Form.Control 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Endereço Completo</Form.Label>
                  <Form.Control 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-4">
            <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="px-4 fw-bold">
              {editingClient ? 'Salvar Alterações' : 'Cadastrar Cliente'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;

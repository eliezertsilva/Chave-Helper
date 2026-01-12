import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, ProgressBar, Modal } from 'react-bootstrap';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { inventoryService } from '../../services/api';

const Inventory = () => {
  // Mock data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    minStock: '',
    category: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await inventoryService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await inventoryService.create(formData);
      loadProducts();
      handleClose();
      setFormData({ name: '', description: '', price: '', stock: '', minStock: '', category: '' });
    } catch (error) {
      alert('Erro ao cadastrar produto');
    }
  };

  const handleStockUpdate = async (id, newStock) => {
    try {
      await inventoryService.updateStock(id, newStock);
      loadProducts();
    } catch (error) {
       alert('Erro ao atualizar estoque');
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const getStockStatus = (stock, min) => {
    if (stock <= 0) return <Badge bg="danger">Sem Estoque</Badge>;
    if (stock <= min) return <Badge bg="warning" text="dark">Baixo Estoque</Badge>;
    return <Badge bg="success">Normal</Badge>;
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Controle de Estoque</h1>
          <p className="text-muted">Gerenciamento de produtos, materiais e insumos</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-success" className="d-flex align-items-center gap-2">
            <FaBoxOpen /> Entrada/Saída
          </Button>
          <Button variant="primary" className="d-flex align-items-center gap-2" onClick={handleShow}>
            <FaPlus /> Novo Produto
          </Button>
        </div>
      </div>

      <Row className="mb-4 g-4">
        <Col md={3}>
           <Card className="glass-card border-0 h-100 bg-primary bg-opacity-10">
             <Card.Body className="d-flex align-items-center">
               <div className="p-3 rounded-circle bg-primary text-white me-3">
                 <FaBoxOpen size={20} />
               </div>
               <div>
                 <h6 className="text-muted mb-0">Total de Itens</h6>
                 <h3 className="fw-bold mb-0">208</h3>
               </div>
             </Card.Body>
           </Card>
        </Col>
        <Col md={3}>
           <Card className="glass-card border-0 h-100 bg-warning bg-opacity-10">
             <Card.Body className="d-flex align-items-center">
               <div className="p-3 rounded-circle bg-warning text-dark me-3">
                 <FaExclamationTriangle size={20} />
               </div>
               <div>
                 <h6 className="text-muted mb-0">Itens Críticos</h6>
                 <h3 className="fw-bold mb-0">3</h3>
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
                  placeholder="Buscar por nome, código ou fornecedor..." 
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
                <th className="ps-4">Produto</th>
                <th>Categoria</th>
                <th>Fornecedor</th>
                <th>Estoque Atual</th>
                <th>Status</th>
                <th>Preço Venda</th>
                <th className="text-end pe-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="ps-4 fw-bold">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.supplier}</td>
                  <td style={{width: '200px'}}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                       <span>{product.stock} un</span>
                       <small className="text-muted">Min: {product.minStock}</small>
                    </div>
                    <ProgressBar 
                      now={(product.stock / (product.minStock * 3)) * 100} 
                      variant={product.stock <= product.minStock ? 'warning' : 'success'} 
                      style={{height: '6px'}} 
                    />
                  </td>
                  <td>{getStockStatus(product.stock, product.minStock)}</td>
                  <td>R$ {parseFloat(product.price || 0).toFixed(2).replace('.', ',')}</td>
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

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Novo Produto</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Nome do Produto</Form.Label>
                  <Form.Control 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Descrição</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Preço de Venda (R$)</Form.Label>
                  <Form.Control 
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Categoria</Form.Label>
                  <Form.Select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="Chaves">Chaves</option>
                    <option value="Fechaduras">Fechaduras</option>
                    <option value="Cadeados">Cadeados</option>
                    <option value="Automotivo">Automotivo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Estoque Inicial</Form.Label>
                  <Form.Control 
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Estoque Mínimo</Form.Label>
                  <Form.Control 
                    type="number"
                    required
                    value={formData.minStock}
                    onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 p-4 pt-0">
            <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="px-5 fw-bold">
              Cadastrar Produto
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;

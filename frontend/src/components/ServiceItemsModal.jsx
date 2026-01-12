import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, InputGroup, Badge } from 'react-bootstrap';
import { FaPlus, FaTrash, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { serviceItemsService, inventoryService } from '../../services/api';

const ServiceItemsModal = ({ show, onHide, serviceId, onUpdate }) => {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && serviceId) {
      loadItems();
      loadProducts();
    }
  }, [show, serviceId]);

  const loadItems = async () => {
    try {
      const response = await serviceItemsService.getByService(serviceId);
      setItems(response.data);
    } catch (error) {
      console.error('Error loading service items:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await inventoryService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleAddItem = async () => {
    if (!selectedProduct || quantity <= 0) {
      alert('Selecione um produto e quantidade válida');
      return;
    }

    setLoading(true);
    try {
      const product = products.find(p => p.id === parseInt(selectedProduct));
      await serviceItemsService.create({
        ServiceId: serviceId,
        ProductId: parseInt(selectedProduct),
        quantity: parseInt(quantity),
        unitPrice: product.price
      });
      
      loadItems();
      setSelectedProduct('');
      setQuantity(1);
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Erro ao adicionar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Remover este produto do serviço?')) return;

    try {
      await serviceItemsService.delete(itemId);
      loadItems();
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Erro ao remover produto');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = items.reduce((sum, item) => 
    sum + (parseFloat(item.unitPrice) * item.quantity), 0
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">
          <FaBoxOpen className="me-2" />
          Produtos do Serviço
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* Add Product Section */}
        <div className="bg-light p-3 rounded mb-4">
          <h6 className="fw-bold mb-3">Adicionar Produto</h6>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Buscar Produto</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por nome ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          
          <div className="row g-3">
            <div className="col-md-7">
              <Form.Group>
                <Form.Label className="fw-semibold">Produto</Form.Label>
                <Form.Select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione um produto...</option>
                  {filteredProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - R$ {parseFloat(product.price || 0).toFixed(2)} 
                      {' '}(Estoque: {product.stock})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group>
                <Form.Label className="fw-semibold">Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <Button 
                variant="primary" 
                className="w-100"
                onClick={handleAddItem}
                disabled={loading}
              >
                <FaPlus className="me-1" /> Adicionar
              </Button>
            </div>
          </div>
        </div>

        {/* Items List */}
        <h6 className="fw-bold mb-3">Produtos Adicionados</h6>
        {items.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <FaBoxOpen size={40} className="mb-2 opacity-50" />
            <p>Nenhum produto adicionado ainda</p>
          </div>
        ) : (
          <>
            <Table hover responsive className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Produto</th>
                  <th className="text-center">Qtd</th>
                  <th className="text-end">Preço Unit.</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.Product?.name || 'N/A'}</td>
                    <td className="text-center">
                      <Badge bg="secondary">{item.quantity}</Badge>
                    </td>
                    <td className="text-end">
                      R$ {parseFloat(item.unitPrice).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="text-end fw-bold">
                      R$ {(parseFloat(item.unitPrice) * item.quantity).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="text-end">
                      <Button 
                        variant="link" 
                        className="text-danger p-1"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-top">
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td className="text-end fw-bold text-primary fs-5">
                    R$ {totalValue.toFixed(2).replace('.', ',')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceItemsModal;

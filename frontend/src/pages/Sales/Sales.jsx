import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, ListGroup } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaTrash, FaPlus, FaMinus, FaMoneyBillWave, FaBarcode, FaUser } from 'react-icons/fa';

const Sales = () => {
  // Mock Products
  const products = [
    { id: 1, name: 'Chave Pado 682', price: 5.50, stock: 150 },
    { id: 2, name: 'Fechadura Yale', price: 850.00, stock: 5 },
    { id: 3, name: 'Cadeado 30mm', price: 35.00, stock: 45 },
    { id: 4, name: 'Chave Automotiva VW', price: 120.00, stock: 8 },
    { id: 5, name: 'Serviço: Cópia Simples', price: 10.00, stock: 999 },
    { id: 6, name: 'Serviço: Abertura', price: 150.00, stock: 999 },
  ];

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
         return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Vendas & PDV</h1>
          <p className="text-muted">Ponto de venda e emissão de notas</p>
        </div>
        <div>
           <Badge bg="success" className="p-2 fs-6">Caixa Aberto</Badge>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Column: Product Selection */}
        <Col md={7}>
          <Card className="glass-card mb-4 border-0">
             <Card.Body>
               <InputGroup size="lg" className="mb-4">
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch className="text-primary" />
                  </InputGroup.Text>
                  <Form.Control 
                    placeholder="Buscar produto ou serviço..." 
                    className="border-start-0 ps-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <Button variant="outline-primary"><FaBarcode /></Button>
               </InputGroup>

               <h6 className="fw-bold mb-3 text-muted text-uppercase small">Produtos Disponíveis</h6>
               <div className="d-flex flex-column gap-2" style={{maxHeight: '500px', overflowY: 'auto'}}>
                 {filteredProducts.map(product => (
                   <Card key={product.id} className="border-0 shadow-sm hover-shadow" role="button" onClick={() => addToCart(product)}>
                     <Card.Body className="d-flex justify-content-between align-items-center p-3">
                       <div>
                         <h6 className="mb-0 fw-bold">{product.name}</h6>
                         <small className="text-muted">Estoque: {product.stock === 999 ? 'Infinito' : product.stock}</small>
                       </div>
                       <div className="text-end">
                         <div className="fw-bold text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</div>
                         <small className="text-muted text-uppercase" style={{fontSize: '0.65rem'}}><FaPlus size={8} /> Adicionar</small>
                       </div>
                     </Card.Body>
                   </Card>
                 ))}
                 {filteredProducts.length === 0 && <div className="text-center text-muted py-5">Nenhum produto encontrado.</div>}
               </div>
             </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Cart & Checkout */}
        <Col md={5}>
          <Card className="glass-card h-100 border-primary border-2">
            <Card.Header className="bg-white border-bottom-0 pt-4 px-4 pb-0">
               <div className="mb-3">
                  <label className="small text-muted mb-1">Cliente</label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white"><FaUser /></InputGroup.Text>
                    <Form.Control placeholder="Cliente (Opcional)" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} />
                  </InputGroup>
               </div>
               <h5 className="fw-bold d-flex align-items-center gap-2">
                 <FaShoppingCart /> Carrinho de Compras
               </h5>
            </Card.Header>
            <Card.Body className="d-flex flex-column p-0">
              <div className="flex-grow-1 overflow-auto p-3" style={{maxHeight: '400px'}}>
                <ListGroup variant="flush">
                  {cart.map(item => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center bg-transparent border-bottom">
                       <div style={{flex: 1}}>
                         <div className="fw-bold text-truncate">{item.name}</div>
                         <div className="small text-muted">R$ {item.price.toFixed(2).replace('.', ',')} un</div>
                       </div>
                       <div className="d-flex align-items-center mx-2">
                          <Button variant="light" size="sm" className="rounded-circle p-0" style={{width: 24, height: 24}} onClick={() => updateQuantity(item.id, -1)}><FaMinus size={10} /></Button>
                          <span className="mx-2 fw-bold">{item.quantity}</span>
                          <Button variant="light" size="sm" className="rounded-circle p-0" style={{width: 24, height: 24}} onClick={() => updateQuantity(item.id, 1)}><FaPlus size={10} /></Button>
                       </div>
                       <div className="text-end" style={{minWidth: '70px'}}>
                          <div className="fw-bold">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                          <FaTrash className="text-danger small cursor-pointer" style={{cursor: 'pointer'}} onClick={() => removeFromCart(item.id)} />
                       </div>
                    </ListGroup.Item>
                  ))}
                  {cart.length === 0 && (
                    <div className="text-center text-muted py-5">
                      <FaShoppingCart size={40} className="mb-3 opacity-25" />
                      <p>O carrinho está vazio</p>
                    </div>
                  )}
                </ListGroup>
              </div>
              
              <div className="mt-auto bg-light p-4 border-top">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                 <div className="d-flex justify-content-between mb-4">
                  <span>Desconto</span>
                  <span className="text-success">- R$ 0,00</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <h4 className="fw-bold">Total</h4>
                  <h4 className="fw-bold text-primary">R$ {total.toFixed(2).replace('.', ',')}</h4>
                </div>
                
                <div className="d-grid gap-2">
                   <Button variant="success" size="lg" disabled={cart.length === 0}>
                     <FaMoneyBillWave className="me-2" /> Finalizar Venda
                   </Button>
                   <Button variant="outline-danger">Cancelar</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Sales;

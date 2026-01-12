import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaExchangeAlt, FaKey, FaPlus, FaLink } from 'react-icons/fa';

const Compatibility = () => {
  // Mock Data: Key Models
  const [keys, setKeys] = useState([
    { id: 1, brand: 'Pado', model: '682', type: 'Yale', image: 'https://placehold.co/50x50?text=Key' },
    { id: 2, brand: 'Land', model: '442', type: 'Yale', image: 'https://placehold.co/50x50?text=Key' },
    { id: 3, brand: 'Gold', model: '901', type: 'Yale', image: 'https://placehold.co/50x50?text=Key' },
    { id: 4, brand: 'Jas', model: '590', type: 'Yale', image: 'https://placehold.co/50x50?text=Key' },
    { id: 5, brand: 'Aliança', model: 'A500', type: 'Tetra', image: 'https://placehold.co/50x50?text=Key' },
  ]);

  // Mock Data: Compatibilities (Adjacency list style or pairs)
  // Mapping ID -> List of IDs
  const compatibilityMap = {
    1: [2, 4], // Pado 682 <-> Land 442, Jas 590
    2: [1, 4], // Land 442 <-> Pado 682, Jas 590
    4: [1, 2], // Jas 590 <-> Pado 682, Land 442
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKey, setSelectedKey] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredKeys = keys.filter(k => 
    k.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    k.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompatibleKeys = (keyId) => {
    const compatibleIds = compatibilityMap[keyId] || [];
    return keys.filter(k => compatibleIds.includes(k.id));
  };

  const handleShowDetails = (keyItem) => {
    setSelectedKey(keyItem);
    setShowModal(true);
  };

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Compatibilidade de Chaves</h1>
          <p className="text-muted">Busque e identifique modelos equivalentes</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaPlus /> Novo Modelo
        </Button>
      </div>

      <Card className="glass-card mb-4">
        <Card.Body>
          <Row className="justify-content-center">
             <Col md={8}>
               <InputGroup size="lg">
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-primary" />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Digite a marca ou modelo (ex: Pado 682)..." 
                  className="border-start-0 ps-0"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="primary">Buscar</Button>
              </InputGroup>
             </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col md={12}>
          <Card className="glass-card">
            <Card.Body>
              <h5 className="card-title fw-bold mb-4">Catálogo de Chaves</h5>
              <Table hover responsive className="table-borderless align-middle">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th style={{width: '80px'}}>Imag.</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Tipo</th>
                    <th>Compatíveis</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeys.map(keyItem => {
                    const compatibles = getCompatibleKeys(keyItem.id);
                    return (
                      <tr key={keyItem.id}>
                        <td>
                          <img src={keyItem.image} alt={keyItem.model} className="rounded" width="40" height="40" />
                        </td>
                        <td className="fw-bold">{keyItem.brand}</td>
                        <td>{keyItem.model}</td>
                        <td><Badge bg="secondary">{keyItem.type}</Badge></td>
                        <td>
                          <div className="d-flex gap-1 flex-wrap">
                            {compatibles.length > 0 ? (
                              compatibles.map(c => (
                                <Badge key={c.id} bg="info" className="d-flex align-items-center gap-1">
                                  <FaExchangeAlt size={10} /> {c.brand} {c.model}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted small">Nenhuma registrada</span>
                            )}
                          </div>
                        </td>
                        <td className="text-end">
                           <Button variant="outline-primary" size="sm" onClick={() => handleShowDetails(keyItem)}>
                             Detalhes
                           </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Compatibilidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedKey && (
            <div className="text-center">
               <FaKey size={50} className="text-primary mb-3" />
               <h4>{selectedKey.brand} - {selectedKey.model}</h4>
               <p className="text-muted">{selectedKey.type}</p>
               
               <hr />
               
               <h6 className="text-start fw-bold mb-3">Modelos Compatíveis (Substitutos):</h6>
               <div className="d-flex flex-column gap-2">
                 {getCompatibleKeys(selectedKey.id).map(c => (
                   <Card key={c.id} className="border bg-light">
                     <Card.Body className="d-flex justify-content-between align-items-center p-2">
                        <div className="d-flex align-items-center gap-3">
                           <FaExchangeAlt className="text-success" /> 
                           <span className="fw-bold">{c.brand} {c.model}</span>
                        </div>
                        <Badge bg="success">Compatível</Badge>
                     </Card.Body>
                   </Card>
                 ))}
                 {getCompatibleKeys(selectedKey.id).length === 0 && <p className="text-muted">Nenhuma compatibilidade encontrada.</p>}
               </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
          <Button variant="primary"><FaLink /> Adicionar Compatibilidade</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Compatibility;

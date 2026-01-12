import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Tab, Tabs, InputGroup, Image } from 'react-bootstrap';
import { FaSave, FaUserCog, FaBuilding, FaBell, FaDatabase, FaGlobe, FaMoon, FaSun } from 'react-icons/fa';

const Settings = () => {
  const [key, setKey] = useState('general');

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Configurações</h1>
          <p className="text-muted">Personalize o sistema e gerencie preferências</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <FaSave /> Salvar Alterações
        </Button>
      </div>

      <Card className="glass-card">
        <Card.Body>
          <Tabs
            id="settings-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-4"
          >
            <Tab eventKey="general" title={<span className="d-flex align-items-center gap-2"><FaBuilding /> Geral</span>}>
              <Row className="justify-content-center">
                <Col md={8}>
                  <h5 className="fw-bold mb-4">Dados da Empresa</h5>
                  <Form>
                    <Row className="mb-3">
                      <Col md={12} className="text-center mb-4">
                         <div className="ratio ratio-1x1 mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '100px', border: '2px dashed #ccc'}}>
                            <span className="text-muted small">Logo</span>
                         </div>
                         <Button variant="link" size="sm">Alterar Logo</Button>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCompanyName">
                        <Form.Label>Nome da Empresa</Form.Label>
                        <Form.Control type="text" placeholder="Ex: Chaveiro 24h" defaultValue="ChaveHelper Chaveiro e Segurança" />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridCNPJ">
                        <Form.Label>CNPJ</Form.Label>
                        <Form.Control type="text" placeholder="00.000.000/0000-00" defaultValue="12.345.678/0001-90" />
                      </Form.Group>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="formGridAddress">
                      <Form.Label>Endereço</Form.Label>
                      <Form.Control placeholder="Rua das Chaves, 123" defaultValue="Av. Central, 1500 - Centro" />
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control defaultValue="São Paulo" />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select defaultValue="SP">
                          <option>SP</option>
                          <option>RJ</option>
                          <option>MG</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control defaultValue="01000-000" />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email de Contato</Form.Label>
                        <Form.Control type="email" defaultValue="contato@chavehelper.com" />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Telefone / WhatsApp</Form.Label>
                        <Form.Control defaultValue="(11) 99999-8888" />
                      </Form.Group>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="users" title={<span className="d-flex align-items-center gap-2"><FaUserCog /> Usuários</span>}>
               <h5 className="fw-bold mb-4">Gerenciamento de Acesso</h5>
               <Card className="border bg-light mb-3">
                 <Card.Body className="d-flex justify-content-between align-items-center">
                   <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                        A
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Admin</h6>
                        <small className="text-muted">admin@chavehelper.com</small>
                      </div>
                   </div>
                   <span className="badge bg-success">Administrador</span>
                 </Card.Body>
               </Card>
               <Card className="border bg-light mb-3">
                 <Card.Body className="d-flex justify-content-between align-items-center">
                   <div className="d-flex align-items-center gap-3">
                      <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                        F
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Funcionário Balcão</h6>
                        <small className="text-muted">balcao@chavehelper.com</small>
                      </div>
                   </div>
                   <span className="badge bg-secondary">Vendedor</span>
                 </Card.Body>
               </Card>
               <Button variant="outline-primary" className="w-100"><FaUserCog /> Adicionar Novo Usuário</Button>
            </Tab>

            <Tab eventKey="notifications" title={<span className="d-flex align-items-center gap-2"><FaBell /> Notificações</span>}>
               <h5 className="fw-bold mb-4">Preferências de Alerta</h5>
               <Form>
                 <Form.Check 
                    type="switch"
                    id="stock-switch"
                    label="Alertar quando estoque atingir o mínimo"
                    defaultChecked
                    className="mb-3"
                 />
                 <Form.Check 
                    type="switch"
                    id="os-switch"
                    label="Notificar atualizações de OS por email"
                    defaultChecked
                    className="mb-3"
                 />
                  <Form.Check 
                    type="switch"
                    id="whatsapp-switch"
                    label=" integração com WhatsApp (API)"
                    className="mb-3"
                 />
               </Form>
            </Tab>

            <Tab eventKey="system" title={<span className="d-flex align-items-center gap-2"><FaDatabase /> Sistema</span>}>
               <Row>
                 <Col md={6}>
                   <h6 className="fw-bold mb-3">Aparência</h6>
                   <div className="d-flex gap-3 mb-4">
                     <Button variant="outline-primary" active className="flex-grow-1"><FaSun /> Claro</Button>
                     <Button variant="outline-secondary" className="flex-grow-1"><FaMoon /> Escuro</Button>
                   </div>

                   <h6 className="fw-bold mb-3">Idioma / Região</h6>
                   <InputGroup className="mb-4">
                      <InputGroup.Text><FaGlobe /></InputGroup.Text>
                      <Form.Select>
                        <option>Português (Brasil)</option>
                        <option>English (US)</option>
                        <option>Español</option>
                      </Form.Select>
                   </InputGroup>
                 </Col>
                 <Col md={6}>
                   <h6 className="fw-bold mb-3">Dados e Backup</h6>
                   <Button variant="outline-success" className="w-100 mb-2 text-start">
                     <FaDatabase className="me-2" /> Fazer Backup Agora
                   </Button>
                   <Button variant="outline-danger" className="w-100 text-start">
                     <FaDatabase className="me-2" /> Restaurar Backup
                   </Button>
                   <p className="text-muted small mt-2">Último backup: Hoje às 08:00</p>
                 </Col>
               </Row>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Settings;

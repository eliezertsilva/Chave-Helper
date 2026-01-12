import React, { useState } from 'react';
import { Card, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaKey, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        // Error is handled by Redux state
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-block mb-3">
                    <FaKey size={32} />
                  </div>
                  <h2 className="fw-bold text-dark">ChaveHelper</h2>
                  <p className="text-muted">Faça login para acessar o sistema ERP</p>
                </div>

                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold">E-mail</Form.Label>
                    <div className="position-relative">
                       <Form.Control 
                        type="email" 
                        placeholder="seu@email.com" 
                        size="lg" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ps-5"
                        required
                      />
                      <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold">Senha</Form.Label>
                     <div className="position-relative">
                      <Form.Control 
                        type="password" 
                        placeholder="••••••••" 
                        size="lg" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="ps-5"
                        required
                      />
                      <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    </div>
                  </Form.Group>

                  <Button variant="primary" size="lg" type="submit" className="w-100 fw-bold mb-3" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar no Sistema'}
                  </Button>
                  
                  <div className="text-center">
                    <a href="#" className="text-decoration-none text-muted small">Esqueceu sua senha?</a>
                  </div>
                </Form>
              </Card.Body>
              <div className="bg-light p-3 text-center border-top">
                <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>ChaveHelper ERP &copy; 2026</small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

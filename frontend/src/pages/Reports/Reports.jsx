import React from 'react';
import { Card, Row, Col, Table, ProgressBar } from 'react-bootstrap';
import { FaChartLine, FaChartPie, FaChartBar, FaDownload } from 'react-icons/fa';

const Reports = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-title">Relatórios Gerenciais</h1>
          <p className="text-muted">Análises detalhadas do seu negócio</p>
        </div>
        <button className="btn btn-outline-primary d-flex align-items-center gap-2">
          <FaDownload /> Exportar PDF
        </button>
      </div>

      <Row className="mb-4">
        <Col md={12}>
           <Card className="glass-card mb-4">
             <Card.Body>
               <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FaChartLine className="text-primary"/> Desempenho Mensal</h5>
               <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                  <p className="text-muted">Gráfico de Linha (Faturamento x Despesas) - Visualização Mock</p>
               </div>
             </Card.Body>
           </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
           <Card className="glass-card h-100">
             <Card.Body>
               <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FaChartPie className="text-success"/> Serviços Mais Realizados</h5>
               <Table borderless size="sm">
                 <tbody>
                   <tr>
                     <td>Cópia de Chaves</td>
                     <td className="text-end fw-bold">45%</td>
                     <td style={{width: '30%'}}><ProgressBar variant="success" now={45} style={{height: 6}} /></td>
                   </tr>
                   <tr>
                     <td>Aberturas</td>
                     <td className="text-end fw-bold">25%</td>
                     <td style={{width: '30%'}}><ProgressBar variant="info" now={25} style={{height: 6}} /></td>
                   </tr>
                   <tr>
                     <td>Instalação de Fechaduras</td>
                     <td className="text-end fw-bold">20%</td>
                     <td style={{width: '30%'}}><ProgressBar variant="warning" now={20} style={{height: 6}} /></td>
                   </tr>
                   <tr>
                     <td>Codificação Automotiva</td>
                     <td className="text-end fw-bold">10%</td>
                     <td style={{width: '30%'}}><ProgressBar variant="danger" now={10} style={{height: 6}} /></td>
                   </tr>
                 </tbody>
               </Table>
             </Card.Body>
           </Card>
        </Col>
        <Col md={6}>
           <Card className="glass-card h-100">
             <Card.Body>
               <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FaChartBar className="text-info"/> Top Produtos Vendidos</h5>
               <Table borderless size="sm">
                 <thead className="text-muted small text-uppercase">
                   <tr>
                     <th>Produto</th>
                     <th className="text-end">Qtd</th>
                     <th className="text-end">Receita</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Chave Pado 682</td>
                     <td className="text-end">158</td>
                     <td className="text-end">R$ 869,00</td>
                   </tr>
                   <tr>
                     <td>Cadeado Gold 30mm</td>
                     <td className="text-end">42</td>
                     <td className="text-end">R$ 1.470,00</td>
                   </tr>
                   <tr>
                     <td>Chave Tetra Aliança</td>
                     <td className="text-end">35</td>
                     <td className="text-end">R$ 525,00</td>
                   </tr>
                 </tbody>
               </Table>
             </Card.Body>
           </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;

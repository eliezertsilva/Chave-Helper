const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Relatórios e análises
 */

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Dados do dashboard principal
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Estatísticas gerais
 */
router.get('/dashboard', reportsController.getDashboard);

/**
 * @swagger
 * /api/reports/sales-by-period:
 *   get:
 *     summary: Vendas por período
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *     responses:
 *       200:
 *         description: Vendas agrupadas por período
 */
router.get('/sales-by-period', reportsController.getSalesByPeriod);

/**
 * @swagger
 * /api/reports/top-products:
 *   get:
 *     summary: Produtos mais usados
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos mais utilizados
 */
router.get('/top-products', reportsController.getTopProducts);

/**
 * @swagger
 * /api/reports/service-status:
 *   get:
 *     summary: Distribuição de status dos serviços
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Contagem por status
 */
router.get('/service-status', reportsController.getServiceStatus);

/**
 * @swagger
 * /api/reports/revenue-by-category:
 *   get:
 *     summary: Receita por categoria
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Receita agrupada por categoria
 */
router.get('/revenue-by-category', reportsController.getRevenueByCategory);

/**
 * @swagger
 * /api/reports/inventory-turnover:
 *   get:
 *     summary: Giro de estoque
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Taxa de giro dos produtos
 */
router.get('/inventory-turnover', reportsController.getInventoryTurnover);

module.exports = router;

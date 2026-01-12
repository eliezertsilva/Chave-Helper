const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Vendas diretas
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de vendas
 */
router.get('/', salesController.getAll);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Registra uma venda direta
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *               paymentMethod:
 *                 type: string
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venda criada
 */
router.post('/', salesController.createSale);

/**
 * @swagger
 * /api/sales/summary:
 *   get:
 *     summary: Resumo de vendas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Resumo de vendas
 */
router.get('/summary', salesController.getSummary);

module.exports = router;

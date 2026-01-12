const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Gestão financeira (contas a pagar/receber)
 */

/**
 * @swagger
 * /api/finance:
 *   get:
 *     summary: Lista todas as transações
 *     tags: [Finance]
 *     responses:
 *       200:
 *         description: Lista de transações
 */
router.get('/', financeController.getAll);

/**
 * @swagger
 * /api/finance/summary:
 *   get:
 *     summary: Retorna resumo financeiro (Entradas, Saídas, Saldo)
 *     tags: [Finance]
 *     responses:
 *       200:
 *         description: Resumo financeiro
 */
router.get('/summary', financeController.getSummary);

/**
 * @swagger
 * /api/finance:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Finance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               value:
 *                 type: number
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transação criada
 */
router.post('/', financeController.create);

module.exports = router;

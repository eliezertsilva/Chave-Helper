const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Gerenciamento de estoque de produtos
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Lista todos os produtos no estoque
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', inventoryController.getAll);

/**
 * @swagger
 * /api/inventory/{id}/stock:
 *   put:
 *     summary: Atualiza a quantidade em estoque de um produto
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estoque atualizado
 */
router.put('/:id/stock', inventoryController.updateStock);

module.exports = router;

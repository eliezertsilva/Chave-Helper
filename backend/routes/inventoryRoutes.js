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
 * /api/inventory:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Inventory]
 */
router.post('/', inventoryController.create);

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Inventory]
 */
router.put('/:id', inventoryController.update);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Inventory]
 */
router.delete('/:id', inventoryController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', clientsController.getAll);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Busca um cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do cliente
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', clientsController.getById);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [PF, PJ]
 *               document:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado
 */
router.post('/', clientsController.create);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cliente atualizado
 */
router.put('/:id', clientsController.update);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Exclui um cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente excluído
 */
router.delete('/:id', clientsController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const serviceItemsController = require('../controllers/serviceItemsController');

/**
 * @swagger
 * tags:
 *   name: ServiceItems
 *   description: Gerenciamento de itens de serviço
 */

/**
 * @swagger
 * /api/service-items/service/{serviceId}:
 *   get:
 *     summary: Lista todos os itens de um serviço
 *     tags: [ServiceItems]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de itens do serviço
 */
router.get('/service/:serviceId', serviceItemsController.getByService);

/**
 * @swagger
 * /api/service-items:
 *   post:
 *     summary: Adiciona um item ao serviço
 *     tags: [ServiceItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ServiceId:
 *                 type: integer
 *               ProductId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item adicionado
 */
router.post('/', serviceItemsController.create);

/**
 * @swagger
 * /api/service-items/{id}:
 *   put:
 *     summary: Atualiza um item do serviço
 *     tags: [ServiceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item atualizado
 */
router.put('/:id', serviceItemsController.update);

/**
 * @swagger
 * /api/service-items/{id}:
 *   delete:
 *     summary: Remove um item do serviço
 *     tags: [ServiceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido
 */
router.delete('/:id', serviceItemsController.delete);

module.exports = router;

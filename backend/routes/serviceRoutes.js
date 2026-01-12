const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Gerenciamento de Ordens de Serviço
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Lista todas as OS
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/', servicesController.getAll);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Cria uma nova OS
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               value:
 *                 type: number
 *               ClientId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: OS criada
 */
router.post('/', servicesController.create);

/**
 * @swagger
 * /api/services/{id}/status:
 *   put:
 *     summary: Atualiza o status de uma OS
 *     tags: [Services]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.put('/:id/status', servicesController.updateStatus);

module.exports = router;

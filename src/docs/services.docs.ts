/**
 * @swagger
 * components:
 *   schemas:
 *     OptionalItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "683466461173751e44dce1f0"
 *         Name:
 *           type: string
 *           example: "Decoração Premium"
 *         PricePerUnit:
 *           type: number
 *           example: 150
 *         Quantity:
 *           type: number
 *           example: 1
 *         IndividualPrice:
 *           type: number
 *           example: 300
 *
 *     Service:
 *       type: object
 *       required:
 *         - Name
 *         - BasePrice
 *         - CostPerClient
 *         - ClientQuantity
 *         - EventDuration
 *         - EventDate
 *         - FinalBudget
 *         - DownPayment
 *         - FinalPayment
 *       properties:
 *         _id:
 *           type: string
 *           example: "683466461173751e44dce1ef"
 *         Name:
 *           type: string
 *           example: "Serviço de Casamento"
 *         BasePrice:
 *           type: number
 *           example: 10500
 *         CostPerClient:
 *           type: number
 *           example: 200
 *         ClientQuantity:
 *           type: number
 *           example: 100
 *         EventDuration:
 *           type: number
 *           example: 6
 *         EventDate:
 *           type: string
 *           format: date-time
 *           example: "2025-06-15T15:00:00.000Z"
 *         optionalItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OptionalItem'
 *         FinalBudget:
 *           type: number
 *           example: 5000
 *         DownPayment:
 *           type: number
 *           example: 1500
 *         FinalPayment:
 *           type: number
 *           example: 3500
 *         __v:
 *           type: number
 *           example: 0
 */

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Gerenciamento de serviços personalizados
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *             example:
 *               - _id: "683466461173751e44dce1ef"
 *                 Name: "Serviço de Casamento"
 *                 BasePrice: 10500
 *                 CostPerClient: 200
 *                 ClientQuantity: 100
 *                 EventDuration: 6
 *                 EventDate: "2025-06-15T15:00:00.000Z"
 *                 optionalItems:
 *                   - _id: "683466461173751e44dce1f0"
 *                     Name: "Decoração Premium"
 *                     PricePerUnit: 150
 *                     Quantity: 1
 *                     IndividualPrice: 300
 *                 FinalBudget: 5000
 *                 DownPayment: 1500
 *                 FinalPayment: 3500
 *                 __v: 0
 *       500:
 *         description: Erro interno ao buscar os serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch services
 *
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *           example:
 *             Name: "Serviço de Casamento"
 *             BasePrice: 10500
 *             CostPerClient: 200
 *             ClientQuantity: 100
 *             EventDuration: 6
 *             EventDate: "2025-06-15T15:00:00.000Z"
 *             optionalItems:
 *               - Name: "Decoração Premium"
 *                 PricePerUnit: 150
 *                 Quantity: 1
 *                 IndividualPrice: 300
 *             FinalBudget: 5000
 *             DownPayment: 1500
 *             FinalPayment: 3500
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *             example:
 *               _id: "683466461173751e44dce1ef"
 *               Name: "Serviço de Casamento"
 *               BasePrice: 10500
 *               CostPerClient: 200
 *               ClientQuantity: 100
 *               EventDuration: 6
 *               EventDate: "2025-06-15T15:00:00.000Z"
 *               optionalItems:
 *                 - _id: "683466461173751e44dce1f0"
 *                   Name: "Decoração Premium"
 *                   PricePerUnit: 150
 *                   Quantity: 1
 *                   IndividualPrice: 300
 *               FinalBudget: 5000
 *               DownPayment: 1500
 *               FinalPayment: 3500
 *               __v: 0
 *       500:
 *         description: Erro interno ao criar novo serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create service
 */
/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Busca um serviço específico pelo ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *             example:
 *               _id: "683466461173751e44dce1ef"
 *               Name: "Serviço de Casamento"
 *               BasePrice: 10500
 *               CostPerClient: 200
 *               ClientQuantity: 100
 *               EventDuration: 6
 *               EventDate: "2025-06-15T15:00:00.000Z"
 *               optionalItems:
 *                 - _id: "683466461173751e44dce1f0"
 *                   Name: "Decoração Premium"
 *                   PricePerUnit: 150
 *                   Quantity: 1
 *                   IndividualPrice: 300
 *               FinalBudget: 5000
 *               DownPayment: 1500
 *               FinalPayment: 3500
 *               __v: 0
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service not found
 *       500:
 *         description: Erro interno ao buscar o serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch service

 *   put:
 *     summary: Atualiza um serviço existente pelo ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *           example:
 *             Name: "Serviço de Aniversário"
 *             BasePrice: 8500
 *             CostPerClient: 180
 *             ClientQuantity: 80
 *             EventDuration: 4
 *             EventDate: "2025-08-20T18:00:00.000Z"
 *             optionalItems:
 *               - Name: "Iluminação Especial"
 *                 PricePerUnit: 120
 *                 Quantity: 2
 *                 IndividualPrice: 240
 *             FinalBudget: 4200
 *             DownPayment: 1200
 *             FinalPayment: 3000
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *             example:
 *               _id: "683466461173751e44dce1ef"
 *               Name: "Serviço de Aniversário"
 *               BasePrice: 8500
 *               CostPerClient: 180
 *               ClientQuantity: 80
 *               EventDuration: 4
 *               EventDate: "2025-08-20T18:00:00.000Z"
 *               optionalItems:
 *                 - _id: "683466461173751e44dce1f5"
 *                   Name: "Iluminação Especial"
 *                   PricePerUnit: 120
 *                   Quantity: 2
 *                   IndividualPrice: 240
 *               FinalBudget: 4200
 *               DownPayment: 1200
 *               FinalPayment: 3000
 *               __v: 0
 *       404:
 *         description: Serviço não encontrado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service not found
 *       500:
 *         description: Erro interno ao atualizar o serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update service

 *   delete:
 *     summary: Deleta um serviço existente pelo ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service deleted successfully
 *       404:
 *         description: Serviço não encontrado para exclusão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service not found
 *       500:
 *         description: Erro interno ao deletar o serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete service
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
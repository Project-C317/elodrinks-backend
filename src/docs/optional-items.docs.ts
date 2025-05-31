/**
 * @swagger
 * components:
 *   schemas:
 *     OptionalItem:
 *       type: object
 *       required:
 *         - Name
 *         - PricePerUnit
 *         - Quantity
 *         - IndividualPrice
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
 *         Category:
 *           type: string
 *           example: "Decoração"
 */

/**
 * @swagger
 * tags:
 *   name: Optional Items
 *   description: Itens opcionais de serviço
 */

/**
 * @swagger
 * /optional-items:
 *   get:
 *     summary: Lista todos os itens opcionais
 *     tags: [Optional Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens opcionais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OptionalItem'
 *             example:
 *               - _id: "683466461173751e44dce1f0"
 *                 Name: "Decoração Premium"
 *                 PricePerUnit: 150
 *                 Quantity: 1
 *                 IndividualPrice: 300
 *                 Category: "Decoração"
 *       500:
 *         description: Erro interno ao buscar os itens opcionais
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch optional items
 *
 *   post:
 *     summary: Cria um novo item opcional
 *     tags: [Optional Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OptionalItem'
 *           example:
 *             Name: "Decoração Premium"
 *             PricePerUnit: 150
 *             Quantity: 1
 *             IndividualPrice: 300
 *             Category: "Decoração"
 *     responses:
 *       201:
 *         description: Item opcional criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OptionalItem'
 *             example:
 *               _id: "683466461173751e44dce1f0"
 *               Name: "Decoração Premium"
 *               PricePerUnit: 150
 *               Quantity: 1
 *               IndividualPrice: 300
 *               Category: "Decoração"
 *       500:
 *         description: Erro interno ao criar o item opcional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create optional item
 */

/**
 * @swagger
 * /optional-items/{id}:
 *   get:
 *     summary: Busca um item opcional por ID
 *     tags: [Optional Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item opcional
 *     responses:
 *       200:
 *         description: Item opcional encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OptionalItem'
 *             example:
 *               _id: "683466461173751e44dce1f0"
 *               Name: "Decoração Premium"
 *               PricePerUnit: 150
 *               Quantity: 1
 *               IndividualPrice: 300
 *               Category: "Decoração"
 *       404:
 *         description: Item opcional não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Optional item not found
 *       500:
 *         description: Erro interno ao buscar o item opcional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch optional item

 *   put:
 *     summary: Atualiza um item opcional por ID
 *     tags: [Optional Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item opcional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OptionalItem'
 *           example:
 *             Name: "Decoração Deluxe"
 *             PricePerUnit: 200
 *             Quantity: 2
 *             IndividualPrice: 400
 *             Category: "Decoração"
 *     responses:
 *       200:
 *         description: Item opcional atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OptionalItem'
 *             example:
 *               _id: "683466461173751e44dce1f0"
 *               Name: "Decoração Deluxe"
 *               PricePerUnit: 200
 *               Quantity: 2
 *               IndividualPrice: 400
 *               Category: "Decoração"
 *       404:
 *         description: Item opcional não encontrado ou não pôde ser atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Optional item not found
 *       500:
 *         description: Erro interno ao atualizar o item opcional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update optional item

 *   delete:
 *     summary: Deleta um item opcional por ID
 *     tags: [Optional Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item opcional
 *     responses:
 *       200:
 *         description: Item opcional deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Optional item deleted successfully
 *       404:
 *         description: Item opcional não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Optional item not found
 *       500:
 *         description: Erro interno ao deletar o item opcional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete optional item
 */


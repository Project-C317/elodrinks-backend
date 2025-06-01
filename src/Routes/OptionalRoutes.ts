import { Router } from 'express';
import OptionalController from '../Controllers/OptionalController';
import OptionalService from '../Services/OptionalService';
import { authenticateToken, authorizeRole } from '../Middleware/authenticateToken';

const OptionalRouter = Router();
const optionalService = new OptionalService();
const optionalController = new OptionalController(optionalService);

// Rotas privadas (precisa autenticar)
OptionalRouter.get('/', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => optionalController.getAllOptionalItems(req, res)); // GET /optional-items
OptionalRouter.post('/', authenticateToken, authorizeRole(['admin']), (req, res) => optionalController.createOptionalItem(req, res)); // POST /optional-items
OptionalRouter.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => optionalController.getOptionalItemById(req, res)); // GET /optional-items/:id
OptionalRouter.put('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => optionalController.updateOptionalItemById(req, res)); // PUT /optional-items/:id
OptionalRouter.delete('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => optionalController.deleteOptionalItemById(req, res)); // DELETE /optional-items/:id

export default OptionalRouter;

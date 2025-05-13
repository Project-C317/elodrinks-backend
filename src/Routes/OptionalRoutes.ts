import { Router } from 'express';
import OptionalController from '../Controllers/OptionalController';
import OptionalService from '../Services/OptionalService';
import { authenticateToken } from '../Middleware/authenticateToken';

const OptionalRouter = Router();
const optionalService = new OptionalService();
const optionalController = new OptionalController(optionalService);

// Rotas privadas (precisa autenticar)
OptionalRouter.get('/', authenticateToken, (req, res) => optionalController.getAllOptionalItems(req, res)); // GET /optional-items
OptionalRouter.post('/', authenticateToken, (req, res) => optionalController.createOptionalItem(req, res)); // POST /optional-items
OptionalRouter.get('/:id', authenticateToken, (req, res) => optionalController.getOptionalItemById(req, res)); // GET /optional-items/:id
OptionalRouter.put('/:id', authenticateToken, (req, res) => optionalController.updateOptionalItemById(req, res)); // PUT /optional-items/:id
OptionalRouter.delete('/:id', authenticateToken, (req, res) => optionalController.deleteOptionalItemById(req, res)); // DELETE /optional-items/:id

export default OptionalRouter;

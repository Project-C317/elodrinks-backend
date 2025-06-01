import { Router } from 'express';
import ServiceController from '../Controllers/ServiceController';
import ServiceService from '../Services/ServiceService';
import { authenticateToken, authorizeRole } from '../Middleware/authenticateToken';

const serviceRouter = Router();

const serviceService = new ServiceService();
const serviceController = new ServiceController(serviceService);

// Rotas privadas (precisa autenticar)
serviceRouter.get('/', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => serviceController.getAllServices(req, res)); // GET /services
serviceRouter.post('/', authenticateToken, authorizeRole(['admin']), (req, res) => serviceController.createService(req, res)); // POST /services
serviceRouter.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => serviceController.getServiceById(req, res)); // GET /services/:id
serviceRouter.put('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => serviceController.updateServiceById(req, res)); // PUT /services/:id
serviceRouter.delete('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => serviceController.deleteServiceById(req, res)); // DELETE /services/:id

export default serviceRouter;

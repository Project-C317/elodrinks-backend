import { Router } from 'express';
import ServiceController from '../Controllers/ServiceController';
import ServiceService from '../Services/ServiceService';

const serviceRouter = Router();

const serviceService = new ServiceService();
const serviceController = new ServiceController(serviceService);

serviceRouter.get('/', (req, res) => serviceController.getAllServices(req, res)); // GET /services
serviceRouter.post('/', (req, res) => serviceController.createService(req, res)); // POST /services
serviceRouter.get('/:id', (req, res) => serviceController.getServiceById(req, res)); // GET /services/:id
serviceRouter.put('/:id', (req, res) => serviceController.updateServiceById(req, res)); // PUT /services/:id
serviceRouter.delete('/:id', (req, res) => serviceController.deleteServiceById(req, res)); // DELETE /services/:id

export default serviceRouter;

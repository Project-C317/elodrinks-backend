import { Router } from 'express';
import OptionalController from '../Controllers/OptionalController';
import OptionalService from '../Services/OptionalService';

const OptionalRouter = Router();
const optionalService = new OptionalService();
const optionalController = new OptionalController(optionalService);

OptionalRouter.get('/', (req, res) => optionalController.getAllOptionalItems(req, res)); // GET /optional-items
OptionalRouter.post('/', (req, res) => optionalController.createOptionalItem(req, res)); // POST /optional-items
OptionalRouter.get('/:id', (req, res) => optionalController.getOptionalItemById(req, res)); // GET /optional-items/:id
OptionalRouter.put('/:id', (req, res) => optionalController.updateOptionalItemById(req, res)); // PUT /optional-items/:id
OptionalRouter.delete('/:id', (req, res) => optionalController.deleteOptionalItemById(req, res)); // DELETE /optional-items/:id

export default OptionalRouter;

import { Router } from 'express';
import BudgetController from '../Controllers/BudgetController';
import BudgetService from '../Services/BudgetService';
import { authenticateToken, authorizeRole } from '../Middleware/authenticateToken';

const budgetRouter = Router();

const budgetService = new BudgetService();
const budgetController = new BudgetController(budgetService);

// Rotas privadas (precisa autenticar)
budgetRouter.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => budgetController.getBudgetById(req, res)); // GET /services/:id
budgetRouter.post('/', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => budgetController.createBudget(req, res)); // POST /services
budgetRouter.delete('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => budgetController.deleteBudgetById(req, res)); // DELETE /services/:id

export default budgetRouter;

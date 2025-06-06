import { Request, Response } from 'express';
import BudgetService from '../Services/BudgetService'

class BudgetController {
    constructor(private budgetService: BudgetService) {}

    // Buscar serviço por ID
  async getBudgetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const Budget = await this.budgetService.getBudgetById(id);
      if (!Budget) {
        res.status(404).json({ error: 'Budget not found' });
      } else {
        res.status(200).json(Budget);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch budget' });
    }
  }

  async createBudget(req: Request, res: Response): Promise<void> {
    try {
      const {
        Name,
        Total,
        Service,
        OptionalItems
      } = req.body;

      const newBudget = await this.budgetService.createBudget({
        Name,
        Total,
        Service,
        OptionalItems
      });

      res.status(201).json(newBudget);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to create budget' });
    }
  }

  async deleteBudgetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const wasDeleted = await this.budgetService.deleteBudgetById(id);
      if (wasDeleted) {
        res.status(200).json({ message: 'Budget deleted successfully' });
      } else {
        res.status(404).json({ error: 'Budget not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to delete service' });
    }
  }
}

export default BudgetController;

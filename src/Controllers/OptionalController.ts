import { Request, Response } from 'express';
import OptionalService from '../Services/OptionalService';

class OptionalController {
  constructor(private optionalService: OptionalService) {}

  // Listar todos os itens opcionais
  async getAllOptionalItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.optionalService.getAllOption();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch optional items' });
    }
  }

  // Criar novo item opcional
  async createOptionalItem(req: Request, res: Response): Promise<void> {
    try {
      const { Id, Name, PricePerUnit, Quantity, IndividualPrice, Category } = req.body;

      const newItem = await this.optionalService.createOption({
        Id,
        Name,
        PricePerUnit,
        Quantity,
        IndividualPrice,
        Category,
      });

      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to create optional item' });
    }
  }

  // Buscar item opcional por ID
  async getOptionalItemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await this.optionalService.getOptionById(id);
      if (!item) {
        res.status(404).json({ error: 'Optional item not found' });
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch optional item' });
    }
  }

  // Atualizar item opcional por ID
  async updateOptionalItemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedItem = await this.optionalService.updateOptionById(id, updates);
      if (!updatedItem) {
        res.status(404).json({ error: 'Optional item not found or could not be updated' });
      } else {
        res.status(200).json(updatedItem);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to update optional item' });
    }
  }

  // Deletar item opcional por ID
  async deleteOptionalItemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const wasDeleted = await this.optionalService.deleteOptionById(id);
      if (wasDeleted) {
        res.status(200).json({ message: 'Optional item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Optional item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to delete optional item' });
    }
  }
}

export default OptionalController;

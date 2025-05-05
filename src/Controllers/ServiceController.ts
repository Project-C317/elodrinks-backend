import { Request, Response } from 'express';
import ServiceService from '../Services/ServiceService';

class ServiceController {
  constructor(private serviceService: ServiceService) {}

  // Listar todos os serviços
  async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const services = await this.serviceService.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch services' });
    }
  }

  // Criar novo serviço
  async createService(req: Request, res: Response): Promise<void> {
    try {
      const {
        Id,
        Name,
        BasePrice,
        CostPerClient,
        ClientQuantity,
        EventDuration,
        EventDate,
        optionalItems,
        FinalBudget,
        DownPayment,
        FinalPayment,
      } = req.body;

      const newService = await this.serviceService.createService({
        Id,
        Name,
        BasePrice,
        CostPerClient,
        ClientQuantity,
        EventDuration,
        EventDate,
        optionalItems,
        FinalBudget,
        DownPayment,
        FinalPayment,
      });

      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to create service' });
    }
  }

  // Buscar serviço por ID
  async getServiceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const service = await this.serviceService.getServiceById(id);
      if (!service) {
        res.status(404).json({ error: 'Service not found' });
      } else {
        res.status(200).json(service);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch service' });
    }
  }

  // Atualizar serviço por ID
  async updateServiceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedService = await this.serviceService.updateServiceById(id, updates);
      if (!updatedService) {
        res.status(404).json({ error: 'Service not found or could not be updated' });
      } else {
        res.status(200).json(updatedService);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to update service' });
    }
  }

  // Deletar serviço por ID
  async deleteServiceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const wasDeleted = await this.serviceService.deleteServiceById(id);
      if (wasDeleted) {
        res.status(200).json({ message: 'Service deleted successfully' });
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to delete service' });
    }
  }
}

export default ServiceController;

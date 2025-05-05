import { ServiceModel } from '../Models/Service';

interface CreateServiceDTO {
  Id: string;
  Name: string;
  BasePrice: number;
  CostPerClient: number;
  ClientQuantity: number;
  EventDuration: number;
  EventDate: Date;
  optionalItems?: any[]; 
  FinalBudget: number;
  DownPayment: number;
  FinalPayment: number;
}

class ServiceService {
  // Buscar todos os serviços
  async getAllServices(): Promise<any[]> {
    try {
      const services = await ServiceModel.find();
      return services;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch services: ${error.message}`);
      }
      throw new Error('Failed to fetch services: An unknown error occurred.');
    }
  }

  // Buscar serviço por ID
  async getServiceById(id: string): Promise<any | null> {
    try {
      const service = await ServiceModel.findById(id);
      return service;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch service by ID: ${error.message}`);
      }
      throw new Error('Failed to fetch service by ID: An unknown error occurred.');
    }
  }

  // Criar novo serviço
  async createService(data: CreateServiceDTO): Promise<any> {
    try {
      const newService = new ServiceModel(data);
      const savedService = await newService.save();
      return savedService;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to save service: ${error.message}`);
      }
      throw new Error('Failed to save service: An unknown error occurred.');
    }
  }

  // Atualizar serviço por ID
  async updateServiceById(id: string, updates: Partial<CreateServiceDTO>): Promise<any | null> {
    try {
      const updatedService = await ServiceModel.findByIdAndUpdate(id, updates, { new: true });
      return updatedService;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update service: ${error.message}`);
      }
      throw new Error('Failed to update service: An unknown error occurred.');
    }
  }

  // Deletar serviço por ID
  async deleteServiceById(id: string): Promise<boolean> {
    try {
      const result = await ServiceModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete service: ${error.message}`);
      }
      throw new Error('Failed to delete service: An unknown error occurred.');
    }
  }
}

export default ServiceService;

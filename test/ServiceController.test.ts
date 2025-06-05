import { Request, Response } from 'express';
import ServiceController from '../src/Controllers/ServiceController';
import ServiceService from '../src/Services/ServiceService';

describe('ServiceController', () => {
  let controller: ServiceController;
  let mockService: jest.Mocked<ServiceService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockService = {
      getAllServices: jest.fn(),
      createService: jest.fn(),
      getServiceById: jest.fn(),
      updateServiceById: jest.fn(),
      deleteServiceById: jest.fn(),
    } as any;

    controller = new ServiceController(mockService);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // getAllServices
  describe('getAllServices', () => {
    it('deve retornar todos os serviços com sucesso', async () => {
      const services = [{ Name: 'Buffet' }, { Name: 'Som e Luz' }];
      mockService.getAllServices.mockResolvedValue(services);

      await controller.getAllServices(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(services);
    });

    it('deve retornar erro ao falhar na busca dos serviços', async () => {
      mockService.getAllServices.mockRejectedValue(new Error('Erro interno'));

      await controller.getAllServices(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno' });
    });
  });

  // createService
  describe('createService', () => {
    it('deve criar um novo serviço com sucesso', async () => {
      const newService = { Name: 'DJ', BasePrice: 500 };
      req.body = newService;
      mockService.createService.mockResolvedValue(newService);

      await controller.createService(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newService);
    });

    it('deve retornar erro ao falhar na criação do serviço', async () => {
      mockService.createService.mockRejectedValue(new Error('Erro ao criar'));
      req.body = { Name: 'Som', BasePrice: 300 };

      await controller.createService(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar' });
    });
  });

  // getServiceById
  describe('getServiceById', () => {
    it('deve retornar o serviço pelo ID', async () => {
      const service = { id: '1', Name: 'Decoração' };
      req.params = { id: '1' };
      mockService.getServiceById.mockResolvedValue(service);

      await controller.getServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(service);
    });

    it('deve retornar 404 se o serviço não for encontrado', async () => {
      req.params = { id: '99' };
      mockService.getServiceById.mockResolvedValue(null);

      await controller.getServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Service not found' });
    });

    it('deve retornar erro ao falhar na busca', async () => {
      req.params = { id: '1' };
      mockService.getServiceById.mockRejectedValue(new Error('Erro interno'));

      await controller.getServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno' });
    });
  });

  // updateServiceById
  describe('updateServiceById', () => {
    it('deve atualizar um serviço com sucesso', async () => {
      req.params = { id: '1' };
      req.body = { Name: 'Atualizado' };
      const updated = { id: '1', Name: 'Atualizado' };
      mockService.updateServiceById.mockResolvedValue(updated);

      await controller.updateServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('deve retornar 404 se não atualizar', async () => {
      req.params = { id: '2' };
      req.body = { Name: 'Nada' };
      mockService.updateServiceById.mockResolvedValue(null);

      await controller.updateServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Service not found or could not be updated',
      });
    });

    it('deve retornar erro ao atualizar', async () => {
      req.params = { id: '1' };
      req.body = { Name: 'Erro' };
      mockService.updateServiceById.mockRejectedValue(new Error('Falha'));

      await controller.updateServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha' });
    });
  });

  // deleteServiceById
  describe('deleteServiceById', () => {
    it('deve deletar um serviço com sucesso', async () => {
      req.params = { id: '1' };
      mockService.deleteServiceById.mockResolvedValue(true);

      await controller.deleteServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Service deleted successfully',
      });
    });

    it('deve retornar 404 se não encontrar serviço', async () => {
      req.params = { id: '2' };
      mockService.deleteServiceById.mockResolvedValue(false);

      await controller.deleteServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Service not found',
      });
    });

    it('deve retornar erro ao deletar', async () => {
      req.params = { id: '1' };
      mockService.deleteServiceById.mockRejectedValue(new Error('Erro grave'));

      await controller.deleteServiceById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro grave' });
    });
  });
});

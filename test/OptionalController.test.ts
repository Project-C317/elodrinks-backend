import { Request, Response } from 'express';
import OptionalController from '../src/Controllers/OptionalController';
import OptionalService from '../src/Services/OptionalService';

describe('OptionalController', () => {
  let controller: OptionalController;
  let mockService: jest.Mocked<OptionalService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockService = {
      getAllOption: jest.fn(),
      createOption: jest.fn(),
      getOptionById: jest.fn(),
      updateOptionById: jest.fn(),
      deleteOptionById: jest.fn(),
    } as any;

    controller = new OptionalController(mockService);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // getAllOptionalItems
  describe('getAllOptionalItems', () => {
    it('deve retornar todos os itens opcionais com sucesso', async () => {
      const items = [{ Name: 'Item A' }, { Name: 'Item B' }];
      mockService.getAllOption.mockResolvedValue(items);

      await controller.getAllOptionalItems(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });

    it('deve retornar erro ao falhar na busca dos itens', async () => {
      mockService.getAllOption.mockRejectedValue(new Error('Erro ao buscar'));

      await controller.getAllOptionalItems(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar' });
    });
  });

  // createOptionalItem
  describe('createOptionalItem', () => {
    it('deve criar um novo item opcional com sucesso', async () => {
      const newItem = { Name: 'Extra', PricePerUnit: 10, Quantity: 2, IndividualPrice: 20, Category: 'Extras' };
      req.body = newItem;
      mockService.createOption.mockResolvedValue(newItem);

      await controller.createOptionalItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newItem);
    });

    it('deve retornar erro ao falhar na criação', async () => {
      mockService.createOption.mockRejectedValue(new Error('Erro ao criar'));
      req.body = { Name: 'Falha' };

      await controller.createOptionalItem(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar' });
    });
  });

  // getOptionalItemById
  describe('getOptionalItemById', () => {
    it('deve retornar o item opcional pelo ID', async () => {
      const item = { id: '1', Name: 'Opcional' };
      req.params = { id: '1' };
      mockService.getOptionById.mockResolvedValue(item);

      await controller.getOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(item);
    });

    it('deve retornar 404 se o item não for encontrado', async () => {
      req.params = { id: '99' };
      mockService.getOptionById.mockResolvedValue(null);

      await controller.getOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Optional item not found' });
    });

    it('deve retornar erro ao falhar na busca', async () => {
      req.params = { id: '1' };
      mockService.getOptionById.mockRejectedValue(new Error('Erro interno'));

      await controller.getOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno' });
    });
  });

  // updateOptionalItemById
  describe('updateOptionalItemById', () => {
    it('deve atualizar um item opcional com sucesso', async () => {
      req.params = { id: '1' };
      req.body = { Name: 'Atualizado' };
      const updated = { id: '1', Name: 'Atualizado' };
      mockService.updateOptionById.mockResolvedValue(updated);

      await controller.updateOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('deve retornar 404 se não atualizar', async () => {
      req.params = { id: '2' };
      req.body = { Name: 'Nada' };
      mockService.updateOptionById.mockResolvedValue(null);

      await controller.updateOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Optional item not found or could not be updated',
      });
    });

    it('deve retornar erro ao atualizar', async () => {
      req.params = { id: '1' };
      req.body = { Name: 'Erro' };
      mockService.updateOptionById.mockRejectedValue(new Error('Falha'));

      await controller.updateOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha' });
    });
  });

  // deleteOptionalItemById
  describe('deleteOptionalItemById', () => {
    it('deve deletar um item opcional com sucesso', async () => {
      req.params = { id: '1' };
      mockService.deleteOptionById.mockResolvedValue(true);

      await controller.deleteOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Optional item deleted successfully',
      });
    });

    it('deve retornar 404 se não encontrar item', async () => {
      req.params = { id: '2' };
      mockService.deleteOptionById.mockResolvedValue(false);

      await controller.deleteOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Optional item not found',
      });
    });

    it('deve retornar erro ao deletar', async () => {
      req.params = { id: '1' };
      mockService.deleteOptionById.mockRejectedValue(new Error('Erro grave'));

      await controller.deleteOptionalItemById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro grave' });
    });
  });
});

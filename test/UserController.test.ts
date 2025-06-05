import { Request, Response } from 'express';
import UserController from '../src/Controllers/UserController';
import UserService from '../src/Services/UserService';

const mockUserService = {
  getAllUsers: jest.fn(),
  createUser: jest.fn(),
  loginUser: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
  deleteUserById: jest.fn(),
};

const userController = new UserController(mockUserService as unknown as UserService);

describe('Testes do UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // getAllUsers
  describe('getAllUsers', () => {
    it('deve retornar todos os usuários com sucesso', async () => {
      const usuariosMock = [{ Name: 'João' }, { Name: 'Maria' }];
      mockUserService.getAllUsers.mockResolvedValue(usuariosMock);

      await userController.getAllUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuariosMock);
    });

    it('deve retornar erro ao falhar na obtenção dos usuários', async () => {
      mockUserService.getAllUsers.mockRejectedValue(new Error('Erro inesperado'));

      await userController.getAllUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro inesperado' });
    });
  });

  // registerUser
  describe('registerUser', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      req.body = {
        Name: 'Ana',
        Surname: 'Silva',
        Age: 30,
        Cpf: '12345678999',
        Email: 'ana@email.com',
        Phone: '35999999999',
        Password: '123456',
      };
      mockUserService.createUser.mockResolvedValue(req.body);

      await userController.registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: req.body,
      });
    });

    it('deve retornar erro ao falhar no registro do usuário', async () => {
      req.body = {
        Name: 'Ana',
        Surname: 'Silva',
        Age: 30,
        Cpf: '12345678999',
        Email: 'ana@email.com',
        Phone: '35999999999',
        Password: '123456',
      };
      mockUserService.createUser.mockRejectedValue(new Error('Falha ao registrar'));

      await userController.registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao registrar' });
    });

  });

  // loginUser
  describe('loginUser', () => {
    it('deve realizar o login com sucesso e retornar um token', async () => {
      const tokenFalso = 'token123';
      req.body = {
        Email: 'ana@email.com',
        Password: '123456',
      };
      mockUserService.loginUser.mockResolvedValue(tokenFalso);

      await userController.loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: tokenFalso,
      });
    });

    it('deve retornar erro ao falhar no login', async () => {
      req.body = { 
        Email: 'ana@email.com',
        Password: '123456',
      };
      mockUserService.loginUser.mockRejectedValue(new Error('Credenciais inválidas'));

      await userController.loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas' });
    });
  });

  // getUserById
  describe('getUserById', () => {
    it('deve retornar o usuário ao buscar por ID', async () => {
      const usuarioMock = { Name: 'Carlos' };
      req.params = { id: '123' };
      mockUserService.getUserById.mockResolvedValue(usuarioMock);

      await userController.getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarioMock);
    });

    it('deve retornar erro 404 se o usuário não for encontrado', async () => {
      req.params = { id: '123' };
      mockUserService.getUserById.mockResolvedValue(null);

      await userController.getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('deve retornar erro ao falhar na busca do usuário por ID', async () => {
      req.params = { id: '123' };
      mockUserService.getUserById.mockRejectedValue(new Error('Erro ao buscar'));

      await userController.getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar' });
    });
  });

  // updateUserById
  describe('updateUserById', () => {
    it('deve atualizar o usuário com sucesso', async () => {
      const usuarioAtualizado = { Name: 'Novo Nome' };
      req.params = { id: '123' };
      req.body = { Name: 'Novo Nome' };
      mockUserService.updateUserById.mockResolvedValue(usuarioAtualizado);

      await userController.updateUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarioAtualizado);
    });

    it('deve retornar erro 404 se o usuário não for encontrado para atualização', async () => {
      req.params = { id: '123' };
      req.body = { Name: 'Novo Nome' };
      mockUserService.updateUserById.mockResolvedValue(null);

      await userController.updateUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'User not found or could not be updated',
      });
    });

    it('deve retornar erro ao falhar na atualização do usuário', async () => {
      req.params = { id: '123' };
      req.body = { Name: 'Novo Nome' };
      mockUserService.updateUserById.mockRejectedValue(new Error('Erro na atualização'));

      await userController.updateUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro na atualização' });
    });
  });

  // deleteUserById
  describe('deleteUserById', () => {
    it('deve deletar o usuário com sucesso', async () => {
      req.params = { id: '123' };
      mockUserService.deleteUserById.mockResolvedValue(true);

      await userController.deleteUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('deve retornar erro 404 se o usuário não for encontrado para exclusão', async () => {
      req.params = { id: '123' };
      mockUserService.deleteUserById.mockResolvedValue(false);

      await userController.deleteUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('deve retornar erro ao falhar na exclusão do usuário', async () => {
      req.params = { id: '123' };
      mockUserService.deleteUserById.mockRejectedValue(new Error('Erro ao deletar'));

      await userController.deleteUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar' });
    });
  });
});

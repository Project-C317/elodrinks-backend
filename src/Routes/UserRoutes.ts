import { Router } from 'express';
import UserController from '../Controllers/UserController';
import UserService from '../Services/UserService';
import { authenticateToken, authorizeRole } from '../Middleware/authenticateToken';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

// Rotas públicas (não precisa autenticar)
userRouter.post('/register', (req, res) => userController.registerUser(req, res)); // POST /users/register (Register User)
userRouter.post('/login', (req, res) => userController.loginUser(req, res)); // POST /users/login (Login User)

// Rotas privadas (precisa autenticar)
userRouter.get('/', authenticateToken, authorizeRole(['admin']), (req, res) => userController.getAllUsers(req, res)); // GET /users
userRouter.get('/:id', authenticateToken, (req, res) => userController.getUserById(req, res)); // GET /users/:id
userRouter.put('/:id', authenticateToken, (req, res) => userController.updateUserById(req, res)); // PUT /users/:id
userRouter.delete('/:id', authenticateToken, authorizeRole(['admin']), (req, res) => userController.deleteUserById(req, res)); // DELETE /users/:id

export default userRouter;

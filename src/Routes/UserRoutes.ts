import { Router } from 'express';
import UserController from '../Controllers/UserController';
import UserService from '../Services/UserService';

const userRouter = Router();

// Initialize the controller with its service
const userService = new UserService();
const userController = new UserController(userService);

// Define the routes and map them to the controller methods
userRouter.get('/', (req, res) => userController.getAllUsers(req, res)); // GET /users
userRouter.post('/', (req, res) => userController.createUser(req, res)); // POST /users
userRouter.get('/:id', (req, res) => userController.getUserById(req, res)); // GET /users/:id
userRouter.put('/:id', (req, res) => userController.updateUserById(req, res)); // PUT /users/:id
userRouter.delete('/:id', (req, res) => userController.deleteUserById(req, res)); // DELETE /users/:id

export default userRouter;

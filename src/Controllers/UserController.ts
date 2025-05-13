import { Request, Response } from 'express';
import UserService from '../Services/UserService';

class UserController {
  constructor(private userService: UserService) {}

  // Fetch all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch users' });
    }
  }

  // Create a new user (register)
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { Name, Surname, Age, Cpf, Email, Phone, Password, Role = 'user' } = req.body;
      const newUser = await this.userService.createUser({
        Name,
        Surname,
        Age,
        Cpf,
        Email,
        Phone,
        Password,
        Role,
      });
      res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to register user' });
    }
  }

  // Log in a user
  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { Email, Password } = req.body;
      const token = await this.userService.loginUser(Email, Password);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(400).json({ error: (error instanceof Error) ? error.message : 'Invalid credentials' });
    }
  }

  // Fetch a user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to fetch user' });
    }
  }

  // Update a user by ID
  async updateUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await this.userService.updateUserById(id, updates);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found or could not be updated' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to update user' });
    }
  }

  // Delete a user by ID
  async deleteUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const wasDeleted = await this.userService.deleteUserById(id);
      if (wasDeleted) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Failed to delete user' });
    }
  }
}

export default UserController;

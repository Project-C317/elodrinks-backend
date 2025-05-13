import { UserModel, IUser } from '../Models/User';
import jwt from 'jsonwebtoken';

interface CreateUserDTO {
  Name: string;
  Surname: string;
  Age: number;
  Cpf: string;
  Email: string;
  Phone: string;
  Password: string;
  Role?: string;
}

class UserService {
  private SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Secret key for JWT

  // Fetch all users
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find(); // Fetch all users
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw new Error('Failed to fetch users: An unknown error occurred.');
    }
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user by ID: ${error.message}`);
      }
      throw new Error('Failed to fetch user by ID: An unknown error occurred.');
    }
  }

  // Create a new user (including hashed password)
  async createUser(data: CreateUserDTO): Promise<IUser> {
    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ Email: data.Email });
      if (existingUser) {
        throw new Error('Email is already registered');
      }

      const newUser = new UserModel(data);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to save user: ${error.message}`);
      }
      throw new Error('Failed to save user: An unknown error occurred.');
    }
  }

  // Update a user by ID
  async updateUserById(id: string, updates: Partial<CreateUserDTO>): Promise<IUser | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw new Error('Failed to update user: An unknown error occurred.');
    }
  }

  // Delete a user by ID
  async deleteUserById(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw new Error('Failed to delete user: An unknown error occurred.');
    }
  }

  // Log in the user and generate a JWT token
  async loginUser(email: string, password: string): Promise<string> {
    try {
      // Find user by email
      const user = await UserModel.findOne({ Email: email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare password with hashed password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.Email, role: user.Role }, this.SECRET_KEY, { expiresIn: '1h' });
      return token;
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Verify JWT token (optional, can also be done in middleware)
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export default UserService;

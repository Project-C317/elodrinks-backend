import { UserModel, IUser } from '../Models/User';

interface CreateUserDTO {
  Name: string;
  Surname: string;
  Age: number;
  Cpf: string;
  Email: string;
  Phone: string;
}

class UserService {
  // Fetch all users
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find(); // Fetch all users (returns IUser[])
      return users; // No TypeScript error now
    } catch (error) {
      if (error instanceof Error) {
        // This ensures that we access the message of the Error instance
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      // If the error is not an instance of Error (it could be an unknown object), handle accordingly
      throw new Error('Failed to fetch users: An unknown error occurred.');
    }
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id)
      return user;
    } catch (error) {
      if (error instanceof Error) {
        // Safely access the error message
        throw new Error(`Failed to fetch user by ID: ${error.message}`);
      }
      throw new Error('Failed to fetch user by ID: An unknown error occurred.');
    }
  }

  // Create a new user
  async createUser(data: CreateUserDTO): Promise<IUser> {
    try {
      const newUser = new UserModel(data); // Create a new user instance
      const savedUser = await newUser.save(); // Save the user to the database (returns IUser)
      return savedUser; // Return the saved user document
    } catch (error) {
      if (error instanceof Error) {
        // Safely access the error message
        throw new Error(`Failed to save user: ${error.message}`);
      }
      // If the error is not an instance of Error (unknown error object)
      throw new Error('Failed to save user: An unknown error occurred.');
    }
  }

  // Update a user by ID
  async updateUserById(id: string, updates: Partial<CreateUserDTO>): Promise<IUser | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        // Safely access the error message
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw new Error('Failed to update user: An unknown error occurred.');
    }
  }

  // Delete a user by ID
  async deleteUserById(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id); // Use MongoDB's `_id`
      return result !== null;
    } catch (error) {
      if (error instanceof Error) {
        // Safely access the error message
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw new Error('Failed to delete user: An unknown error occurred.');
    }
  }
}

export default UserService;

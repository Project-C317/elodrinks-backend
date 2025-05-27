import { OptionalItem } from '../Models/OptionalItem';

interface CreateOptionalItemDTO {
  Id: string;
  Name: string;
  PricePerUnit: number;
  Quantity: number;
  IndividualPrice: number;
}

class OptionalService {
  // Buscar todos os itens opcionais
  async getAllOption(): Promise<any[]> {
    try {
      const items = await OptionalItem.find();
      return items;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch optional items: ${error.message}`);
      }
      throw new Error('Failed to fetch optional items: An unknown error occurred.');
    }
  }

  // Buscar item opcional por ID
  async getOptionById(id: string): Promise<any | null> {
    try {
      const item = await OptionalItem.findById(id);
      return item;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch optional item by ID: ${error.message}`);
      }
      throw new Error('Failed to fetch optional item by ID: An unknown error occurred.');
    }
  }

  // Criar novo item opcional
  async createOption(data: CreateOptionalItemDTO): Promise<any> {
    try {
      const newItem = new OptionalItem(data);
      const savedItem = await newItem.save();
      return savedItem;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to save optional item: ${error.message}`);
      }
      throw new Error('Failed to save optional item: An unknown error occurred.');
    }
  }

  // Atualizar item opcional por ID
  async updateOptionById(id: string, updates: Partial<CreateOptionalItemDTO>): Promise<any | null> {
    try {
      const updatedItem = await OptionalItem.findByIdAndUpdate(id, updates, { new: true });
      return updatedItem;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update optional item: ${error.message}`);
      }
      throw new Error('Failed to update optional item: An unknown error occurred.');
    }
  }

  // Deletar item opcional por ID
  async deleteOptionById(id: string): Promise<boolean> {
    try {
      const result = await OptionalItem.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete optional item: ${error.message}`);
      }
      throw new Error('Failed to delete optional item: An unknown error occurred.');
    }
  }
}

export default OptionalService;

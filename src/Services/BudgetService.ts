import { Budget } from "../Models/Budget";

interface CreateBudgetDTO {
	Id: string;
	Name: string;
	Total: number;	
}

class BudgetService {
	// Buscar budget por id
	async getBudgetById(id: string): Promise<any | null> {
		try {
			const budget = await Budget.findById(id);
			return budget;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch budget by ID: ${error.message}`);
			}
			throw new Error('Failed to fetch Budget by ID: An unknown error occurred.');
		}
	}

	// Criar nova budget
	async createOption(data: CreateBudgetDTO): Promise<any> {
		try {
			const newBudget = new Budget(data);
			const savedBudget = await newBudget.save();
			return savedBudget;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to save new budget: ${error.message}`);
			}
			throw new Error('Failed to save budget: An unknown error occurred.');
		}
	}

	// Deletar budget por ID
	  async deleteBudgetById(id: string): Promise<boolean> {
		try {
		  const result = await Budget.findByIdAndDelete(id);
		  return result !== null;
		} catch (error) {
		  if (error instanceof Error) {
			throw new Error(`Failed to delete budget: ${error.message}`);
		  }
		  throw new Error('Failed to delete budget: An unknown error occurred.');
		}
	  }
}
import mongoose, { Document, Double, Schema } from 'mongoose';
import { OptionalItemSchema, IOptionalItem } from './OptionalItem';


export interface IBudget extends Document {
  Name: string;
  Total: number;
  Service: string;
  OptionalItems: IOptionalItem[]; 
}


export const BudgetSchema: Schema = new Schema<IBudget>({
  Name: { type: String, required: true },
  Total: { type: Number, required: true },
  Service: { type: String, required: true },
  OptionalItems: { type: [OptionalItemSchema], default: [] }
});

export const Budget = mongoose.model<IBudget>('Budget', BudgetSchema);
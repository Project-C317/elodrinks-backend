import mongoose, { Document, Double, Schema } from 'mongoose';

export interface IBudget extends Document {
  Name: string;
  Total: number;
}


export const BudgetSchema: Schema = new Schema<IBudget>({
  Name: { type: String, required: true },
  Total: { type: Number, required: true }
});

export const Budget = mongoose.model<IBudget>('OptionalItem', BudgetSchema);
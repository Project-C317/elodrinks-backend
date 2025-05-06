import mongoose, { Document, Schema } from 'mongoose';

export interface IOptionalItem extends Document {
  Name: string;
  PricePerUnit: number;
  Quantity: number;
  IndividualPrice: number;
}

export const OptionalItemSchema: Schema = new Schema<IOptionalItem>({
  Name: { type: String, required: true },
  PricePerUnit: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  IndividualPrice: { type: Number, required: true },
});

export const OptionalItem = mongoose.model<IOptionalItem>('OptionalItem', OptionalItemSchema);

import mongoose from 'mongoose';
import { OptionalItemSchema } from './OptionalItem';

const ServiceSchema = new mongoose.Schema({
  Id: { type: String, required: true },
  Name: { type: String, required: true },
  BasePrice: { type: Number, required: true },
  CostPerClient: { type: Number, required: true },
  ClientQuantity: { type: Number, required: true },
  EventDuration: { type: Number, required: true },
  EventDate: { type: Date, required: true },
  optionalItems: { type: [OptionalItemSchema], default: [] },
  FinalBudget: { type: Number, required: true },
  DownPayment: { type: Number, required: true },
  FinalPayment: { type: Number, required: true },
});

export const ServiceModel = mongoose.model('Service', ServiceSchema);
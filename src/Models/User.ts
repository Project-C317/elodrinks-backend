import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  Name: string;
  Surname: string;
  Age: number;
  Cpf: string;
  Email: string;
  Phone: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Age: { type: Number, required: true },
  Cpf: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true }
});

// Create the model
export const UserModel = mongoose.model<IUser>('User', UserSchema);

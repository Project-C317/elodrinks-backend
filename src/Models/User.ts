import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  Name: string;
  Surname: string;
  Age: number;
  Cpf: string;
  Email: string;
  Phone: string;
  Password: string;
  Role: string; 
  comparePassword: (candidatePassword: string) => Promise<boolean>; // Method to compare passwords
}

const UserSchema = new Schema<IUser>({
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Age: { type: Number, required: true },
  Cpf: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  Password: { type: String, required: true }, // Add Password field
  Role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Pre-save hook to hash the password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('Password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.Password);
};

// Exclude Password from JSON responses
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.Password;
    return ret;
  },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

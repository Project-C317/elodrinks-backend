import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  Id: { type: String, required: true },
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Age: { type: Number, required: true },
  Cpf: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);

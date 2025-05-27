import mongoose from 'mongoose';

export class DatabaseConnection {
  async connect(): Promise<void> {
    const mongoURI = process.env.MONGO_URI as string;

    if (!mongoURI) {
      throw new Error('MONGO_URI não está definido no arquivo .env');
    }

    try {
      await mongoose.connect(mongoURI);
      console.info('Conexão com MongoDB realizada com sucesso');
    } catch (error) {
      console.error('Erro ao conectar no MongoDB:', error);
      throw error;
    }
  }
}

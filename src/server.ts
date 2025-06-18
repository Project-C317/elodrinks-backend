import { config } from 'dotenv';
config();

import { App } from './app';
import { DatabaseConnection } from './database/DataConnection';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT || '3000', 10);

  console.log('Starting server on port:', PORT);

  const database = new DatabaseConnection();

  console.log(database);

  await database.connect();

  const app = new App(PORT);
  app.listen();
}

bootstrap().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
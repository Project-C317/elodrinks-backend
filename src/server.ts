import { App } from './app';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const app = new App(PORT);

  app.listen();
}

bootstrap().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
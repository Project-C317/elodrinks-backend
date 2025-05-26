import express, { Application, Request, Response } from 'express';
import { SwaggerConfig } from './docs/swagger';
import userRouter from './Routes/UserRoutes';
import serviceRouter from './Routes/ServiceRoutes';
import optionalRouter from './Routes/OptionalRoutes';

export class App {
  public app: Application;

  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.app.use(express.json());

    // Inicializar configurações
    this.initializeConfig();

    // Configurar Swagger
    this.configureSwagger();
    
    // Inicializar rotas
    this.initializeRoutes();

    // Inicializar tratamento de erros
    this.initializeErrorHandling();
  }

  private initializeConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureSwagger(): void {
    const swaggerConfig = new SwaggerConfig(this.app);
    swaggerConfig.setupSwagger();
  }
  
  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Servidor está rodando',
        timestamp: new Date(),
      });
    });
    this.app.use('/users', userRouter);
    this.app.use('/services', serviceRouter);
    this.app.use('/optional-items', optionalRouter);
  }

  private initializeErrorHandling(): void {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada',
      });
    });
    
    this.app.use((error: Error, req: Request, res: Response) => {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: error.message || 'Erro Interno do Servidor',
      });
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
      console.log(`Documentação Swagger disponível em http://localhost:${this.port}/api-docs`);
    });
  }
}
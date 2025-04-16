import express, { Application, Request, Response } from 'express';

export class App {
  public app: Application;

  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    // Inicializar configurações
    this.initializeConfig();
    
    // Inicializar rotas
    this.initializeRoutes();

    // Inicializar tratamento de erros
    this.initializeErrorHandling();
  }

  private initializeConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  
  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Servidor está rodando',
        timestamp: new Date(),
      });
    });
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
    });
  }
}
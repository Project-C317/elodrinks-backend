import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

export class SwaggerConfig {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public setupSwagger(): void {
    const swaggerOptions: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'EloDrinks API',
          version: '1.0.0',
          description: 'Documentação da API EloDrinks',
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Servidor local',
          },
        ],
      },
      apis: ['./src/docs/*.ts'],
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
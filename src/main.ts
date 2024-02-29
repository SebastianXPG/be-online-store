// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para permitir solo el origen específico
  app.enableCors({
    origin: 'http://localhost:3001', // Reemplaza con tu dominio de producción
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_ID)
    .setDescription('Descripción de mi API Nest.js')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

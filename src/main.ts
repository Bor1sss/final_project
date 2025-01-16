import { config } from 'dotenv';
config(); // This loads the .env file

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увімкнення CORS для безпеки
  app.enableCors();

  // Налаштування Swagger для документації API
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('REST API for the application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Документація доступна за шляхом /api

  // Встановлення порту для запуску додатка
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger API documentation is available on: http://localhost:${port}/api`
  );
}

bootstrap();

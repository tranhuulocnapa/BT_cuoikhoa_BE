import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger.config';
import { envConfig } from './configs/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Set global prefix
  app.setGlobalPrefix('api');

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Setup Swagger
  setupSwagger(app);

  const port = envConfig.PORT;
  await app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger documentation at http://localhost:${port}/api-docs`);
  });
}

bootstrap();

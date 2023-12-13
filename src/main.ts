import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configuration } from './configs/config';
import { AppModule } from './modules/app.module';
import { GlobalExceptionFilter, validationExceptionFactory } from './utils/GlobalExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: validationExceptionFactory,
  }));
  
  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cobra')
    .setDescription('The cobra API documentation')
    .addBearerAuth()
    .setVersion('0.0.1')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    useGlobalPrefix: true,
  });

  const { host, port } = configuration().server;
  
  await app.listen(port, () => {
    console.log(`Started on http://${host}:${port}/api`);
  });
}

bootstrap();

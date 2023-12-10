import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configuration } from './configs/config';
import { AppModule } from './modules/app.module';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const { host, port } = configuration().server;
  
  await app.listen(port, () => {
    console.log(`Started on http://${host}:${port}/api`);
  });
}

bootstrap();

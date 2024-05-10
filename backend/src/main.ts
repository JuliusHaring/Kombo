import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const corsOrigin = process.env['CORS_ORIGIN'];
  logger.log(`CORS Origin: ${corsOrigin}`);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    origin: process.env['CORS_ORIGIN'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Kombo')
    .setDescription('The Kombo API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

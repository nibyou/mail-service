import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { json } from 'body-parser';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: '100mb' }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nibyou Mail Microservice')
    .setDescription(
      `This is the documentation for the Nibyou Mail Microservice. 
    It is a microservice that allows us to send emails and letters to Nibyou customers.`,
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  return app.listen(process.env.PORT || 3000, '0.0.0.0');
})();

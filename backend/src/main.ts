import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {listenForEmails} from './emailReciever';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  listenForEmails();
  await app.listen(3001);
}
bootstrap();


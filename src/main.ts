import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({ keys: ['my-encrypt-string-saeffs'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // whitelist:true, stripped out additional property
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

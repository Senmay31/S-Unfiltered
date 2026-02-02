import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use((req, res, next) => {
    console.log('AUTH HEADER:', req.headers.authorization);
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  console.log('Backend server is running on port', process.env.PORT ?? 5000);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();

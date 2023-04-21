import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.NESTJS_APP_DOCKER_PORT || 3001;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(port).then(() => {
    console.log(`Running at http://localhost:${port}`);
  });
}

bootstrap();

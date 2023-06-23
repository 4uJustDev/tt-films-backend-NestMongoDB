import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function start() {

  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server start at PORT: ${process.env.PORT}`));

}
start();
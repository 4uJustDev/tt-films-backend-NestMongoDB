import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function start() {

  const PORT = process.env.PORT || 4000 ;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server start at PORT: ${process.env.PORT}`));
}
start();
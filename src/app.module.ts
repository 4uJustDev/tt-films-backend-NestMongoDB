import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [
    FilmsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule, 
  ],
})
export class AppModule {}

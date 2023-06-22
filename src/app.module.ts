import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import 'dotenv/config';

@Module({
  imports: [
    FilmsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI), 
  ],
})
export class AppModule {}

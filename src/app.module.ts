import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    FilmsModule,
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule, 
  ],
})
export class AppModule {}

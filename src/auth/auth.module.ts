import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: process.env.JWT_EXPIRE
      }
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ]
})
export class AuthModule {}

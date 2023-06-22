import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import 'dotenv/config';

@Module({
  imports : [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory : ()=>{
        return {
          secret : process.env.JWT_SECRET,
          signOptions : {
            expiresIn : process.env.JWT_EXPIRE
          }
        }
      }
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, ]
})
export class AuthModule {}

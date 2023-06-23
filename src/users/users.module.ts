import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schemas/roles.schema';
import { UserRoles, UserRolesSchema } from 'src/roles/schemas/user-roles.scheams';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports : [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    MongooseModule.forFeature([{name: UserRoles.name, schema: UserRolesSchema}]),
    RolesModule,
    forwardRef(()=>AuthModule) 
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schemas/roles.schema';
import { UserRoles, UserRolesSchema } from 'src/roles/schemas/user-roles.scheams';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports : [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    MongooseModule.forFeature([{name: UserRoles.name, schema: UserRolesSchema}]),
    RolesModule
],
})
export class UsersModule {}

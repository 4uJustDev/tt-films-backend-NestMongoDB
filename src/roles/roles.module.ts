import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/roles.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UserRoles, UserRolesSchema } from './schemas/user-roles.scheams';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports : [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    MongooseModule.forFeature([{name: UserRoles.name, schema: UserRolesSchema}]),
  ],
  exports: [RolesService]
})
export class RolesModule {}

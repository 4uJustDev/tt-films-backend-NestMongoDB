import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private roleService: RolesService
    ) {}

    async createUser( dto : CreateUserDto) : Promise<User>{
        const user = await this.userModel.create(dto);
        const role = await this.roleService.getRoleValue("admin1")
        const userAdd = await user.$set('roles', [role.id])
        return userAdd;
    }

    async getAllUser() : Promise<User[]>{
        return await this.userModel.find().exec()
    }
}

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

    async createUser( dto : CreateUserDto){
        const user = await this.userModel.create(dto);
        const role = await this.roleService.getRoleValue("USER")
        await user.$set('roles', role.id)
        user.roles = [role]
        return user;
    }

    async getAllUser() : Promise<User[]>{
        return await this.userModel.find().exec()
    }
    async getUserByEmail(email:string){
        const user = await this.userModel.findOne({email});

        return user;
    }
}

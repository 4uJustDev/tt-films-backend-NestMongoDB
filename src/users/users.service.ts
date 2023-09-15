import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private roleService: RolesService
    ) {}

    async createUser( dto : CreateUserDto){
        const user = await this.userModel.create(dto);
        const role = await this.roleService.getRoleValue("Admin")
        const setup = await user.$set('role', role._id)
        user.roles = role
        console.log("USER CREATE" + user)
        return user;
    }

    async getAllUser() : Promise<User[]>{
        return await this.userModel.find().exec()
    }
    async getUserByEmail(email:string){
        const user = await this.userModel.findOne({email});
        return user;
    }
    async addRole(dto : AddRoleDto){
        const user = await this.userModel.findById(dto.userId)
        const role  = await this.roleService.getRoleValue(dto.value)

        if (role && user){
            await user.$set('role', role._id)
            return dto;
        }

        throw new HttpException("User or role not found", HttpStatus.NOT_FOUND)

    }
    async removeAll(){
        return this.userModel.deleteMany({});
    }
}

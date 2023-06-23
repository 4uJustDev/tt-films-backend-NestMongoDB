import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

    async createRole( dto : CreateRoleDto){
        const role = await this.roleModel.create(dto);
        return role;
    }

    async getRoleValue( value : string){
        const role = await this.roleModel.findOne({value})

        return role;
    }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/roles.schema';

@Controller('roles')
export class RolesController {

    constructor(
        private rolesService : RolesService
    ){}

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.rolesService.createRole(dto);
    }

    @Get()
    getAll(): Promise<Role[]>{
        return this.rolesService.getAll()
    }

    @Get(":value")
    getByValue(@Param('value') value : string){
        return this.rolesService.getRoleValue(value);
    }

    
}

import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}
    //Создание пользователя без JWT
    @Post()
    create(@Body() userDto : CreateUserDto ){
        return this.userService.createUser(userDto);
    }
    //Получение списка всех пользователей
    @Get()
    getAll(){
        return this.userService.getAllUser();
    }
    //Выдача ролей
    @Post('role')
    addRole(@Body() dto : AddRoleDto){
        return this.userService.addRole(dto);
    }

    @Delete()
    removeDocuments(){
        return this.userService.removeAll()
    }
}
    //@Roles("ADMIN")
    //@UseGuards(RolesGuard)

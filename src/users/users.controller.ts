import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post()
    create(@Body() userDto : CreateUserDto ){
        return this.userService.createUser(userDto);
    }

    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAll(){
        return this.userService.getAllUser();
    }
}

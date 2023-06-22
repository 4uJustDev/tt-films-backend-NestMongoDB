import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('signup')
    register(@Body() signUpDto : SignUpDto) : Promise<{ token: string }>{
        return this.authService.signUp(signUpDto);
    }

    @Get('login')
    login(@Body() loginDto : LoginDto) : Promise<{ token: string }>{
        return this.authService.login(loginDto);
    }
}

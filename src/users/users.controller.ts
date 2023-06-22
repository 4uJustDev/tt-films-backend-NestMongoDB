import { Body, Controller, Post} from '@nestjs/common';

@Controller('auth')
export class UsersController {

    @Post('login')
    auntification(@Body() body : string){
        console.log(body)
        return {
            success: true
        }
    }
}
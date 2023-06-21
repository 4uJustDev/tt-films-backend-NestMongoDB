import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('/')
export class FilmsController {
    constructor(private readonly filmService : FilmsService){}

    @Get()
    MainRoot(){
        return this.filmService.hello();
    }
}

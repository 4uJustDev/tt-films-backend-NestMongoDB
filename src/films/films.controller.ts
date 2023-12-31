import { 
    Controller,
     Get,
     Param,
     Post,
     Body,
     Delete,
     Put,
     UseGuards
} from '@nestjs/common';
import { FilmsService} from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './schemas/films.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/movies')
export class FilmsController {
    constructor(private filmService : FilmsService){}

    @Get()
    getAll(): Promise<Film[]>{
        return this.filmService.getAll()
    }
    
    @Get(':id')
    getOne(@Param('id') id: number) :Promise<Film>{
        return this.filmService.getById(id)
    }
    @Post()
    create(@Body() film : CreateFilmDto) :Promise<Film>{
        return this.filmService.create(film)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id : number) :Promise<Film>{
        return this.filmService.remove(id)
    }

    @Put(':id')
    update (@Body() updateFilmDto : UpdateFilmDto, @Param('id') id : number) :Promise<Film>{
        return this.filmService.update(id, updateFilmDto)
    }

    @Delete()
    removeDocuments(){
        return this.filmService.removeAll()
    }

}

// @UseGuards(JwtAuthGuard)
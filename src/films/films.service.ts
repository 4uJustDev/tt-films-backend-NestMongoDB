import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/films.schema';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
    
    constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

    async getAll(): Promise<Film[]>{
        return this.filmModel.find().exec()
    }

    async getById(id: number): Promise<Film>{
        return this.filmModel.findById(id);
    }

    async create( dto: CreateFilmDto): Promise<Film>{
        const createdFilm  = await this.filmModel.create(dto);
        return createdFilm;
    }

    async update(id: number, dto: UpdateFilmDto): Promise<Film>{
        return this.filmModel.findByIdAndUpdate(id, dto);
    }
    async remove(id: number): Promise<Film>{
        return this.filmModel.findByIdAndRemove(id);
    }

    async removeAll(){
        return this.filmModel.deleteMany({});
    }

}

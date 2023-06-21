import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './schemas/films.schema';

@Module({
  imports : [MongooseModule.forFeature([
    {name: Film.name, schema: FilmSchema}
  ])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}

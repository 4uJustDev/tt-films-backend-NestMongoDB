import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './schemas/films.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [MongooseModule.forFeature([
    {name: Film.name, schema: FilmSchema}
  ]),
  AuthModule

],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}

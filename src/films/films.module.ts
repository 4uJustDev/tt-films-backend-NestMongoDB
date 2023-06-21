import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}

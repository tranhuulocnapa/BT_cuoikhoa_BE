import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [PrismaModule],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}

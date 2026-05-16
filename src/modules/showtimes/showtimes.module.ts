import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SeatsModule } from '../seats/seats.module';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';

@Module({
  imports: [PrismaModule, SeatsModule],
  providers: [ShowtimesService],
  controllers: [ShowtimesController],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}

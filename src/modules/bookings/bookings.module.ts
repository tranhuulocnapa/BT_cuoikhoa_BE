import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SeatsModule } from '../seats/seats.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [PrismaModule, SeatsModule],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}

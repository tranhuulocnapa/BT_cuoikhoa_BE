import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ShowtimesModule } from '../showtimes/showtimes.module';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';

@Module({
  imports: [PrismaModule, ShowtimesModule],
  providers: [TheatersService],
  controllers: [TheatersController],
})
export class TheatersModule {}

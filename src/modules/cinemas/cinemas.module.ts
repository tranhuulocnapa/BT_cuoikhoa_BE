import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';

@Module({
  imports: [PrismaModule],
  providers: [CinemasService],
  controllers: [CinemasController],
})
export class CinemasModule {}

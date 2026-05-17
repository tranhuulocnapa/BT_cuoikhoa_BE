import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeatsService } from './seats.service';

@ApiTags('QuanLyGhe')
@Controller('QuanLyGhe')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}
}

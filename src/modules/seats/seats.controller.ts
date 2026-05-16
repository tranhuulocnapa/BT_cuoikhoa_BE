import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeatsService } from './seats.service';

@ApiTags('QuanLyGhe')
@Controller('api/QuanLyGhe')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}
}

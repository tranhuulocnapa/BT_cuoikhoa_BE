import {
  Controller,
  Post,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/showtime.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('QuanLyDatVe')
@Controller('QuanLyDatVe')
export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  @Post('TaoLichChieu')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo lịch chiếu' })
  @ApiResponse({ status: 201, description: 'Tạo lịch chiếu thành công' })
  async createShowtime(@Body() dto: CreateShowtimeDto) {
    return this.showtimesService.create(dto);
  }
}

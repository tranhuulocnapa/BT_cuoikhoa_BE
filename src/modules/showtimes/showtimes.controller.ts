import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
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
import { ShowtimesService, CreateShowtimeDto } from './showtimes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('QuanLyDatVe')
@Controller('api/QuanLyDatVe')
export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  @Post('TaoLichChieu')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo lịch chiếu' })
  @ApiResponse({ status: 201, description: 'Tạo lịch chiếu thành công' })
  async createShowtime(@Body() dto: any) {
    if (!dto.maPhim || !dto.maRap || !dto.ngayChieuGioChieu || !dto.giaVe) {
      throw new BadRequestException('Thiếu thông tin bắt buộc');
    }

    const createShowtimeDto: CreateShowtimeDto = {
      maPhim: dto.maPhim,
      maRap: parseInt(dto.maRap, 10),
      ngayGioChieu: dto.ngayChieuGioChieu,
      giaVe: dto.giaVe,
    };

    return this.showtimesService.create(createShowtimeDto);
  }

  @Get('LayThongTinLichChieuPhim')
  @ApiOperation({ summary: 'Lấy thông tin lịch chiếu phim' })
  @ApiResponse({ status: 200, description: 'Danh sách lịch chiếu' })
  async getMovieShowtimes(@Query('MaPhim') maPhim: string) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    return this.showtimesService.findByMovie(maPhimNum);
  }
}

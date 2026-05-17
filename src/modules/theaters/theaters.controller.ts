import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TheatersService } from './theaters.service';
import { ShowtimesService } from '../showtimes/showtimes.service';

@ApiTags('QuanLyRap')
@Controller('QuanLyRap')
export class TheatersController {
  constructor(
    private theatersService: TheatersService,
    private showtimesService: ShowtimesService,
  ) {}

  @Get('LayThongTinHeThongRap')
  @ApiOperation({ summary: 'Lấy thông tin hệ thống rạp' })
  @ApiResponse({ status: 200, description: 'Thông tin hệ thống rạp' })
  async getTheaterSystems(@Query('maHeThongRap') maHeThongRap?: string) {
    return this.theatersService.findAll(maHeThongRap);
  }

  @Get('LayThongTinCumRapTheoHeThong')
  @ApiOperation({ summary: 'Lấy thông tin cụm rạp theo hệ thống' })
  @ApiResponse({ status: 200, description: 'Thông tin cụm rạp' })
  async getCinemaClustersByTheater(
    @Query('maHeThongRap') maHeThongRap: string,
  ) {
    if (!maHeThongRap) {
      return [];
    }
    return this.theatersService.findCinemasByTheater(maHeThongRap);
  }

  @Get('LayThongTinLichChieuHeThongRap')
  @ApiOperation({ summary: 'Lấy thông tin lịch chiếu theo hệ thống rạp' })
  @ApiResponse({ status: 200, description: 'Danh sách lịch chiếu' })
  async getShowtimesByTheater(
    @Query('maHeThongRap') maHeThongRap: string,
    @Query('maNhom') maNhom?: string,
  ) {
    if (!maHeThongRap) {
      return [];
    }
    const maHeThongRapNum = parseInt(maHeThongRap, 10);
    if (Number.isNaN(maHeThongRapNum)) {
      throw new BadRequestException('maHeThongRap phải là số nguyên hợp lệ');
    }
    return this.showtimesService.findByTheater(maHeThongRapNum, maNhom);
  }

  @Get('LayThongTinLichChieuPhim')
  @ApiOperation({ summary: 'Lấy thông tin lịch chiếu phim' })
  @ApiResponse({ status: 200, description: 'Thông tin lịch chiếu phim' })
  async getMovieShowtimes(@Query('MaPhim') maPhim: string) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    if (Number.isNaN(maPhimNum)) {
      throw new BadRequestException('MaPhim phải là số nguyên hợp lệ');
    }
    return this.showtimesService.findByMovie(maPhimNum);
  }
}

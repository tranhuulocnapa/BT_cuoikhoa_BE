import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { BookSeatDto } from './dto/bookings.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('QuanLyDatVe')
@Controller('QuanLyDatVe')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('DatVe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đặt vé' })
  @ApiResponse({ status: 201, description: 'Đặt vé thành công' })
  async bookSeats(@Body() dto: BookSeatDto, @CurrentUser() user: JwtPayload) {
    if (!dto.maLichChieu || !dto.danhSachVe || dto.danhSachVe.length === 0) {
      throw new BadRequestException('Thiếu thông tin bắt buộc');
    }

    const taiKhoanNum = parseInt(user.taiKhoan, 10);
    if (Number.isNaN(taiKhoanNum)) {
      throw new BadRequestException(
        'TaiKhoan hợp lệ không tìm thấy trong token',
      );
    }

    return this.bookingsService.bookSeats(taiKhoanNum, dto);
  }

  @Get('LayDanhSachPhongVe')
  @ApiOperation({ summary: 'Lấy danh sách phòng vé (ghế)' })
  @ApiResponse({ status: 200, description: 'Danh sách ghế' })
  async getSeats(@Query('MaLichChieu') maLichChieu: string) {
    if (!maLichChieu) {
      throw new BadRequestException('MaLichChieu là bắt buộc');
    }
    const maLichChieuNum = parseInt(maLichChieu, 10);
    if (Number.isNaN(maLichChieuNum)) {
      throw new BadRequestException('MaLichChieu phải là số nguyên hợp lệ');
    }
    return this.bookingsService.getShowtimeSeats(maLichChieuNum);
  }
}

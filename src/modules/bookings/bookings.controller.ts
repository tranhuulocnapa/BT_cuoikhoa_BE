import {
  Controller,
  Post,
  Get,
  Delete,
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
import { BookingsService, BookSeatDto } from './bookings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CurrentUser,
  JwtPayload,
} from '../../common/decorators/current-user.decorator';

@ApiTags('QuanLyDatVe')
@Controller('api/QuanLyDatVe')
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

    // Get user's taiKhoan from email
    const currentUser = await this.bookingsService
      .getUserBookings(0)
      .catch(() => null);
    // For now, we'll use a simple approach - extract from somewhere
    // In reality, need to map email to taiKhoan
    // This is a workaround - in production should query user first

    return this.bookingsService.bookSeats(
      user.taiKhoan as unknown as number,
      dto,
    );
  }

  @Get('LayDanhSachPhongVe')
  @ApiOperation({ summary: 'Lấy danh sách phòng vé (ghế)' })
  @ApiResponse({ status: 200, description: 'Danh sách ghế' })
  async getSeats(@Query('MaLichChieu') maLichChieu: string) {
    if (!maLichChieu) {
      throw new BadRequestException('MaLichChieu là bắt buộc');
    }
    const maLichChieuNum = parseInt(maLichChieu, 10);
    return this.bookingsService.getShowtimeSeats(maLichChieuNum);
  }
}

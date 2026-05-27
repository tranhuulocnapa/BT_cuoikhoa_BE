import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SeatsService } from '../seats/seats.service';
import { BookSeatDto } from './dto/bookings.dto';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private seatsService: SeatsService,
  ) {}

  async bookSeats(taiKhoan: string, dto: BookSeatDto) {
    // Kiểm tra lịch chiếu tồn tại
    const showtime = await this.prisma.lich_chieu.findUnique({
      where: { ma_lich_chieu: dto.maLichChieu },
    });

    if (!showtime) {
      throw new BadRequestException('Lịch chiếu không tồn tại');
    }

    // Kiểm tra ghế tồn tại và chưa bị đặt
    const bookedSeats = await this.prisma.dat_ve.findMany({
      where: {
        ma_lich_chieu: dto.maLichChieu,
        ma_ghe: { in: dto.danhSachVe.map((v) => v.maGhe) },
      },
    });

    if (bookedSeats.length > 0) {
      throw new ConflictException('Một số ghế đã được đặt');
    }

    // Đặt vé
    const bookings: {
      taiKhoan: string;
      maLichChieu: number;
      maGhe: number;
      tenGhe?: string;
    }[] = [];
    for (const ve of dto.danhSachVe) {
      const seat = await this.prisma.ghe.findUnique({
        where: { ma_ghe: ve.maGhe },
      });

      if (!seat) {
        throw new BadRequestException(`Ghế ${ve.maGhe} không tồn tại`);
      }

      const booking = await this.prisma.dat_ve.create({
        data: {
          tai_khoan: taiKhoan,
          ma_lich_chieu: dto.maLichChieu,
          ma_ghe: ve.maGhe,
        },
        include: { ghe: true, lich_chieu: true },
      });

      bookings.push(this.formatBooking(booking));
    }

    return {
      message: 'Đặt vé thành công',
      danhSachVeDat: bookings,
    };
  }

  async getShowtimeSeats(maLichChieu: number) {
    const showtime = await this.prisma.lich_chieu.findUnique({
      where: { ma_lich_chieu: maLichChieu },
    });

    if (!showtime) {
      throw new NotFoundException('Lịch chiếu không tìm thấy');
    }

    return this.seatsService.findByShowtime(maLichChieu);
  }

  async getUserBookings(taiKhoan: string) {
    const bookings = await this.prisma.dat_ve.findMany({
      where: { tai_khoan: taiKhoan },
      include: {
        lich_chieu: { include: { phim: true, rap_phim: true } },
        ghe: true,
      },
      orderBy: { lich_chieu: { ngay_gio_chieu: 'desc' } },
    });

    return bookings.map((b) => ({
      taiKhoan: b.tai_khoan,
      maLichChieu: b.ma_lich_chieu,
      maGhe: b.ma_ghe,
      tenGhe: b.ghe?.ten_ghe,
      phim: {
        maPhim: b.lich_chieu.ma_phim,
        tenPhim: b.lich_chieu.phim?.ten_phim,
      },
      lichChieu: {
        maLichChieu: b.lich_chieu.ma_lich_chieu,
        ngayGioChieu: b.lich_chieu.ngay_gio_chieu,
        giaVe: b.lich_chieu.gia_ve,
        rap: {
          maRap: b.lich_chieu.rap_phim?.ma_rap,
          tenRap: b.lich_chieu.rap_phim?.ten_rap,
        },
      },
    }));
  }

  async cancelBooking(taiKhoan: string, maLichChieu: number, maGhe: number) {
    const booking = await this.prisma.dat_ve.findUnique({
      where: {
        tai_khoan_ma_lich_chieu_ma_ghe: {
          tai_khoan: taiKhoan,
          ma_lich_chieu: maLichChieu,
          ma_ghe: maGhe,
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Vé không tìm thấy');
    }

    await this.prisma.dat_ve.delete({
      where: {
        tai_khoan_ma_lich_chieu_ma_ghe: {
          tai_khoan: taiKhoan,
          ma_lich_chieu: maLichChieu,
          ma_ghe: maGhe,
        },
      },
    });

    return { message: 'Hủy vé thành công' };
  }

  private formatBooking(booking: any): {
    taiKhoan: string;
    maLichChieu: number;
    maGhe: number;
    tenGhe?: string;
  } {
    return {
      taiKhoan: booking.tai_khoan,
      maLichChieu: booking.ma_lich_chieu,
      maGhe: booking.ma_ghe,
      tenGhe: booking.ghe?.ten_ghe,
    };
  }
}

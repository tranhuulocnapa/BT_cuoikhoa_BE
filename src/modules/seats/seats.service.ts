import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService) {}

  async findByShowtime(maLichChieu: number) {
    const showtime = await this.prisma.lich_chieu.findUnique({
      where: { ma_lich_chieu: maLichChieu },
      include: { rap_phim: { include: { ghe: true } } },
    });

    if (!showtime) {
      return [];
    }

    // Get booked seats for this showtime
    const bookedSeats = await this.prisma.dat_ve.findMany({
      where: { ma_lich_chieu: maLichChieu },
      include: { ghe: true },
    });

    const bookedSeatIds = new Set(bookedSeats.map((dv) => dv.ma_ghe));

    return showtime.rap_phim.ghe.map((g) => ({
      maGhe: g.ma_ghe,
      tenGhe: g.ten_ghe,
      loaiGhe: g.loai_ghe,
      maRap: g.ma_rap,
      daDat: bookedSeatIds.has(g.ma_ghe),
    }));
  }

  async findByRap(maRap: number) {
    const seats = await this.prisma.ghe.findMany({
      where: { ma_rap: maRap },
      orderBy: [{ ten_ghe: 'asc' }],
    });

    return seats.map((g) => ({
      maGhe: g.ma_ghe,
      tenGhe: g.ten_ghe,
      loaiGhe: g.loai_ghe,
      maRap: g.ma_rap,
    }));
  }
}

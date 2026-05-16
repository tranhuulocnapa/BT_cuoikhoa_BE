import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CinemasService {
  constructor(private prisma: PrismaService) {}

  async findOne(maRap: number) {
    const cinema = await this.prisma.rap_phim.findUnique({
      where: { ma_rap: maRap },
      include: {
        cum_rap: true,
        ghe: true,
        lich_chieu: true,
      },
    });

    if (!cinema) {
      throw new NotFoundException('Rạp phim không tìm thấy');
    }

    return this.formatCinema(cinema);
  }

  async findByCluster(maCumRap: number) {
    const cinemas = await this.prisma.rap_phim.findMany({
      where: { ma_cum_rap: maCumRap },
      include: {
        cum_rap: true,
        ghe: true,
        lich_chieu: true,
      },
    });

    return cinemas.map((c) => this.formatCinema(c));
  }

  private formatCinema(cinema: any) {
    return {
      maRap: cinema.ma_rap,
      tenRap: cinema.ten_rap,
      maCumRap: cinema.ma_cum_rap,
      cumRap: cinema.cum_rap,
      ghe: cinema.ghe.map((g) => ({
        maGhe: g.ma_ghe,
        tenGhe: g.ten_ghe,
        loaiGhe: g.loai_ghe,
        maRap: g.ma_rap,
      })),
      lichChieu: cinema.lich_chieu.map((lc) => ({
        maLichChieu: lc.ma_lich_chieu,
        maRap: lc.ma_rap,
        maPhim: lc.ma_phim,
        ngayGioChieu: lc.ngay_gio_chieu,
        giaVe: lc.gia_ve,
      })),
    };
  }
}

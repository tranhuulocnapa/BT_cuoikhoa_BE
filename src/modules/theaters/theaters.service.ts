import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TheatersService {
  constructor(private prisma: PrismaService) {}

  async findAll(maHeThongRap?: string) {
    const whereClause: any = {};
    if (maHeThongRap) {
      whereClause.ma_he_thong_rap = parseInt(maHeThongRap, 10);
    }

    const theaters = await this.prisma.he_thong_rap.findMany({
      where: whereClause,
      include: { cum_rap: { include: { rap_phim: true } } },
      orderBy: { ma_he_thong_rap: 'asc' },
    });

    return theaters.map((t) => ({
      maHeThongRap: t.ma_he_thong_rap,
      tenHeThongRap: t.ten_he_thong_rap,
      logo: t.logo,
      cumRap: t.cum_rap.map((cr) => ({
        maCumRap: cr.ma_cum_rap,
        tenCumRap: cr.ten_cum_rap,
        diaChi: cr.dia_chi,
        maHeThongRap: cr.ma_he_thong_rap,
        rapPhim: cr.rap_phim.map((rp) => ({
          maRap: rp.ma_rap,
          tenRap: rp.ten_rap,
          maCumRap: rp.ma_cum_rap,
        })),
      })),
    }));
  }

  async findCinemasByTheater(maHeThongRap: string) {
    const maHeThongRapNum = parseInt(maHeThongRap, 10);

    const theater = await this.prisma.he_thong_rap.findUnique({
      where: { ma_he_thong_rap: maHeThongRapNum },
      include: {
        cum_rap: {
          include: {
            rap_phim: true,
          },
        },
      },
    });

    if (!theater) {
      return [];
    }

    return {
      maHeThongRap: theater.ma_he_thong_rap,
      tenHeThongRap: theater.ten_he_thong_rap,
      logo: theater.logo,
      cumRap: theater.cum_rap.map((cr) => ({
        maCumRap: cr.ma_cum_rap,
        tenCumRap: cr.ten_cum_rap,
        diaChi: cr.dia_chi,
        maHeThongRap: cr.ma_he_thong_rap,
        rapPhim: cr.rap_phim.map((rp) => ({
          maRap: rp.ma_rap,
          tenRap: rp.ten_rap,
          maCumRap: rp.ma_cum_rap,
        })),
      })),
    };
  }
}

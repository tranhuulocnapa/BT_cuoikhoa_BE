import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SeatsService } from '../seats/seats.service';
import { CreateShowtimeDto } from './dto/showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(
    private prisma: PrismaService,
    private seatsService: SeatsService,
  ) {}

  async create(dto: CreateShowtimeDto) {
    const nextMaLichChieu = await this.getNextMaLichChieu();

    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim: dto.maPhim },
    });

    if (!movie) {
      throw new BadRequestException('Phim không tồn tại');
    }

    const cinema = await this.prisma.rap_phim.findUnique({
      where: { ma_rap: dto.maRap },
    });

    if (!cinema) {
      throw new BadRequestException('Rạp phim không tồn tại');
    }

    const showtime = await this.prisma.lich_chieu.create({
      data: {
        ma_lich_chieu: nextMaLichChieu,
        ma_phim: dto.maPhim,
        ma_rap: dto.maRap,
        ngay_gio_chieu: new Date(dto.ngayChieuGioChieu),
        gia_ve: dto.giaVe,
      },
      include: { phim: true, rap_phim: true },
    });

    return this.formatShowtime(showtime);
  }

  async findByMovie(maPhim: number) {
    const showtimes = await this.prisma.lich_chieu.findMany({
      where: { ma_phim: maPhim },
      include: {
        phim: true,
        rap_phim: { include: { cum_rap: true } },
        dat_ve: true,
      },
      orderBy: { ngay_gio_chieu: 'asc' },
    });

    // Group by cinema system and date
    const groupedBySystem = new Map();

    for (const showtime of showtimes) {
      const systemKey = showtime.rap_phim.cum_rap.ma_he_thong_rap;
      if (!groupedBySystem.has(systemKey)) {
        groupedBySystem.set(systemKey, {
          heThongRap: {
            maHeThongRap: showtime.rap_phim.cum_rap.ma_he_thong_rap,
          },
          cumRap: [],
        });
      }

      const group = groupedBySystem.get(systemKey);
      let cumRapEntry = group.cumRap.find(
        (cr) => cr.maCumRap === showtime.rap_phim.ma_cum_rap,
      );

      if (!cumRapEntry) {
        cumRapEntry = {
          maCumRap: showtime.rap_phim.ma_cum_rap,
          tenCumRap: showtime.rap_phim.cum_rap.ten_cum_rap,
          diaChi: showtime.rap_phim.cum_rap.dia_chi,
          danhSachRap: [],
        };
        group.cumRap.push(cumRapEntry);
      }

      let rapEntry = cumRapEntry.danhSachRap.find(
        (r) => r.maRap === showtime.ma_rap,
      );

      if (!rapEntry) {
        rapEntry = {
          maRap: showtime.ma_rap,
          tenRap: showtime.rap_phim.ten_rap,
          danhSachGioChieu: [],
        };
        cumRapEntry.danhSachRap.push(rapEntry);
      }

      rapEntry.danhSachGioChieu.push({
        maLichChieu: showtime.ma_lich_chieu,
        ngayGioChieu: showtime.ngay_gio_chieu,
        giaVe: showtime.gia_ve,
        trangThaiDat: showtime.dat_ve.length > 0,
      });
    }

    return Array.from(groupedBySystem.values());
  }

  async findByTheater(maHeThongRap: number, maNhom?: string) {
    const theaters = await this.prisma.he_thong_rap.findMany({
      where: {
        ma_he_thong_rap: maHeThongRap,
      },
      include: {
        cum_rap: {
          include: {
            rap_phim: {
              include: {
                lich_chieu: {
                  include: {
                    phim: true,
                    dat_ve: true,
                  },
                  orderBy: { ngay_gio_chieu: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    return theaters.map((t) => ({
      maHeThongRap: t.ma_he_thong_rap,
      tenHeThongRap: t.ten_he_thong_rap,
      logo: t.logo,
      cumRap: t.cum_rap.map((cr) => ({
        maCumRap: cr.ma_cum_rap,
        tenCumRap: cr.ten_cum_rap,
        diaChi: cr.dia_chi,
        danhSachRap: cr.rap_phim.map((rp) => ({
          maRap: rp.ma_rap,
          tenRap: rp.ten_rap,
          danhSachLichChieu: rp.lich_chieu.map((lc) => ({
            maLichChieu: lc.ma_lich_chieu,
            maPhim: lc.ma_phim,
            tenPhim: lc.phim?.ten_phim,
            ngayGioChieu: lc.ngay_gio_chieu,
            giaVe: lc.gia_ve,
          })),
        })),
      })),
    }));
  }

  private formatShowtime(showtime: any) {
    return {
      maLichChieu: showtime.ma_lich_chieu,
      maPhim: showtime.ma_phim,
      maRap: showtime.ma_rap,
      ngayGioChieu: showtime.ngay_gio_chieu,
      giaVe: showtime.gia_ve,
    };
  }

  private async getNextMaLichChieu() {
    const latestShowtime = await this.prisma.lich_chieu.findFirst({
      orderBy: { ma_lich_chieu: 'desc' },
      select: { ma_lich_chieu: true },
    });

    return (latestShowtime?.ma_lich_chieu || 0) + 1;
  }
}

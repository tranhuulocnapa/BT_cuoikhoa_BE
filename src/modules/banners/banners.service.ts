import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const banners = await this.prisma.banner.findMany({
      include: { phim: true },
      orderBy: { ma_banner: 'desc' },
    });

    return banners.map((b) => ({
      maBanner: b.ma_banner,
      maPhim: b.ma_phim,
      hinhAnh: b.hinh_anh,
      phim: b.phim
        ? {
            maPhim: b.phim.ma_phim,
            tenPhim: b.phim.ten_phim,
          }
        : null,
    }));
  }
}

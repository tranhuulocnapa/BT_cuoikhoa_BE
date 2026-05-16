import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateMovieDto,
  UpdateMovieDto,
  GetMoviesQueryDto,
} from './dto/movie.dto';
import {
  calculatePagination,
  createPaginationMeta,
  PaginatedResponse,
} from '../../common/utils/pagination.util';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMovieDto) {
    const movie = await this.prisma.phim.create({
      data: {
        ten_phim: dto.tenPhim,
        trailer: dto.trailer || null,
        hinh_anh: dto.hinhAnh || null,
        mo_ta: dto.moTa || null,
        ngay_khoi_chieu: dto.ngayKhoiChieu ? new Date(dto.ngayKhoiChieu) : null,
        danh_gia: dto.danhGia || 0,
        hot: dto.hot || false,
        dang_chieu: dto.dangChieu || false,
        sap_chieu: dto.sapChieu || false,
      },
    });

    return this.formatMovie(movie);
  }

  async findAll(query: GetMoviesQueryDto): Promise<PaginatedResponse<any>> {
    const { soTrang = 1, soPhanTuTrenTrang = 10, tenPhim = '' } = query;
    const { skip, take } = calculatePagination(soTrang, soPhanTuTrenTrang);

    const whereClause: any = {};
    if (tenPhim) {
      whereClause.ten_phim = { contains: tenPhim };
    }

    const [movies, total] = await Promise.all([
      this.prisma.phim.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { ma_phim: 'desc' },
      }),
      this.prisma.phim.count({ where: whereClause }),
    ]);

    return {
      items: movies.map((m) => this.formatMovie(m)),
      meta: createPaginationMeta(soTrang, soPhanTuTrenTrang, total),
    };
  }

  async findByDate(query: GetMoviesQueryDto): Promise<PaginatedResponse<any>> {
    const {
      soTrang = 1,
      soPhanTuTrenTrang = 10,
      tenPhim = '',
      tuNgay = '',
      denNgay = '',
    } = query;
    const { skip, take } = calculatePagination(soTrang, soPhanTuTrenTrang);

    const whereClause: any = {};
    if (tenPhim) {
      whereClause.ten_phim = { contains: tenPhim };
    }

    if (tuNgay || denNgay) {
      whereClause.ngay_khoi_chieu = {};
      if (tuNgay) {
        whereClause.ngay_khoi_chieu.gte = new Date(tuNgay);
      }
      if (denNgay) {
        whereClause.ngay_khoi_chieu.lte = new Date(denNgay);
      }
    }

    const [movies, total] = await Promise.all([
      this.prisma.phim.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { ngay_khoi_chieu: 'desc' },
      }),
      this.prisma.phim.count({ where: whereClause }),
    ]);

    return {
      items: movies.map((m) => this.formatMovie(m)),
      meta: createPaginationMeta(soTrang, soPhanTuTrenTrang, total),
    };
  }

  async findOne(maPhim: number) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim: maPhim },
      include: { banner: true, lich_chieu: true },
    });

    if (!movie) {
      throw new NotFoundException('Phim không tìm thấy');
    }

    return this.formatMovieWithRelations(movie);
  }

  async update(maPhim: number, dto: UpdateMovieDto) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim: maPhim },
    });

    if (!movie) {
      throw new NotFoundException('Phim không tìm thấy');
    }

    const updateData: any = {};
    if (dto.tenPhim) updateData.ten_phim = dto.tenPhim;
    if (dto.trailer) updateData.trailer = dto.trailer;
    if (dto.hinhAnh) updateData.hinh_anh = dto.hinhAnh;
    if (dto.moTa) updateData.mo_ta = dto.moTa;
    if (dto.ngayKhoiChieu)
      updateData.ngay_khoi_chieu = new Date(dto.ngayKhoiChieu);
    if (dto.danhGia !== undefined) updateData.danh_gia = dto.danhGia;
    if (dto.hot !== undefined) updateData.hot = dto.hot;
    if (dto.dangChieu !== undefined) updateData.dang_chieu = dto.dangChieu;
    if (dto.sapChieu !== undefined) updateData.sap_chieu = dto.sapChieu;

    const updatedMovie = await this.prisma.phim.update({
      where: { ma_phim: maPhim },
      data: updateData,
    });

    return this.formatMovie(updatedMovie);
  }

  async delete(maPhim: number) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim: maPhim },
    });

    if (!movie) {
      throw new NotFoundException('Phim không tìm thấy');
    }

    await this.prisma.phim.delete({
      where: { ma_phim: maPhim },
    });

    return { message: 'Xóa phim thành công' };
  }

  private formatMovie(movie: any) {
    return {
      maPhim: movie.ma_phim,
      tenPhim: movie.ten_phim,
      trailer: movie.trailer,
      hinhAnh: movie.hinh_anh,
      moTa: movie.mo_ta,
      ngayKhoiChieu: movie.ngay_khoi_chieu,
      danhGia: movie.danh_gia,
      hot: movie.hot,
      dangChieu: movie.dang_chieu,
      sapChieu: movie.sap_chieu,
    };
  }

  private formatMovieWithRelations(movie: any) {
    return {
      maPhim: movie.ma_phim,
      tenPhim: movie.ten_phim,
      trailer: movie.trailer,
      hinhAnh: movie.hinh_anh,
      moTa: movie.mo_ta,
      ngayKhoiChieu: movie.ngay_khoi_chieu,
      danhGia: movie.danh_gia,
      hot: movie.hot,
      dangChieu: movie.dang_chieu,
      sapChieu: movie.sap_chieu,
      banner: movie.banner,
      lichChieu: movie.lich_chieu,
    };
  }
}

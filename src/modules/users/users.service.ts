import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, GetUsersQueryDto } from './dto/user.dto';
import {
  calculatePagination,
  createPaginationMeta,
  PaginatedResponse,
} from '../../common/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được đăng ký');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.matKhau, 10);

    const user = await this.prisma.nguoi_dung.create({
      data: {
        ho_ten: dto.hoTen,
        email: dto.email,
        mat_khau: hashedPassword,
        so_dt: dto.soDt || null,
        loai_nguoi_dung: dto.loaiNguoiDung || 'KhachHang',
      },
    });

    return this.formatUser(user);
  }

  async findAll(query: GetUsersQueryDto): Promise<PaginatedResponse<any>> {
    const { soTrang = 1, soPhanTuTrenTrang = 10, tuKhoa = '' } = query;
    const { skip, take } = calculatePagination(soTrang, soPhanTuTrenTrang);

    const whereClause: any = {};
    if (tuKhoa) {
      whereClause.OR = [
        { ho_ten: { contains: tuKhoa } },
        { email: { contains: tuKhoa } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.nguoi_dung.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { tai_khoan: 'desc' },
      }),
      this.prisma.nguoi_dung.count({ where: whereClause }),
    ]);

    return {
      items: users.map((u) => this.formatUser(u)),
      meta: createPaginationMeta(soTrang, soPhanTuTrenTrang, total),
    };
  }

  async search(query: GetUsersQueryDto): Promise<PaginatedResponse<any>> {
    return this.findAll(query);
  }

  async findOne(taiKhoan: number) {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tìm thấy');
    }

    return this.formatUser(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tìm thấy');
    }

    return this.formatUser(user);
  }

  async update(taiKhoan: number, dto: UpdateUserDto) {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tìm thấy');
    }

    const updateData: any = {};
    if (dto.hoTen) updateData.ho_ten = dto.hoTen;
    if (dto.soDt) updateData.so_dt = dto.soDt;
    if (dto.matKhau) {
      updateData.mat_khau = await bcrypt.hash(dto.matKhau, 10);
    }

    const updatedUser = await this.prisma.nguoi_dung.update({
      where: { tai_khoan: taiKhoan },
      data: updateData,
    });

    return this.formatUser(updatedUser);
  }

  async delete(taiKhoan: number) {
    const user = await this.prisma.nguoi_dung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tìm thấy');
    }

    await this.prisma.nguoi_dung.delete({
      where: { tai_khoan: taiKhoan },
    });

    return { message: 'Xóa người dùng thành công' };
  }

  private formatUser(user: any) {
    return {
      taiKhoan: user.tai_khoan,
      hoTen: user.ho_ten,
      email: user.email,
      soDt: user.so_dt,
      loaiNguoiDung: user.loai_nguoi_dung,
    };
  }
}

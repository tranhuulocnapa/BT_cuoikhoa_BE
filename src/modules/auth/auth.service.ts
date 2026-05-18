import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto, LoginResponseDto } from './dto/auth.dto';
import { envConfig } from '../../configs/env.config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email đã được đăng ký');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.matKhau, 10);

    // Tạo user mới (sử dụng các cột hiện có trong database)
    const newUser = await this.prisma.nguoi_dung.create({
      data: {
        ho_ten: dto.hoTen,
        email: dto.email,
        so_dt: dto.soDt || null,
        mat_khau: hashedPassword,
        loai_nguoi_dung: dto.maLoaiNguoiDung || 'KhachHang',
      },
    });

    // Tạo JWT token
    const accessToken = this.generateAccessToken(newUser);

    return {
      accessToken,
      user: {
        taiKhoan: newUser.tai_khoan?.toString() || '',
        email: newUser.email,
        hoTen: newUser.ho_ten,
        loaiNguoiDung: newUser.loai_nguoi_dung,
      },
    };
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    // Tìm user theo email hoặc id
    const identifier = dto.taiKhoan;
    const conditions: any[] = [{ email: identifier }];

    const parsedId = parseInt(identifier, 10);
    if (!Number.isNaN(parsedId)) {
      conditions.push({ tai_khoan: parsedId });
    }

    const user = await this.prisma.nguoi_dung.findFirst({
      where: { OR: conditions },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(dto.matKhau, user.mat_khau);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // Tạo JWT token
    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
      user: {
        taiKhoan: user.tai_khoan?.toString() || '',
        email: user.email,
        hoTen: user.ho_ten,
        loaiNguoiDung: user.loai_nguoi_dung,
      },
    };
  }

  private generateAccessToken(user: any) {
    const payload = {
      taiKhoan: user.tai_khoan?.toString() || '',
      email: user.email,
      hoTen: user.ho_ten,
      loaiNguoiDung: user.loai_nguoi_dung,
    };

    return this.jwtService.sign(payload, {
      secret: envConfig.JWT_SECRET,
      expiresIn: envConfig.JWT_EXPIRATION,
    });
  }
}

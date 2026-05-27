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
    const existingUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        OR: [{ email: dto.email }, { tai_khoan: dto.taiKhoan }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoac tai khoan da duoc dang ky');
    }

    const hashedPassword = await bcrypt.hash(dto.matKhau, 10);

    const newUser = await this.prisma.nguoi_dung.create({
      data: {
        tai_khoan: dto.taiKhoan,
        ma_nhom: dto.maNhom || 'GP01',
        ho_ten: dto.hoTen,
        email: dto.email,
        so_dt: dto.soDt || null,
        mat_khau: hashedPassword,
        loai_nguoi_dung: dto.maLoaiNguoiDung || 'KhachHang',
      },
    });

    const accessToken = this.generateAccessToken(newUser);

    return {
      accessToken,
      user: {
        taiKhoan: newUser.tai_khoan,
        email: newUser.email,
        hoTen: newUser.ho_ten,
        loaiNguoiDung: newUser.loai_nguoi_dung,
        maNhom: newUser.ma_nhom || 'GP01',
      },
    };
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const identifier = dto.taiKhoan;

    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        OR: [{ email: identifier }, { tai_khoan: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Tai khoan hoac mat khau khong chinh xac',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.matKhau, user.mat_khau);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Tai khoan hoac mat khau khong chinh xac',
      );
    }

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
      user: {
        taiKhoan: user.tai_khoan,
        email: user.email,
        hoTen: user.ho_ten,
        loaiNguoiDung: user.loai_nguoi_dung,
      },
    };
  }

  private generateAccessToken(user: any) {
    const payload = {
      taiKhoan: user.tai_khoan,
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

import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user123',
    description: 'Tài khoản đăng nhập',
  })
  @IsString()
  @MinLength(3)
  taiKhoan: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu',
  })
  @IsString()
  @MinLength(6)
  matKhau: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên',
  })
  @IsString()
  hoTen: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại',
    required: false,
  })
  @IsOptional()
  @IsString()
  soDt?: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'user123',
    description: 'Tài khoản đăng nhập',
  })
  @IsString()
  taiKhoan: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu',
  })
  @IsString()
  matKhau: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    example: {
      taiKhoan: 'user123',
      email: 'user@example.com',
      hoTen: 'Nguyễn Văn A',
      loaiNguoiDung: 'KhachHang',
    },
    description: 'User information',
  })
  user: {
    taiKhoan: string;
    email: string;
    hoTen: string;
    loaiNguoiDung: string | null;
  };
}

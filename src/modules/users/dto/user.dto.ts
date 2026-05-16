import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'user123',
  })
  @IsString()
  @MinLength(3)
  taiKhoan: string;

  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  matKhau: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
  })
  @IsString()
  hoTen: string;

  @ApiProperty({
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  soDt?: string;

  @ApiProperty({
    example: 'KhachHang',
    required: false,
  })
  @IsOptional()
  @IsString()
  loaiNguoiDung?: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'Nguyễn Văn A',
    required: false,
  })
  @IsOptional()
  @IsString()
  hoTen?: string;

  @ApiProperty({
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  soDt?: string;

  @ApiProperty({
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  matKhau?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  taiKhoan: number;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  hoTen: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  soDt: string | null;

  @ApiProperty({ example: 'KhachHang' })
  loaiNguoiDung: string | null;
}

export class GetUsersQueryDto {
  @ApiProperty({
    example: 'GP01',
    required: false,
  })
  @IsOptional()
  @IsString()
  maNhom?: string;

  @ApiProperty({
    example: 'Nguyễn',
    required: false,
  })
  @IsOptional()
  @IsString()
  tuKhoa?: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  soTrang?: number;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  soPhanTuTrenTrang?: number;
}

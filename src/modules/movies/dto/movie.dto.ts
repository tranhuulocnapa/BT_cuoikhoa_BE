import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Inception',
  })
  @IsString()
  tenPhim: string;

  @ApiProperty({
    example: 'https://example.com/trailer',
    required: false,
  })
  @IsOptional()
  @IsString()
  trailer?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @ApiProperty({
    example: 'Mô tả phim...',
    required: false,
  })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiProperty({
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  ngayKhoiChieu?: string;

  @ApiProperty({
    example: 8,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  danhGia?: number;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  hot?: boolean;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  dangChieu?: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  sapChieu?: boolean;
}

export class UpdateMovieDto {
  @ApiProperty({
    example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  tenPhim?: string;

  @ApiProperty({
    example: 'https://example.com/trailer',
    required: false,
  })
  @IsOptional()
  @IsString()
  trailer?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @ApiProperty({
    example: 'Mô tả phim...',
    required: false,
  })
  @IsOptional()
  @IsString()
  moTa?: string;

  @ApiProperty({
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  ngayKhoiChieu?: string;

  @ApiProperty({
    example: 8,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  danhGia?: number;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  hot?: boolean;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  dangChieu?: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  sapChieu?: boolean;
}

export class GetMoviesQueryDto {
  @ApiProperty({
    example: 'GP01',
    required: false,
  })
  @IsOptional()
  @IsString()
  maNhom?: string;

  @ApiProperty({
    example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  tenPhim?: string;

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

  @ApiProperty({
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsString()
  tuNgay?: string;

  @ApiProperty({
    example: '2023-12-31',
    required: false,
  })
  @IsOptional()
  @IsString()
  denNgay?: string;
}

export class MovieResponseDto {
  @ApiProperty({ example: 1 })
  maPhim: number;

  @ApiProperty({ example: 'Inception' })
  tenPhim: string;

  @ApiProperty({ example: 'https://example.com/trailer' })
  trailer: string | null;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  hinhAnh: string | null;

  @ApiProperty({ example: 'Mô tả phim...' })
  moTa: string | null;

  @ApiProperty({ example: '2023-01-01' })
  ngayKhoiChieu: string | null;

  @ApiProperty({ example: 8 })
  danhGia: number;

  @ApiProperty({ example: false })
  hot: boolean;

  @ApiProperty({ example: true })
  dangChieu: boolean;

  @ApiProperty({ example: false })
  sapChieu: boolean;
}

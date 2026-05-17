import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TicketDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  maGhe: number;

  @ApiProperty({ example: 100000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  giaVe: number;
}

export class BookSeatDto {
  @ApiProperty({ example: 123 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  maLichChieu: number;

  @ApiProperty({ type: [TicketDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  danhSachVe: TicketDto[];
}

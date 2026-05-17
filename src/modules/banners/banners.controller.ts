import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BannersService } from './banners.service';

@ApiTags('QuanLyPhim')
@Controller('QuanLyPhim')
export class BannersController {
  constructor(private bannersService: BannersService) {}

  @Get('LayDanhSachBanner')
  @ApiOperation({ summary: 'Lấy danh sách banner' })
  @ApiResponse({ status: 200, description: 'Danh sách banner' })
  async getAll() {
    return this.bannersService.findAll();
  }
}

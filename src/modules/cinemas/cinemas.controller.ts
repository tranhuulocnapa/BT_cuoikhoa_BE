import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CinemasService } from './cinemas.service';

@ApiTags('QuanLyRap')
@Controller('QuanLyRap')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  @Get('cinema/:maRap')
  @ApiOperation({ summary: 'Lấy thông tin rạp phim' })
  @ApiResponse({ status: 200, description: 'Thông tin rạp phim' })
  async getCinemaDetail(@Param('maRap') maRap: string) {
    const maRapNum = parseInt(maRap, 10);
    return this.cinemasService.findOne(maRapNum);
  }
}

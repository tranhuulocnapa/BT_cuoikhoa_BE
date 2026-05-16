import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import {
  CreateMovieDto,
  UpdateMovieDto,
  GetMoviesQueryDto,
  MovieResponseDto,
} from './dto/movie.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('QuanLyPhim')
@Controller('api/QuanLyPhim')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('LayDanhSachPhim')
  @ApiOperation({ summary: 'Lấy danh sách phim' })
  @ApiResponse({ status: 200, description: 'Danh sách phim' })
  async getAll(@Query() query: GetMoviesQueryDto) {
    return this.moviesService.findAll(query);
  }

  @Get('LayDanhSachPhimPhanTrang')
  @ApiOperation({ summary: 'Lấy danh sách phim phân trang' })
  @ApiResponse({ status: 200, description: 'Danh sách phim phân trang' })
  async getAllPaginated(@Query() query: GetMoviesQueryDto) {
    return this.moviesService.findAll(query);
  }

  @Get('LayDanhSachPhimTheoNgay')
  @ApiOperation({ summary: 'Lấy danh sách phim theo ngày' })
  @ApiResponse({ status: 200, description: 'Danh sách phim theo ngày' })
  async getMoviesByDate(@Query() query: GetMoviesQueryDto) {
    return this.moviesService.findByDate(query);
  }

  @Get('LayThongTinPhim')
  @ApiOperation({ summary: 'Lấy thông tin phim chi tiết' })
  @ApiResponse({ status: 200, type: MovieResponseDto })
  async getMovieDetail(@Query('MaPhim') maPhim: string) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    return this.moviesService.findOne(maPhimNum);
  }

  @Post('ThemPhimUploadHinh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Thêm phim với upload hình' })
  @ApiResponse({ status: 201, type: MovieResponseDto })
  async createMovieWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateMovieDto,
  ) {
    // Handle file upload - for now just save the filename
    if (file) {
      dto.hinhAnh = `/uploads/${file.filename}`;
    }
    return this.moviesService.create(dto);
  }

  @Post('CapNhatPhimUpload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Cập nhật phim với upload hình' })
  @ApiResponse({ status: 200, type: MovieResponseDto })
  async updateMovieWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('MaPhim') maPhim: string,
    @Body() dto: UpdateMovieDto,
  ) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    if (file) {
      dto.hinhAnh = `/uploads/${file.filename}`;
    }
    return this.moviesService.update(maPhimNum, dto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload hình ảnh' })
  @ApiResponse({ status: 200, description: 'File path' })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File là bắt buộc');
    }
    return { filePath: `/uploads/${file.filename}` };
  }

  @Delete('XoaPhim')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Xóa phim' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async deleteMovie(@Query('MaPhim') maPhim: string) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    return this.moviesService.delete(maPhimNum);
  }

  @Delete('XP')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Xóa phim (alias)' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async deleteMovieAlias(@Query('MaPhim') maPhim: string) {
    if (!maPhim) {
      throw new BadRequestException('MaPhim là bắt buộc');
    }
    const maPhimNum = parseInt(maPhim, 10);
    return this.moviesService.delete(maPhimNum);
  }
}

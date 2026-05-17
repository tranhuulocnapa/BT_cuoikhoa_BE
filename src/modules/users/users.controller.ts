import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUsersQueryDto,
  UserResponseDto,
} from './dto/user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('QuanLyNguoiDung')
@Controller('QuanLyNguoiDung')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('LayDanhSachNguoiDung')
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng' })
  async getAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('LayDanhSachNguoiDungPhanTrang')
  @ApiOperation({ summary: 'Lấy danh sách người dùng phân trang' })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng phân trang' })
  async getAllPaginated(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('TimKiemNguoiDung')
  @ApiOperation({ summary: 'Tìm kiếm người dùng' })
  @ApiResponse({ status: 200, description: 'Kết quả tìm kiếm' })
  async search(@Query() query: GetUsersQueryDto) {
    return this.usersService.search(query);
  }

  @Get('TimKiemNguoiDungPhanTrang')
  @ApiOperation({ summary: 'Tìm kiếm người dùng phân trang' })
  @ApiResponse({ status: 200, description: 'Kết quả tìm kiếm phân trang' })
  async searchPaginated(@Query() query: GetUsersQueryDto) {
    return this.usersService.search(query);
  }

  @Post('ThongTinTaiKhoan')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy thông tin tài khoản hiện tại' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getAccountInfo(@CurrentUser() user: JwtPayload) {
    return this.usersService.findByEmail(user.email);
  }

  @Post('LayThongTinNguoiDung')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getUserInfo(
    @Query('taiKhoan') taiKhoan: string,
    @CurrentUser() user: JwtPayload,
  ) {
    if (taiKhoan) {
      // Find user by email or tai khoan string
      return this.usersService.findByEmail(taiKhoan);
    }
    return this.usersService.findByEmail(user.email);
  }

  @Post('ThemNguoiDung')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Thêm người dùng mới' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put('CapNhatThongTinNguoiDung')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async updateUserInfo(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    // Get current user's taiKhoan from email
    const currentUser = await this.usersService.findByEmail(user.email);
    return this.usersService.update(currentUser.taiKhoan, dto);
  }

  @Post('CapNhatThongTinNguoiDung')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng (POST)' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async updateUserInfoPost(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const currentUser = await this.usersService.findByEmail(user.email);
    return this.usersService.update(currentUser.taiKhoan, dto);
  }

  @Delete('XoaNguoiDung')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async deleteUser(@Query('TaiKhoan') taiKhoan: string) {
    const taiKhoanNum = parseInt(taiKhoan, 10);
    return this.usersService.delete(taiKhoanNum);
  }

  @Get('LayDanhSachLoaiNguoiDung')
  @ApiOperation({ summary: 'Lấy danh sách loại người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách loại người dùng',
  })
  async getUserTypes() {
    return [
      { ma: 'QuanTriVien', ten: 'Quản trị viên' },
      { ma: 'KhachHang', ten: 'Khách hàng' },
    ];
  }
}

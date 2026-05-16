import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtPayload {
  taiKhoan: string;
  email: string;
  hoTen: string;
  loaiNguoiDung?: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);

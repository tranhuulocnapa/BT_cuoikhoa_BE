import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: unknown,
    user: any,
    info: unknown,
    context: ExecutionContext,
  ) {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}

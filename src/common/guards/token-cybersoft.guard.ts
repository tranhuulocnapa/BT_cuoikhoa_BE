import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TokenCybersoftGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers['tokencybersoft'] || request.headers['TokenCybersoft'];

    if (!token) {
      throw new UnauthorizedException('TokenCybersoft header is required');
    }

    return true;
  }
}

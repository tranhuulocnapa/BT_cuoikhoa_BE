import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { envConfig } from '../../configs/env.config';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: envConfig.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { BannersModule } from './modules/banners/banners.module';
import { TheatersModule } from './modules/theaters/theaters.module';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { SeatsModule } from './modules/seats/seats.module';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    BannersModule,
    TheatersModule,
    CinemasModule,
    SeatsModule,
    ShowtimesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

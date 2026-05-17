import * as dotenv from 'dotenv';

dotenv.config();

export interface IEnvConfig {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  PORT: number;
  NODE_ENV: string;
  UPLOAD_DIR: string;
}

export const envConfig: IEnvConfig = {
  DATABASE_URL:
    process.env.DATABASE_URL || 'mysql://root:12345@localhost:3308/movie_db',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
};

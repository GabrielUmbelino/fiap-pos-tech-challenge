import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from './postgres.constants';
import { CustomerEntity } from '../repositories/customer/customer.entity';
import { ProductEntity } from '../repositories/product/product.entity';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: process.cwd() + '/envs/.env.local' });

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DatabaseConstants.DATABASE_CONFIG_NAME,
      useFactory: (): TypeOrmModuleOptions => {
        console.log({
          host: `${process.env.POSTGRES_HOST}`,
          port: `${process.env.POSTGRES_PORT}`,
          username: `${process.env.POSTGRES_USER}`,
          password: `${process.env.POSTGRES_PASSWORD}`,
          database: `${process.env.POSTGRES_DATABASE}`,
        });
        return {
          type: DatabaseConstants.DATABASE_TYPE,
          host: `${process.env.POSTGRES_HOST}`,
          port: Number(process.env.POSTGRES_PORT),
          username: `${process.env.POSTGRES_USER}`,
          password: `${process.env.POSTGRES_PASSWORD}`,
          database: `${process.env.POSTGRES_DATABASE}`,
          entities: [CustomerEntity, ProductEntity],
          synchronize: DatabaseConstants.DATABASE_SYNCHRONIZE,
          logging: DatabaseConstants.DATABASE_LOGGING,
          autoLoadEntities: DatabaseConstants.DATABASE_AUTO_LOAD_ENTITIES,
        };
      },
      inject: [ConfigService],
    },
  ],
  exports: [DatabaseConstants.DATABASE_CONFIG_NAME],
})
export class PostgresConfg {}

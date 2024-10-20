import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from './postgres.constants';
import { CustomerEntity } from '../repositories/customer';
import { ProductEntity } from '../repositories/product';
import { CategoryEntity } from '../repositories/category';
import { OrderEntity } from '../repositories/order';
import { OrderItemEntity } from '../repositories/orderItem';
import { UserEntity } from '../repositories/user';

dotenvConfig({ path: process.cwd() + '/envs/.env.local' });

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DatabaseConstants.DATABASE_CONFIG_NAME,
      useFactory: (): TypeOrmModuleOptions => {
        return {
          type: DatabaseConstants.DATABASE_TYPE,
          host: `${process.env.POSTGRES_HOST}`,
          port: Number(process.env.POSTGRES_PORT),
          username: `${process.env.POSTGRES_USER}`,
          password: `${process.env.POSTGRES_PASSWORD}`,
          database: `${process.env.POSTGRES_DATABASE}`,
          entities: [
            CustomerEntity,
            ProductEntity,
            CategoryEntity,
            OrderEntity,
            OrderItemEntity,
            UserEntity,
          ],
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

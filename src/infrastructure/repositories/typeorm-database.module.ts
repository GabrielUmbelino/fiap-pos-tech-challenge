import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from '../postgres/postgres.constants';
import { PostgresConfg } from '../postgres/postgres.config';
import { CustomerEntity } from './customer/customer.entity';
import { ProductEntity } from './product/product.entity';
import { CustomerInDbRepository } from './customer/customerInDbRepository';
import { ProductInDbRepository } from './product/productInDbRepository';

@Module({
  imports: [
    DatabaseConstants,
    TypeOrmModule.forFeature([CustomerEntity, ProductEntity]),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfg],
      useFactory: async (config: TypeOrmModuleOptions) => config,
      inject: [DatabaseConstants.DATABASE_CONFIG_NAME],
    }),
  ],
  providers: [
    { provide: 'IRepository<Customer>', useClass: CustomerInDbRepository },
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
  ],
  exports: [
    { provide: 'IRepository<Customer>', useClass: CustomerInDbRepository },
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
  ],
})
export class TypeormDatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from '../postgres/postgres.constants';
import { PostgresConfg } from '../postgres/postgres.config';
import { CustomerEntity } from './customer';
import { ProductEntity } from './product';
import { CategoryEntity } from './category';
import { OrderEntity } from './order';
import { CustomerInDbRepository } from './customer';
import { ProductInDbRepository } from './product';
import { CategoryInDbRepository } from './category';
import { OrderInDbRepository } from './order';

@Module({
  imports: [
    DatabaseConstants,
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      CategoryEntity,
      OrderEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfg],
      useFactory: async (config: TypeOrmModuleOptions) => config,
      inject: [DatabaseConstants.DATABASE_CONFIG_NAME],
    }),
  ],
  providers: [
    { provide: 'IRepository<Customer>', useClass: CustomerInDbRepository },
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
  ],
  exports: [
    { provide: 'IRepository<Customer>', useClass: CustomerInDbRepository },
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
  ],
})
export class TypeormDatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConstants } from '../postgres/postgres.constants';
import { PostgresConfg } from '../postgres/postgres.config';
import { OrderInDbRepository, OrderEntity } from './order';
import { ProductInDbRepository, ProductEntity } from './product';
import { CustomerInDbRepository, CustomerEntity } from './customer';
import { CategoryInDbRepository, CategoryEntity } from './category';
import { OrderItemInDbRepository, OrderItemEntity } from './orderItem';
import { UserInDbRepository, UserEntity } from './user';

@Module({
  imports: [
    DatabaseConstants,
    TypeOrmModule.forFeature([
      CustomerEntity,
      ProductEntity,
      CategoryEntity,
      OrderEntity,
      OrderItemEntity,
      UserEntity,
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
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
    { provide: 'IRepository<User>', useClass: UserInDbRepository },
  ],
  exports: [
    { provide: 'IRepository<Customer>', useClass: CustomerInDbRepository },
    { provide: 'IRepository<Product>', useClass: ProductInDbRepository },
    { provide: 'IRepository<Category>', useClass: CategoryInDbRepository },
    { provide: 'IRepository<Order>', useClass: OrderInDbRepository },
    { provide: 'IRepository<OrderItem>', useClass: OrderItemInDbRepository },
    { provide: 'IRepository<User>', useClass: UserInDbRepository },
  ],
})
export class TypeormDatabaseModule {}

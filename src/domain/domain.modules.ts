import { Module } from '@nestjs/common';
import {
  CustomerService,
  ProductService,
  CategoryService,
  OrderService,
} from './services';

@Module({
  providers: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
  ],
  exports: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
  ],
})
export class DomainModule {}

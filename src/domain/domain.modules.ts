import { Module } from '@nestjs/common';
import {
  CustomerService,
  ProductService,
  CategoryService,
  OrderService,
  OrderItemService,
} from './services';

@Module({
  providers: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
  ],
  exports: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
    { provide: 'IService<Category>', useClass: CategoryService },
    { provide: 'IService<Order>', useClass: OrderService },
    { provide: 'IService<OrderItem>', useClass: OrderItemService },
  ],
})
export class DomainModule {}

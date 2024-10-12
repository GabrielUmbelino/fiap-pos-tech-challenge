import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customerService';
import { ProductService } from './product/productService';

@Module({
  providers: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
  ],
  exports: [
    { provide: 'IService<Customer>', useClass: CustomerService },
    { provide: 'IService<Product>', useClass: ProductService },
  ],
})
export class DomainModule {}

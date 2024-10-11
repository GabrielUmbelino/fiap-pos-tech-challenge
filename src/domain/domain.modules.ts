import { Module } from '@nestjs/common';
import { CustomerService } from './ports/inboundPorts/customerService';
import { ICustomerRepository } from './ports/outboundPorts/ICustomerRepository';
import { CustomerInMemory } from './adapters/driven/customerInMemory';
import { CustomerController } from './adapters/driving/customerController';
import { ProductController } from './adapters/driving/productController';
import { ProductService } from './ports/inboundPorts/productService';
import { IProductRepository } from './ports/outboundPorts/IProductRepository';
import { ProductInMemory } from './adapters/driven/productInMemory';

@Module({
  imports: [],
  controllers: [CustomerController, ProductController],
  providers: [
    CustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
    ProductService,
    {
      provide:IProductRepository,
      useClass: ProductInMemory
    }
  ],
})
export class DomainModule {}

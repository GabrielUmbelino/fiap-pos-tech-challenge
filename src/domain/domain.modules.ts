import { Module } from '@nestjs/common';
import { CustomerService } from './ports/inboundPorts/customerService';
import { ICustomerRepository } from './ports/outboundPorts/ICustomerRepository';
import { CustomerInMemory } from './adapters/driven/customerInMemory';
import { CustomerController } from './adapters/driving/customerController';
import { ProductController } from './adapters/driving/productController';
import { ProductService } from './ports/inboundPorts/productService';
import { IProductRepository } from './ports/outboundPorts/IProductRepository';
import { ProductInMemory } from './adapters/driven/productInMemory';
import { CategoryController } from './adapters/driving/categoryController';
import { CategoryService } from './ports/inboundPorts/categoryService';
import { ICategoryRepository } from './ports/outboundPorts/iCategoryRepository';
import { CategoryInMemory } from './adapters/driven/categoryInMemory';
import { OrderController } from './adapters/driving/orderController';
import { OrderService } from './ports/inboundPorts/orderService';
import { IOrderRepository } from './ports/outboundPorts/IOrderRepository';
import { OrderInMemory } from './adapters/driven/orderInMemory';

@Module({
  imports: [],
  controllers: [
    CustomerController,
    ProductController,
    CategoryController,
    OrderController,
  ],
  providers: [
    CustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
    ProductService,
    {
      provide: IProductRepository,
      useClass: ProductInMemory,
    },
    CategoryService,
    {
      provide: ICategoryRepository,
      useClass: CategoryInMemory,
    },
    OrderService,
    {
      provide: IOrderRepository,
      useClass: OrderInMemory,
    },
  ],
})
export class DomainModule {}

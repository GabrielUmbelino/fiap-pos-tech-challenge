import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import {
  CustomerController,
  CategoryController,
  ProductController,
  OrderController,
  OrderItemController,
} from './controllers';
import { DomainModule } from '../domain';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [
    CustomerController,
    CategoryController,
    ProductController,
    OrderController,
    OrderItemController,
  ],
})
export class ApplicationModule {}

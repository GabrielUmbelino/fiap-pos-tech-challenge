import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { DomainModule } from '../domain/services/domain.modules';
import { CustomerController } from './customerController';
import { ProductController } from './productController';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [CustomerController, ProductController],
})
export class ApplicationModule {}

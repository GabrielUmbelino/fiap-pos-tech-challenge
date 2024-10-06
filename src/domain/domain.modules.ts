import { Module } from '@nestjs/common';
import { CustomerService } from './ports/inboundPorts/customerService';
import { ICustomerRepository } from './ports/outboundPorts/ICustomerRepository';
import { CustomerInMemory } from './adapters/driven/customerInMemory';
import { CustomerController } from './adapters/driving/customerController';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class DomainModule {}

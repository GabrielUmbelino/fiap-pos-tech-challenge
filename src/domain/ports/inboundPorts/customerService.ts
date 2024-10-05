import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../model/customer';
import { ICustomerService } from './iCustomerService';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  create(name: string): Customer {
    const customer = new Customer(name);

    this.customerRepository.create(customer);
    return customer;
  }

  findAll(): Customer[] {
    return this.customerRepository.findAll();
  }
}

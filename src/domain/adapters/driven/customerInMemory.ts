import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../ports/outboundPorts/ICustomerRepository';
import { Customer } from '../../ports/model/customer';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CustomerInMemory implements ICustomerRepository {
  private readonly customers: Customer[] = [new Customer('José')];

  create(customer: Customer): Customer {
    this.customers.push(customer);
    return customer;
  }

  findAll(): Customer[] {
    return this.customers;
  }
}

import { FilterCustomerDto } from './../../ports/model/customer';
import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../ports/outboundPorts/ICustomerRepository';
import { Customer, CustomerDto } from '../../ports/model/customer';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CustomerInMemory implements ICustomerRepository {
  private readonly customers: Customer[] = [];

  create(customerDto: CustomerDto): Promise<Customer> {
    const customer = new Customer(customerDto);
    this.customers.push(customer);
    return Promise.resolve(customer);
  }

  findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers);
  }

  find(customerDto: FilterCustomerDto): Promise<Customer[]> {
    const filteredCustomers = this.customers?.filter((customer) => {
      if (customer.id === customerDto.id) return true;
      if (customer.name === customerDto.name) return true;
      if (customer.document === customerDto.document) return true;
      if (customer.phoneNumber === customerDto.phoneNumber) return true;

      return;
    });
    return Promise.resolve(filteredCustomers);
  }
}

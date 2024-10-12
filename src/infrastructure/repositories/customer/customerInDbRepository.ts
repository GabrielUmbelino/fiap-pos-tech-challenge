import { Injectable } from '@nestjs/common';
import { Customer, FilterCustomerDto } from '../../../shared/models/customer';
import { IRepository } from '../iRepository';

@Injectable()
export class CustomerInDbRepository implements IRepository<Customer> {
  private readonly customers: Customer[] = [];

  create(customer: Customer): Promise<Customer> {
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

  delete(): Promise<void> {
    throw new Error('Método não implementado.');
  }

  edit(): Promise<Customer> {
    throw new Error('Método não implementado.');
  }
}

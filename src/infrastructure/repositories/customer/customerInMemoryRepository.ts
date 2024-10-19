import { Injectable } from '@nestjs/common';
import { Customer } from '../../../shared/models';
import { IRepository } from '../iRepository';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class CustomerInMemoryRepository implements IRepository<Customer> {
  find(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  private readonly customers: Customer[] = [];

  create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return Promise.resolve(customer);
  }

  findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers);
  }

  delete(): Promise<void> {
    throw new Error('Método não implementado.');
  }

  edit(): Promise<Customer> {
    throw new Error('Método não implementado.');
  }
}

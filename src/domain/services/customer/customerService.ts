import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../../shared/models/customer';
import { IService } from '../../iService';
import { CustomerInDbRepository } from '../../../infrastructure/repositories/customer';

@Injectable()
export class CustomerService implements IService<Customer> {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: CustomerInDbRepository,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  findById(customerId: number): Promise<Customer> {
    return this.customerRepository.findById(customerId);
  }

  find(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

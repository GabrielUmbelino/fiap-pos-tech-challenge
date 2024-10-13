import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Customer } from '../../../shared/models/customer';
import { IService } from '../../iService';

@Injectable()
export class CustomerService implements IService<Customer> {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: IRepository<Customer>,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  find(partialCustomer: Partial<Customer>): Promise<Customer[]> {
    return this.customerRepository.find(partialCustomer);
  }

  edit(customer: Customer): Promise<Customer> {
    return this.customerRepository.edit(customer);
  }

  delete(id: number): Promise<void> {
    return this.customerRepository.delete(id);
  }
}

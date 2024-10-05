import { Customer } from '../model/customer';

export interface ICustomerRepository {
  create(customer: Customer): Customer;
  findAll(): Customer[];
}

export const ICustomerRepository = Symbol('ICustomerRepository');

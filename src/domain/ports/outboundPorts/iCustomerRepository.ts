import { Customer, CustomerDto, FilterCustomerDto } from '../model/customer';

export interface ICustomerRepository {
  create(customerDto: CustomerDto): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  find(filterCustomerDto: FilterCustomerDto): Promise<Customer[]>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');

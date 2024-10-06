import { FilterCustomerDto } from './../model/customer';
import { Customer, CustomerDto } from '../model/customer';

/**
 * Our domain input port
 */

export interface ICustomerService {
  create(customerDto: CustomerDto): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  find(filterCustomerDto: FilterCustomerDto): Promise<Customer[]>;
}

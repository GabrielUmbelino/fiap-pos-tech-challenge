import { Customer } from '../model/customer';

/**
 * Our domain input port
 */

export interface ICustomerService {
  create(name: string): Customer;
  findAll(): Customer[];
}
